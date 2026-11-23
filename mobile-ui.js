// Browser-only layout helpers. No user-agent sniffing and no network work.
export function initMobileUI(){
 const vv=window.visualViewport;
 let baseline=vv?.height||innerHeight,lastOrientation=innerWidth>innerHeight,timer;
 const update=()=>{
  const width=vv?.width||innerWidth,height=vv?.height||innerHeight,landscape=innerWidth>innerHeight;
  const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'');
  if(!editing&&landscape!==lastOrientation){baseline=height;lastOrientation=landscape}
  if(!editing)baseline=Math.max(baseline,height);
  const keyboard=editing&&(innerHeight-height>100||baseline-height>150);
  document.body.classList.toggle('keyboard-open',keyboard);
  document.documentElement.style.setProperty('--visual-height',height+'px');
  document.documentElement.style.setProperty('--visual-top',(vv?.offsetTop||0)+'px');
 };
 vv?.addEventListener('resize',update,{passive:true});vv?.addEventListener('scroll',update,{passive:true});
 window.addEventListener('resize',update,{passive:true});
 document.addEventListener('focusin',()=>{update();clearTimeout(timer);timer=setTimeout(update,350)});
 document.addEventListener('focusout',()=>{clearTimeout(timer);timer=setTimeout(update,160)});
 update();
}
