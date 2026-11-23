
(()=>{
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  const phone=matchMedia('(max-width:760px)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const clamp=v=>Math.min(1,Math.max(0,v));
  const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
  let route=null,groups=[],frame=0,classObserver=null;
  const active=(g)=>g.scroller.isConnected&&g.scroller.getClientRects().length&&
    (g.kind!=='bio'||(!g.scroller.hidden&&g.scroller.classList.contains('is-active'))) &&
    (g.kind!=='neo'||g.scroller.closest('.research24-scene')?.getAttribute('aria-hidden')!=='true');

  function clearStyles(line){
    line.classList.remove('rev176-mobile-reading-line');
    line.style.removeProperty('--rev176-edge-opacity');
    line.style.removeProperty('--rev176-edge-blur');
  }
  function clear(){
    if(frame){cancelAnimationFrame(frame);frame=0}
    classObserver?.disconnect();classObserver=null;
    for(const group of groups){
      group.scroller.removeEventListener('scroll',request);
      group.scroller.classList.remove('rev176-scroll-active');
      group.scroller.style.removeProperty('--rev176-mask-top');
      group.scroller.style.removeProperty('--rev176-mask-bottom');
      group.lines.forEach(clearStyles);
    }
    groups=[];
  }
  function request(){if(!frame)frame=requestAnimationFrame(paint)}
  function paint(){
    frame=0;
    for(const g of groups){
      if(!g.scroller.isConnected)continue;
      const show=phone.matches&&!reduced.matches&&active(g);
      const scroller=g.scroller;
      const rect=scroller.getBoundingClientRect();
      const scrollable=scroller.scrollHeight>scroller.clientHeight+26;
      const useEffect=show&&scrollable&&rect.height>130;
      const atTop=scroller.scrollTop<6;
      const atBottom=scroller.scrollHeight-scroller.clientHeight-scroller.scrollTop<7;
      // Fade the actual scroll boundary as well as the paragraph shapes.
      // Mask distances shrink to zero at either end so the first and last
      // lines remain entirely legible when reading stops there.
      scroller.classList.toggle('rev176-scroll-active',useEffect);
      if(useEffect){
        const distanceToEnd=Math.max(0,scroller.scrollHeight-scroller.clientHeight-scroller.scrollTop);
        scroller.style.setProperty('--rev176-mask-top',Math.min(49,scroller.scrollTop*.60).toFixed(1)+'px');
        scroller.style.setProperty('--rev176-mask-bottom',Math.min(66,distanceToEnd*.60).toFixed(1)+'px');
      }else{
        scroller.style.removeProperty('--rev176-mask-top');
        scroller.style.removeProperty('--rev176-mask-bottom');
      }
      const top=rect.top+4,bot=rect.bottom-4;
      // Softness is proportional to the *text's* distance to the two
      // boundaries, not to the mouse wheel delta or an independent timer.
      const topExtent=Math.min(95,Math.max(54,rect.height*.14));
      const bottomExtent=Math.min(112,Math.max(67,rect.height*.17));
      for(const el of g.lines){
        if(!useEffect){
          el.style.removeProperty('--rev176-edge-opacity');
          el.style.removeProperty('--rev176-edge-blur');
          continue;
        }
        // The REV175 entrance animation runs first. No second script is
        // allowed to obscure or reset its ordered title -> paragraph reveal.
        if(!el.classList.contains('rev175-entrance-complete'))continue;
        const b=el.getBoundingClientRect();
        const entering=atBottom?1:smooth((bot-b.top)/bottomExtent);
        const leaving=atTop?1:smooth((b.bottom-top)/topExtent);
        const visible=Math.min(entering,leaving);
        const blur=(1-visible)*10.5;
        el.style.setProperty('--rev176-edge-opacity',visible.toFixed(3));
        el.style.setProperty('--rev176-edge-blur',blur.toFixed(2)+'px');
      }
    }
  }
  function add(scroller,selector,kind){
    if(!scroller)return;
    const lines=[...scroller.querySelectorAll(selector)];
    if(!lines.length)return;
    lines.forEach(el=>el.classList.add('rev176-mobile-reading-line'));
    groups.push({scroller,lines,kind});
    scroller.addEventListener('scroll',request,{passive:true});
  }
  function bind(){
    const next=app.querySelector(':scope > article');
    if(next===route)return;
    clear();route=next;
    if(!route)return;
    if(route.classList.contains('bio25-page')){
      const bio=route.querySelector('.bio25-panel[data-bio-panel="bio"]');
      add(bio,'.bio25-title, .bio25-columns p','bio');
    }else if(route.classList.contains('research24')){
      const neo=route.querySelector('.research24-scene.second .research24-contents');
      add(neo,'.research24-title, .research24-cols p','neo');
    }
    if(groups.length){
      // React only to the completion classes of REV175, not to individual
      // style writes, so the observer cannot create rendering loops.
      classObserver=new MutationObserver(request);
      for(const g of groups)g.lines.forEach(el=>classObserver.observe(el,{
        attributes:true,attributeFilter:['class']
      }));
    }
    request();
  }
  new MutationObserver(bind).observe(app,{childList:true});
  addEventListener('resize',request,{passive:true});
  addEventListener('orientationchange',request,{passive:true});
  phone.addEventListener?.('change',request);
  reduced.addEventListener?.('change',request);
  bind();
})();
