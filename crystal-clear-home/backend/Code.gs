/**
 * Crystal Clear Home — Apps Script persistence adapter (Sprint 1, server-side).
 * Bind to the private seven-tab Google Spreadsheet or set SHEET_ID script property.
 * Set EVIDENCE_FOLDER_ID script property to a PRIVATE Drive folder ID.
 *
 * Deployment design: use a restricted Apps Script web app and an authorized
 * same-origin proxy / authenticated integration. DO NOT deploy doPost as an
 * anonymous "Anyone" executable: the public GitHub Pages client is untrusted.
 *
 * Not yet connected to the public SPA. No credentials or family data in source.
 */
const CCH = {
  ACT: 'Activities', EVIDENCE: 'Evidence',
  ROOM: 'Rooms', ROLES: ['Executor', 'Manager'],
  STATUS: { OPEN: 'in_progress', DONE: 'completed' }
};
const HEADERS = {
  Activities: ['Activity_ID','Definition_ID','Room_ID','Executor_User_ID','Status','Started_At_UTC','Completed_At_UTC','Duration_Seconds','Notes','Created_At_UTC','Updated_At_UTC'],
  Evidence: ['Evidence_ID','Activity_ID','Stage','Drive_File_ID','File_Name','Mime_Type','Byte_Size','Captured_At_UTC','Uploaded_At_UTC']
};
function cchSheet_(name) {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const book = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!book) throw new Error('Configure SHEET_ID');
  const tab = book.getSheetByName(name);
  if (!tab) throw new Error('Missing tab: ' + name);
  return tab;
}
function cchNow_() { return new Date().toISOString(); }
function cchRows_(name) {
  const values = cchSheet_(name).getDataRange().getValues();
  const header = values[0].map(String);
  return values.slice(1).filter(row => row[0]).map(row => Object.fromEntries(header.map((h, i) => [h, row[i]])));
}
function cchFind_(name, key, value) {
  return cchRows_(name).find(row => String(row[key]) === String(value)) || null;
}
function cchColumn_(name, field) {
  const headers = cchSheet_(name).getRange(1,1,1,cchSheet_(name).getLastColumn()).getValues()[0];
  const idx = headers.indexOf(field);
  if (idx < 0) throw new Error('Missing field: ' + field);
  return idx + 1;
}
function cchRowNumber_(name, id) {
  const tab=cchSheet_(name);
  const values=tab.getRange(2,1,Math.max(1,tab.getLastRow()-1),1).getValues();
  const i=values.findIndex(row=>String(row[0])===String(id));
  if(i<0)throw new Error('Activity not found');
  return i+2;
}
function cchAppend_(name, object) {
  const tab=cchSheet_(name);
  const columns=tab.getRange(1,1,1,tab.getLastColumn()).getValues()[0];
  tab.appendRow(columns.map(k => object[k] === undefined || object[k] === null ? '' : object[k]));
}
function cchRequireRole_(context, expected) {
  // Require a VERIFIED identity from a trusted authentication layer.
  // Never trust {role,username} supplied by the public browser.
  if (!context || context.verified !== true || !context.userId || !Array.isArray(context.roles) ||
      !context.roles.includes(expected)) throw new Error('Unauthorized');
}
function cchCreateActivity(context, input) {
  cchRequireRole_(context,'Executor');
  if (!/^ROOM-[A-Z0-9-]+$/.test(String(input.roomId || '')) ||
      !cchFind_('Rooms','Room_ID',input.roomId)) throw new Error('Invalid room');
  const id = 'ACT-' + Utilities.getUuid(), stamp=cchNow_();
  const record = {Activity_ID:id,Definition_ID:'DEF-CLEAN',Room_ID:input.roomId,
    Executor_User_ID:context.userId,Status:CCH.STATUS.OPEN,Started_At_UTC:stamp,
    Notes:String(input.notes || '').slice(0,500),Created_At_UTC:stamp,Updated_At_UTC:stamp};
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try {cchAppend_('Activities',record);} finally {lock.releaseLock();}
  return {activityId:id,startedAt:stamp,status:CCH.STATUS.OPEN};
}
function cchUploadEvidence(context, input) {
  cchRequireRole_(context,'Executor');
  const stage = String(input.stage || '');
  if(stage!=='before'&&stage!=='after')throw new Error('Invalid stage');
  const activity=cchFind_('Activities','Activity_ID',input.activityId);
  if(!activity||activity.Status!==CCH.STATUS.OPEN||String(activity.Executor_User_ID)!==context.userId)
    throw new Error('Activity not editable');
  const mime=String(input.mime || '');
  if(!['image/jpeg','image/png','image/webp'].includes(mime))throw new Error('Unsupported image');
  const bytes=Utilities.base64Decode(String(input.base64 || ''));
  if(!bytes.length||bytes.length>6*1024*1024)throw new Error('Image must be 1–6 MB');
  const folderId=PropertiesService.getScriptProperties().getProperty('EVIDENCE_FOLDER_ID');
  if(!folderId)throw new Error('Configure EVIDENCE_FOLDER_ID');
  const id='EV-'+Utilities.getUuid();
  const extension=mime==='image/png'?'.png':mime==='image/webp'?'.webp':'.jpg';
  const file=DriveApp.getFolderById(folderId).createFile(
    Utilities.newBlob(bytes,mime,id+extension));
  const stamp=cchNow_();
  try {
    const lock=LockService.getScriptLock();lock.waitLock(30000);
    try {
      // Re-check after upload; if status changed, do not attach new evidence.
      const refreshed=cchFind_('Activities','Activity_ID',input.activityId);
      if(!refreshed||refreshed.Status!==CCH.STATUS.OPEN)throw new Error('Activity closed');
      cchAppend_('Evidence',{Evidence_ID:id,Activity_ID:input.activityId,Stage:stage,
        Drive_File_ID:file.getId(),File_Name:file.getName(),Mime_Type:mime,
        Byte_Size:bytes.length,Captured_At_UTC:input.capturedAt || '',
        Uploaded_At_UTC:stamp});
    } finally {lock.releaseLock();}
  } catch(error) {
    // Compensating action; failures must also be reconciled via audit.
    file.setTrashed(true);
    throw error;
  }
  return {evidenceId:id,driveFileId:file.getId(),uploadedAt:stamp};
}
function cchCompleteActivity(context, activityId) {
  cchRequireRole_(context,'Executor');
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    const rec=cchFind_('Activities','Activity_ID',activityId);
    if(!rec||String(rec.Executor_User_ID)!==context.userId)throw new Error('Not found');
    if(rec.Status===CCH.STATUS.DONE) return {
      activityId,status:CCH.STATUS.DONE,completedAt:rec.Completed_At_UTC,
      durationSeconds:Number(rec.Duration_Seconds)};
    if(rec.Status!==CCH.STATUS.OPEN)throw new Error('Invalid state');
    const evidence=cchRows_('Evidence').filter(x=>String(x.Activity_ID)===activityId);
    if(!evidence.some(x=>x.Stage==='before')||!evidence.some(x=>x.Stage==='after'))
      throw new Error('Both before and after evidence required');
    const stamp=cchNow_();
    const duration=Math.max(0,Math.floor((Date.parse(stamp)-Date.parse(rec.Started_At_UTC))/1000));
    const tab=cchSheet_('Activities'),row=cchRowNumber_('Activities',activityId);
    const change={Status:CCH.STATUS.DONE,Completed_At_UTC:stamp,
      Duration_Seconds:duration,Updated_At_UTC:stamp};
    // Writes under lock; completed records immutable for Executor and Manager.
    for(const [key,value] of Object.entries(change))
      tab.getRange(row,cchColumn_('Activities',key)).setValue(value);
    SpreadsheetApp.flush();
    return {activityId,status:CCH.STATUS.DONE,completedAt:stamp,durationSeconds:duration};
  } finally {lock.releaseLock();}
}
function cchListActivities(context, query) {
  cchRequireRole_(context,'Manager');
  const limit=Math.min(50,Math.max(1,Number(query.limit)||20));
  const offset=Math.max(0,Number(query.offset)||0);
  const from=Date.parse(query.fromUtc),to=Date.parse(query.toUtc);
  if(!Number.isFinite(from)||!Number.isFinite(to)||to<from)throw new Error('Date range required');
  const rows=cchRows_('Activities').filter(x=>{
    const time=Date.parse(x.Started_At_UTC);
    return time>=from&&time<=to&&(!query.roomId||x.Room_ID===query.roomId);
  }).sort((a,b)=>String(b.Started_At_UTC).localeCompare(String(a.Started_At_UTC)));
  return {total:rows.length,items:rows.slice(offset,offset+limit),nextOffset:offset+limit<rows.length?offset+limit:null};
}
function cchActivityDetails(context, activityId) {
  cchRequireRole_(context,'Manager');
  const activity=cchFind_('Activities','Activity_ID',activityId);
  if(!activity)throw new Error('Not found');
  // Return Drive IDs, not publicly accessible URLs.
  const evidence=cchRows_('Evidence').filter(e=>String(e.Activity_ID)===activityId);
  return {activity,evidence};
}

/*
 * SECURITY/DEPLOYMENT GATE:
 * This module intentionally does not expose the above functions through a
 * publicly callable doPost endpoint. A public GitHub Pages client cannot
 * safely send a shared secret embedded in JS. Before enabling network access,
 * implement verified identities, server-side role mapping and controlled
 * read access for photo bytes. Then test with real device and Workspace.
 */
