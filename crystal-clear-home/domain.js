"use strict";
window.HomeDomain=Object.freeze({
 rooms:{"ROOM-LIVING":"Living Room","ROOM-KITCHEN":"Kitchen","ROOM-BEDROOM":"Bedroom","ROOM-BATHROOM":"Bathroom"},
 seconds(start,end){return Math.max(0,Math.floor((Date.parse(end)-Date.parse(start))/1000));},
 canComplete(record){return record.status==="in_progress" && record.photos.some(x=>x.stage==="before") && record.photos.some(x=>x.stage==="after");},
 isToday(iso,now=new Date()){return new Date(iso).toDateString()===now.toDateString();},
 filter(records,days,room,now=Date.now()){const ms=days*86400000;return records.filter(x=>(!room||x.roomId===room)&&Date.parse(x.startedAt)>=now-ms).sort((a,b)=>b.startedAt.localeCompare(a.startedAt));},
 summary(records,now=new Date()){return Object.entries(this.rooms).map(([id,name])=>({roomId:id,name,completed:records.filter(a=>a.roomId===id&&a.status==="completed"&&this.isToday(a.completedAt,now)).length}));}
});