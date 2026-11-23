import {test} from 'node:test';import assert from 'node:assert/strict';
import {seed} from '../js/progression-ai.js';
import {config,externalVolume,supportedLoad,exerciseHistory,recommendation} from '../js/strength-core.js';
const curl=()=>({...seed()[1].exercises.find(e=>e.id==='curl'),loadKg:8});
const log=(e,when,reps=12,options={})=>({id:String(when),started:when,sets:Array.from({length:e.sets*2},(_,i)=>({exercise:e.id,tracking:'reps',actual:reps,loadKg:8,side:i%2?'RIGHT':'LEFT',partial:false,failure:false,tut:30,...options}))});
test('volum unilateral i dues manuelles',()=>{assert.equal(externalVolume({tracking:'reps',actual:12,loadKg:8,dumbbellCount:1,loadKind:'dumbbell'}),96);assert.equal(externalVolume({tracking:'reps',actual:12,loadKg:8,dumbbellCount:2,loadKind:'dumbbell'}),192)});
test('sense reps no inventa volum',()=>assert.equal(externalVolume({tracking:'reps',actual:null,loadKg:8}),null));
test('ni flexions ni gripper són tonatge extern',()=>{for(const loadKind of ['bodyweight','grip'])assert.equal(externalVolume({tracking:'reps',actual:10,loadKg:62,loadKind}),null)});
test('62kg de cos no són 62kg aixecats per flexió',()=>assert.equal(supportedLoad({id:'pushup'},62),40.3));
test('increment específic: lateral i rem',()=>{assert.equal(config({id:'lateral',target:12}).step,.5);assert.equal(config({id:'row',target:10}).step,1)});
test('dues sessions completes al sostre proposen pes',()=>{const e=curl(),r=recommendation(e,[log(e,1),log(e,2)]);assert.equal(r.type,'weight');assert.equal(r.loadKg,8.5);assert.equal(r.target,10)});
test('un costat absent no justifica pujar',()=>{const e=curl();assert.equal(recommendation(e,[log(e,1),log(e,2,12,{side:'LEFT'})]).type,'wait')});
test('les sèries incompletes no justifiquen pujar',()=>{const e=curl();assert.equal(recommendation(e,[log(e,1),log(e,2,12,{partial:true})]).type,'wait')});
test('les últimes reps desconegudes no aprofiten èxits antics',()=>{const e=curl();assert.equal(recommendation(e,[log(e,1),log(e,2),log(e,3,null)]).type,'wait')});
test('quick d’una sèrie no equival a tres sèries',()=>{const e=curl(),a=log(e,1),b=log(e,2);a.sets=a.sets.slice(0,2);b.sets=b.sets.slice(0,2);assert.equal(recommendation(e,[a,b]).type,'wait')});
test('sense pes inicial no assigna quilos',()=>{const e=curl();e.loadKg=0;assert.equal(recommendation(e,[]).type,'wait')});
test('historial i rècord sense contaminar amb absència de reps',()=>{const e=curl(),h=exerciseHistory([log(e,1,null)],e.id)[0];assert.equal(h.weight,8);assert.equal(h.volume,null);assert.equal(h.reps,null)});
test('unilateral no duplica manuelles encara que un config ho indiqui',()=>assert.equal(config({...curl(),dumbbellCount:2}).count,1));

test('pes extern no indicat no genera volum zero fals',()=>assert.equal(externalVolume({tracking:'reps',actual:12,loadKg:0}),null));

import {csv} from '../js/storage-sync.js';
test('CSV conserva columnes noves en barrejar versions',()=>{const text=csv([{id:'old'},{id:'new',loadKg:8,partial:true}]);assert.ok(text.split('\r\n')[0].includes('loadKg'));assert.ok(text.includes('partial'))});
