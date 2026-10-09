// Run: node --test crystal-clear-home/tests/domain.test.cjs
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../domain.js'),'utf8'),context);
const D=context.window.HomeDomain;
test('seconds are integers and never negative',()=>{
 assert.equal(D.seconds('2026-10-09T10:00:00Z','2026-10-09T10:42:35Z'),2555);
 assert.equal(D.seconds('2026-10-09T10:00:01Z','2026-10-09T10:00:00Z'),0);
});
test('completion requires before and after evidence and active state',()=>{
 const row={status:'in_progress',photos:[{stage:'before'}]};
 assert.equal(D.canComplete(row),false);
 row.photos.push({stage:'after'});
 assert.equal(D.canComplete(row),true);
 row.status='completed';
 assert.equal(D.canComplete(row),false);
});
test('calendar day status is not rolling 24 hours',()=>{
 const today=new Date('2026-10-09T15:00:00');
 const yesterday=new Date('2026-10-08T23:00:00');
 assert.equal(D.isToday(today.toISOString(),today),true);
 assert.equal(D.isToday(yesterday.toISOString(),today),false);
});
test('room summary counts only completed sessions today',()=>{
 const current=new Date('2026-10-09T15:00:00');
 const rows=[{roomId:'ROOM-LIVING',status:'completed',completedAt:current.toISOString()},{roomId:'ROOM-KITCHEN',status:'in_progress',completedAt:null}];
 const stats=D.summary(rows,current);
 assert.equal(stats.find(x=>x.roomId==='ROOM-LIVING').completed,1);
 assert.equal(stats.find(x=>x.roomId==='ROOM-KITCHEN').completed,0);
});
