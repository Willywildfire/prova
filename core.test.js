import {test} from 'node:test';import assert from 'node:assert/strict';import {seed,parseDSL,toDSL,acwr,estimate,workload,progress,recovery} from '../js/progression-ai.js';import {buildPlan,Engine} from '../js/fsm-engine.js';
test('setmana A B descans A B descans descans',()=>{const r=seed();assert.deepEqual(r.map(x=>x.synergy),['PUSH','PULL','REST','PUSH','PULL','REST','REST']);assert.equal(r[0].exercises.length,4);assert.equal(r[1].exercises.length,6);assert.equal(r[2].exercises.length,0);assert.equal(r[0].exercises[0].amrap,true)});
test('DSL roundtrip',()=>{for(const r of seed().filter(r=>r.exercises.length)){const ex=parseDSL(toDSL(r),r.exercises);assert.equal(ex.length,r.exercises.length);assert.equal(ex[0].target,r.exercises[0].target)}});
test('DSL rebutja valors invàlids',()=>{assert.throws(()=>parseDSL('Nom | mode:ISO | 0x40s | rest:10s'));assert.throws(()=>parseDSL('no vàlid'))});
test('planificació supersèries',()=>{const a={id:'a',group:'A',sets:2,rest:30},b={id:'b',group:'A',sets:2,rest:40};const p=buildPlan([a,b]);assert.deepEqual(p.map(x=>x.ex.id),['a','b','a','b']);assert.deepEqual(p.map(x=>x.rest),[0,40,0,40])});
test('sense dades no inventa ACWR',()=>assert.equal(acwr([]),null));
test('càrrega ponderada',()=>assert.equal(workload({tut:100,rir:3,tier:1}),100));
test('progressió fàcil consecutiva',()=>{const e={id:'a',tracking:'time',target:40,ceiling:60};const s={exercise:'a',actual:40,prescribed:40,rir:3,failure:false};progress(e,[s],[{sets:[s]}]);assert.equal(e.target,50)});

test('mapa sense dades no simula recuperació',()=>{const r=recovery([]);assert.equal(r.length,18);assert.equal(r[10].count,0);assert.equal(r[10].last,null)});
test('decaïment 24 h i temps amb valor no limitat',()=>{const now=Date.now();const set={tut:800,rir:3,tier:1,at:now,weights:{10:1},name:'Flexions'};const logs=[{sets:[set]}];assert.equal(recovery(logs,now)[10].percent,100);assert.equal(recovery(logs,now)[10].raw,200);assert.equal(recovery(logs,now+24*3600000)[10].raw,100);assert.ok(recovery(logs,now)[10].hours>=89)});
test('mapa: estímuls només als grups treballats',()=>{const now=Date.now();const r=recovery([{sets:[{tut:40,rir:1,tier:1,at:now,weights:{12:1},name:'Curl'}]}],now);assert.equal(r[12].count,1);assert.equal(r[10].count,0)});

test('el descans ampliat manté la marca de temps',()=>{const fake={s:{phase:'REST',phaseStarted:12345,targetMs:45000},persist(){this.saved=true}};assert.equal(Engine.prototype.extendRest.call(fake,15),true);assert.equal(fake.s.targetMs,60000);assert.equal(fake.s.phaseStarted,12345);assert.equal(fake.saved,true)});
test('no amplia treball ni accepta temps negatiu',()=>{const fake={s:{phase:'WORK_REPS',targetMs:1000},persist(){}};assert.equal(Engine.prototype.extendRest.call(fake,15),false);fake.s.phase='REST';assert.equal(Engine.prototype.extendRest.call(fake,-15),false)});
test('previsió de 48h conserva les dades i redueix el model',()=>{const now=Date.now();const logs=[{id:'x',sets:[{name:'Curl',tut:160,rir:3,at:now,weights:{12:1},loadKg:8}]}];const current=recovery(logs,now)[12],future=recovery(logs,now+48*3600000)[12];assert.equal(future.raw,current.raw/4);assert.equal(future.count,1);assert.equal(future.sources[0].loadKg,8)});

test('sense valoració no inventa intensitat',()=>assert.equal(workload({tut:100,rir:null,tier:1}),100));
