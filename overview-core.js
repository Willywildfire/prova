import {externalVolume} from './strength-core.js';
export const localDayKey=value=>{const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const dayStart=value=>{const d=new Date(value);d.setHours(0,0,0,0);return d};
const shiftDays=(value,days)=>{const d=new Date(value);d.setDate(d.getDate()+days);return d};
export function overviewBounds(logs,range=28,now=Date.now()){
 const today=dayStart(now),end=shiftDays(today,1);let start,days;
 if(range==='all'){const starts=logs.filter(l=>Number.isFinite(l.started)&&l.started<=now).map(l=>l.started);start=starts.length?dayStart(Math.min(...starts)):shiftDays(today,-27);days=Math.round((Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())-Date.UTC(start.getFullYear(),start.getMonth(),start.getDate()))/86400000)+1}
 else{days=[28,84,365].includes(Number(range))?Number(range):28;start=shiftDays(today,1-days)}
 return {start:+start,end:+end,previousStart:+shiftDays(start,-days),days,compare:range!=='all',now};
}
export function generalStats(logs){const sets=logs.flatMap(l=>l.sets||[]),values=sets.map(externalVolume).filter(v=>v!==null),eligible=sets.filter(s=>s.tracking==='reps'&&s.loadKind!=='bodyweight'&&s.loadKind!=='grip'&&(s.loadKind==='dumbbell'||s.loadKg>0));return {sessions:logs.length,days:new Set(logs.map(l=>localDayKey(l.started))).size,quick:logs.filter(l=>l.quick).length,early:logs.filter(l=>l.endedEarly).length,sets:sets.length,partial:sets.filter(s=>s.partial).length,seconds:sets.reduce((sum,s)=>sum+(Number.isFinite(s.tut)&&s.tut>=0?s.tut:0),0),volume:values.length?values.reduce((a,b)=>a+b,0):null,volumeKnown:values.length,volumeEligible:eligible.length};}
export function buildOverview(logs,range=28,type='all',now=Date.now()){
 const valid=logs.filter(l=>Number.isFinite(l.started)&&l.started<=now&&Array.isArray(l.sets)&&l.sets.length&& (type==='quick'?!!l.quick:type==='routine'?!l.quick:true));
 const bounds=overviewBounds(valid,range,now),current=valid.filter(l=>l.started>=bounds.start&&l.started<bounds.end),previous=valid.filter(l=>l.started>=bounds.previousStart&&l.started<bounds.start),unit=bounds.days<=84?'week':'month';
 const bucketStart=value=>{const d=dayStart(value);if(unit==='month')d.setDate(1);else d.setDate(d.getDate()-(d.getDay()+6)%7);return d};
 const bins=[];for(let date=bucketStart(bounds.start);+date<bounds.end;){const next=new Date(date);if(unit==='month')next.setMonth(next.getMonth()+1);else next.setDate(next.getDate()+7);const entries=current.filter(l=>l.started>=+date&&l.started<+next),stats=generalStats(entries);bins.push({at:+date,end:+next,label:unit==='month'?date.toLocaleDateString('ca-ES',{month:'short',year:'2-digit'}):date.toLocaleDateString('ca-ES',{day:'2-digit',month:'2-digit'}),partialPeriod:+date<bounds.start||+next>now,logs:entries,...stats,chartVolume:entries.length?stats.volume:0});date=next}
 const groups=new Map();for(const l of current)for(const s of l.sets){const key=s.exercise||s.name;if(!groups.has(key))groups.set(key,{id:key,name:s.name||'Exercici',seconds:0,sets:0});const g=groups.get(key);g.seconds+=Number.isFinite(s.tut)?Math.max(0,s.tut):0;g.sets++}
 const ranking=[...groups.values()].sort((a,b)=>b.seconds-a.seconds||a.name.localeCompare(b.name));
 return {bounds,current:current.slice().sort((a,b)=>b.started-a.started),previous,stats:generalStats(current),prior:generalStats(previous),bins,unit,ranking};
}
export function compareMetric(current,previous,enabled=true){if(!enabled)return {kind:'none',text:'Historial complet'};if(current===null||previous===null)return {kind:'unknown',text:'Sense dades comparables'};if(previous===0)return {kind:current===0?'same':'new',text:current===0?'Sense canvi':'Sense base anterior'};const change=(current-previous)/previous*100;return {kind:change>0?'up':change<0?'down':'same',text:Math.abs(change)<.05?'Sense canvi':`${change>0?'+':''}${change.toLocaleString('ca-ES',{maximumFractionDigits:1})}% respecte a l’anterior`};}
