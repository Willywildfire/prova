const KEY='primer-v1';
export const uid=()=>crypto.randomUUID();
export function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}}
export let data=load();
export function save(){localStorage.setItem(KEY,JSON.stringify(data))}
export function mutate(fn){fn(data);save()}
export function replace(value){if(!value||value.version!==1||!Array.isArray(value.logs)||!Array.isArray(value.routines)||value.routines.length!==7)throw Error('Còpia de seguretat no vàlida');for(const r of value.routines){if(!Array.isArray(r.exercises)||(!r.exercises.length&&r.synergy!=='REST'))throw Error('Rutina buida');for(const e of r.exercises)if((e.loadKg!==undefined&&(!Number.isFinite(e.loadKg)||e.loadKg<0||e.loadKg>500))||!e.id||!e.name||!['time','reps'].includes(e.tracking)||!(e.target>0&&e.target<=600&&e.sets>0&&e.sets<=10&&e.rest>=0&&e.rest<=300))throw Error('Exercici no vàlid')}data=value;save()}
let db;
export async function database(){if(db)return db;db=await new Promise((resolve,reject)=>{const req=indexedDB.open('primer-history',1);req.onupgradeneeded=()=>{for(const n of ['workouts','sets','outbox'])req.result.createObjectStore(n,{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});return db}
export async function put(store,record){const d=await database();return new Promise((resolve,reject)=>{const t=d.transaction(store,'readwrite');t.objectStore(store).put(record);t.oncomplete=resolve;t.onerror=()=>reject(t.error)})}
export async function archive(log){await put('workouts',log);for(const s of log.sets)await put('sets',{...s,workout_id:log.id});await put('outbox',{id:log.id,record:log});}
export function download(name,content,type='application/json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
export function csv(rows){if(!rows.length)return '';const keys=[...new Set(rows.flatMap(r=>Object.keys(r)))];return [keys,...rows.map(r=>keys.map(k=>r[k]))].map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')}
// Remove every local mirror; history/graphs use data.logs as the source of truth.
export async function removeArchivedLog(id){const d=await database();return new Promise((resolve,reject)=>{const t=d.transaction(['workouts','sets','outbox'],'readwrite');t.objectStore('workouts').delete(id);t.objectStore('outbox').delete(id);const req=t.objectStore('sets').openCursor();req.onsuccess=()=>{const cursor=req.result;if(cursor){if(cursor.value.workout_id===id)cursor.delete();cursor.continue()}};t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error)})}
