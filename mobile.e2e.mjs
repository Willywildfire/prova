import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const url=pathToFileURL(path.resolve('PRIMER-v11-obre-aquest.html')).href;
const browser=await chromium.launch({headless:true});
try{
 for(const [width,height] of [[320,568],[360,640],[390,844],[412,915],[768,1024],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height},isMobile:width<=720,hasTouch:width<=720});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
  const noOverflow=async(name)=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,name+' '+width);
  await page.locator('[data-day="0"]').click();await noOverflow('training');
  if(width<=720){const nav=await page.locator('.top-nav').boundingBox(),start=await page.locator('.mobile-session-bar').boundingBox();assert.ok(start.y+start.height<=nav.y+1,'fixed controls must not overlap');assert.ok((await page.locator('.top-nav button').first().boundingBox()).height>=44)}
  await page.getByRole('button',{name:'Recuperació',exact:true}).click();await noOverflow('recovery');
  if(width<=720){await page.locator('#mobile-muscle-select').selectOption('12');assert.equal(await page.locator('.muscle-detail h3').textContent(),'Bíceps')}
  await page.getByRole('button',{name:'Rutina',exact:true}).click();await noOverflow('editor');
  assert.equal(await page.locator('input[aria-label="Sèries"]').first().evaluate(e=>getComputedStyle(e).fontSize),'16px');
  await page.getByRole('button',{name:'Registre',exact:true}).click();await noOverflow('history');assert.deepEqual(errors,[]);await page.close();console.log('OK views',width,height);
 }
 for(const [width,height] of [[320,568],[390,844],[667,375]]){
  const page=await browser.newPage({viewport:{width,height},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url);
  await page.evaluate(()=>{const data=JSON.parse(localStorage.getItem('primer-v1'));data.routines[0].exercises=[{...data.routines[0].exercises[1],sets:2,unilateral:false}];localStorage.setItem('primer-v1',JSON.stringify(data))});await page.reload();await page.locator('[data-day="0"]').click();await page.getByRole('button',{name:'Començar',exact:true}).last().click();
  await page.evaluate(()=>{const d=JSON.parse(localStorage.getItem('primer-v1'));d.active.phaseStarted=Date.now()-6000;localStorage.setItem('primer-v1',JSON.stringify(d))});await page.reload();await page.locator('[data-phase="WORK_REPS"]').waitFor();await page.waitForTimeout(1250);
  assert.equal(await page.locator('.execution').evaluate(e=>e.scrollWidth>e.clientWidth),false);
  await page.getByRole('button',{name:'He acabat',exact:true}).click();await page.getByRole('button',{name:'Passar',exact:true}).click();await page.locator('[data-phase="REST"]').waitFor();assert.equal(await page.locator('dialog').count(),0);await page.getByRole('button',{name:'+15 s de descans',exact:true}).click();
  const active=await page.evaluate(()=>JSON.parse(localStorage.getItem('primer-v1')).active);assert.equal(active.sets[0].actual,null);assert.equal(active.sets[0].rir,null);assert.equal(active.targetMs,90000);assert.deepEqual(errors,[]);await page.close();console.log('OK workout',width,height);
 }
}finally{await browser.close()}
