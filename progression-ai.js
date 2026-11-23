export const muscles=['Abdominal superior','Abdominal inferior','Oblics','Transvers abdominal','Flexors del maluc','Adductors','Gluti mitjà','Erectors espinals','Serrat anterior','Deltoide anterior','Pectorals','Dorsals','Bíceps','Tríceps','Deltoide lateral','Deltoide posterior','Avantbraços','Trapezis'];
const ex=(id,name,target,sets,rest,category,extra={})=>({id,name,target,sets,rest,category,tracking:'reps',mode:'STANDARD',tier:1,ceiling:30,cues:['MOVIMENT CONTROLAT','RESPIRA FLUID'],weights:{},fixedRoutine:true,...extra});
export function seed(){
 const push=[
 ex('pushup','Flexions',12,3,90,'PUSH',{range:'3–4 sèries · repeticions lliures',amrap:true,setsMax:4,tempo:'2-0-1-0',weights:{10:1,13:.65,9:.5,3:.25},cues:['COS EN BLOC','COLZES CONTROLATS']}),
 ex('overhead','Press d’espatlla · 1 braç',10,3,75,'PUSH',{range:'10–12 reps/braç · 60–90 s',repMax:12,restMin:60,restMax:90,unilateral:true,weights:{9:1,14:.4,13:.7,17:.25},cues:['NO ARQUEGIS LUMBARS','COSTELLES AVALL']}),
 ex('lateral','Elevacions laterals',12,3,60,'PUSH',{range:'3–4 sèries · 12–15 reps/braç',repMax:15,setsMax:4,unilateral:true,weights:{14:1,17:.25},cues:['SENSE BALANCEIG','ESPATLLES LLUNY ORELLES']}),
 ex('triceps','Extensió de tríceps darrere el cap',10,3,60,'PUSH',{range:'10–12 repeticions',repMax:12,weights:{13:1},cues:['COLZES ESTABLES','BAIXA AMB CONTROL']})];
 const pull=[
 ex('row','Rem a una mà amb manuella',10,3,75,'PULL',{range:'3–4 sèries · 10–12 reps/braç · 60–90 s',setsMax:4,repMax:12,restMin:60,restMax:90,unilateral:true,weights:{11:1,15:.6,12:.5,17:.5,16:.35},cues:['ESQUENA NEUTRA','COLZE CAP ENRERE']}),
 ex('curl','Curl de bíceps normal',10,3,60,'PULL',{range:'10–12 reps/braç',repMax:12,unilateral:true,weights:{12:1,16:.4},cues:['COLZES FIXOS','SENSE IMPULS']}),
 ex('curl-t','Curl de bíceps en T',10,3,60,'PULL',{range:'10–12 repeticions',repMax:12,weights:{12:1,16:.5},cues:['CANELLS NEUTRES','BAIXA AMB CONTROL']}),
 ex('gripper','Pinça d’avantbraç · hand gripper',15,3,45,'PULL',{range:'15–20 apretades/mà',repMax:20,unilateral:true,weights:{16:1},cues:['CANELL NEUTRE','OBRE AMB CONTROL']}),
 ex('plank','Planxa abdominal',45,3,45,'ANTI_EXTENSION',{range:'45–60 segons',tracking:'time',ceiling:60,repMax:60,weights:{0:.7,1:.5,3:1,8:.4,9:.25},cues:['ESTRÈNYER GLUTIS','COSTELLES AVALL']}),
 ex('superman','Superman',12,3,45,'SCAPULAR_POSTERIOR',{range:'12–15 reps · aguanta 2 s dalt',repMax:15,tempo:'2-0-1-2',weights:{7:1,6:.4,15:.2},cues:['PUJA SENSE FORÇAR','AGUANTA DOS SEGONS']})];
 return ['PUSH','PULL','REST','PUSH','PULL','REST','REST'].map((synergy,i)=>({id:'day'+i,title:synergy==='PUSH'?'Empenta':synergy==='PULL'?'Tracció, braç i core':'Descans i recuperació',synergy,exercises:structuredClone(synergy==='PUSH'?push:synergy==='PULL'?pull:[])}));
}
export const duration=e=>e.tracking==='time'?e.target:e.target*(e.tempo?e.tempo.split('-').reduce((a,b)=>a+Number(b),0):3);
export const estimate=exs=>exs.reduce((s,e)=>s+e.sets*((duration(e)+5)*(e.unilateral?2:1)+e.rest),0);
export const workload=s=>s.tut*(s.rir==null?1:1+.15*(3-s.rir))*(1+.2*((s.tier||1)-1));
export function acwr(logs,now=Date.now()){if(!logs.length)return null;const first=Math.min(...logs.map(l=>l.started));let a=0,c=0;const days=Math.max(28,Math.ceil((now-first)/86400000));for(let n=days;n>=0;n--){const day=new Date(now-n*86400000).toLocaleDateString('sv');const w=logs.filter(l=>new Date(l.started).toLocaleDateString('sv')===day).reduce((s,l)=>s+l.workload,0);a=.25*w+.75*a;c=2/29*w+27/29*c}return c?a/c:null}
export function recovery(logs,now=Date.now()){
 return muscles.map((name,m)=>{let raw=0,last=null,count=0;const sources=[];
 for(const l of logs)for(const s of l.sets||[]){const weight=Number(s.weights?.[m]||0);if(!weight||!Number.isFinite(s.at))continue;
 const half=s.eccentric?36:24,hours=Math.max(0,(now-s.at)/3600000),dose=workload(s)*weight/4,residual=dose*Math.pow(.5,hours/half);
 raw+=residual;last=Math.max(last||0,s.at);count++;sources.push({name:s.name,at:s.at,residual,half,tut:s.tut,rir:s.rir,loadKg:s.loadKg,side:s.side});}
 // Resolution uses the sum of individual decay curves, not a capped display percentage.
 let lo=0,hi=720;for(let i=0;i<32;i++){const mid=(lo+hi)/2,v=sources.reduce((a,s)=>a+s.residual*Math.pow(.5,mid/s.half),0);if(v>15)lo=mid;else hi=mid}
 return {name,raw,percent:Math.min(100,raw),last,count,hours:raw<=15?0:Math.ceil(hi),sources:sources.sort((a,b)=>b.at-a.at)};
 });
}
export function fatigue(logs){return recovery(logs).map(m=>m.percent)}
export function progress(ex,records,history){const completed=records.filter(s=>s.exercise===ex.id);if(!completed.length)return;const failed=completed.some(s=>s.failure);const rir=Math.min(...completed.map(s=>s.rir??1));const old=history.filter(l=>l.sets.some(s=>s.exercise===ex.id)).slice(-2);const same=(n,r)=>old.slice(-n).length===n&&old.slice(-n).every(l=>l.sets.filter(s=>s.exercise===ex.id).every(s=>!s.failure&&s.rir===r));let delta=0;if(!failed&&rir===3&&same(1,3))delta=ex.tracking==='time'?10:3;else if(!failed&&rir===1&&same(2,1))delta=ex.tracking==='time'?5:2;if(ex.fixedRoutine)delta=0;if(delta)ex.target=Math.min(ex.ceiling,ex.target+delta);ex.last=Math.max(...completed.map(s=>s.actual));ex.pr=Math.max(ex.pr||0,ex.last);const early=completed.some(s=>s.actual<s.prescribed*.8);if(!ex.fixedRoutine&&early&&old.at(-1)?.sets.some(s=>s.exercise===ex.id&&s.actual<s.prescribed*.8))ex.target=Math.max(5,Math.round(ex.target*.85));}
export function parseDSL(text,original=[]){const lines=text.split('\n').map(s=>s.trim()).filter(s=>s&&!s.startsWith('#'));if(!lines.length)throw Error('Afegeix almenys un exercici');return lines.map((line,i)=>{const parts=line.split('|').map(s=>s.trim()),name=parts.shift().replace(/^[A-Z]\d+:\s*/,''),body=parts.join(' | '),dose=body.match(/(\d+)x(\d+)(s?)/),rest=body.match(/rest:(\d+)s/),tempo=body.match(/tempo:(\d-\d-\d-\d)/),mode=body.match(/mode:(ISO_DYNAMIC|MYO_REPS|EMOM|ISO|REPS)/);if(!dose||!name||!rest||!mode)throw Error(`Línia ${i+1}: cal nom, mode, NxN i rest:Ns`);const sets=+dose[1],target=+dose[2];if(sets<1||sets>10||target<1||target>600||+rest[1]>300)throw Error(`Línia ${i+1}: valors fora de rang`);const prev=original.find(e=>e.name===name);return {...ex(prev?.id||crypto.randomUUID(),name,target,sets,+rest[1],prev?.category||'ANTI_EXTENSION'),...prev,name,target,sets,rest:+rest[1],tracking:dose[3]?'time':'reps',mode:['ISO','REPS'].includes(mode[1])?'STANDARD':mode[1],unilateral:/uni:true/.test(body),tempo:tempo?.[1],group:body.match(/group:([A-Z])/)?.[1]||null}})}
export const toDSL=r=>`# ${r.title} · ${r.synergy}\n`+r.exercises.map((e,i)=>`A${i+1}: ${e.name} | mode:${e.mode==='STANDARD'?(e.tracking==='time'?'ISO':'REPS'):e.mode} | ${e.sets}x${e.target}${e.tracking==='time'?'s':''} | rest:${e.rest}s${e.unilateral?' | uni:true':''}${e.tempo?' | tempo:'+e.tempo:''}${e.group?' | group:'+e.group:''}`).join('\n');
