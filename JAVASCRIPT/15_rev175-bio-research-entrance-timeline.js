
(()=>{
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const animations=new Set();
  let route=null,scenes=[],pageObserver=null,sceneObserver=null,frame=0;
  const ease='cubic-bezier(.32,.09,.22,1)';

  function clear(){
    if(frame){cancelAnimationFrame(frame);frame=0}
    pageObserver?.disconnect();pageObserver=null;
    sceneObserver?.disconnect();sceneObserver=null;
    for(const a of animations)a.cancel();animations.clear();
    for(const scene of scenes){
      for(const el of scene.parts){
        el.classList.remove('rev175-entrance-pending','rev175-entrance-complete');
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.style.removeProperty('filter');
      }
    }
    scenes=[];
  }
  function isActive(scene){
    if(!scene.root.isConnected)return false;
    if(scene.kind==='bio')return scene.root.classList.contains('is-active')&&!scene.root.hidden;
    return !scene.root.inert&&scene.root.getAttribute('aria-hidden')!=='true';
  }
  function initScene(root,kind){
    if(!root)return;
    const title=root.querySelector(kind==='bio'?'.bio25-title':'.research24-title');
    const paragraphs=[...root.querySelectorAll(kind==='bio'?'.bio25-columns p':'.research24-cols p')];
    const parts=[title,...paragraphs].filter(Boolean);
    if(!parts.length)return;
    scenes.push({root,kind,parts,played:false});
    if(!reduced.matches){
      // The title is first, followed by paragraphs in source/reading order.
      for(const el of parts)el.classList.add('rev175-entrance-pending');
    }
  }
  function titleFrames(){
    // The same soft Gaussian reveal used by the site's other large headings.
    return [
      {opacity:0,filter:'blur(17px)',transform:'translate3d(0,18px,0) scale(.985)',offset:0},
      {opacity:.56,filter:'blur(7px)',transform:'translate3d(0,7px,0) scale(.993)',offset:.48},
      {opacity:1,filter:'blur(0px)',transform:'translate3d(0,0,0) scale(1)',offset:1}
    ];
  }
  function paragraphFrames(){
    // Very light blur only during entrance, never when reading or scrolling.
    return [
      {opacity:0,filter:'blur(3.5px)',transform:'translate3d(-36px,0,0)',offset:0},
      {opacity:.76,filter:'blur(1px)',transform:'translate3d(-9px,0,0)',offset:.64},
      {opacity:1,filter:'blur(0px)',transform:'translate3d(0,0,0)',offset:1}
    ];
  }
  function finish(el){
    el.classList.remove('rev175-entrance-pending');
    el.classList.add('rev175-entrance-complete');
    el.style.opacity='1';
    el.style.filter='none';
    el.style.transform='none';
  }
  function play(scene){
    if(scene.played||!isActive(scene))return;
    scene.played=true;
    scene.parts.forEach((el,i)=>{
      const heading=i===0;
      if(reduced.matches||typeof el.animate!=='function'){
        finish(el);return;
      }
      el.classList.remove('rev175-entrance-pending');
      // Wait for the heading to start before the first paragraph, then
      // advance paragraph by paragraph: left column first, right column last.
      const delay=heading?0:240+(i-1)*225;
      const anim=el.animate(heading?titleFrames():paragraphFrames(),{
        duration:heading?1280:1040,
        delay,
        fill:'both',
        easing:ease
      });
      animations.add(anim);
      anim.finished.then(()=>{
        if(el.isConnected)finish(el);
      }).catch(()=>{}).finally(()=>{
        animations.delete(anim);
        anim.cancel();
      });
    });
  }
  function update(){
    frame=0;
    for(const scene of scenes)if(isActive(scene))play(scene);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update)}
  function bind(){
    const next=app.querySelector(':scope > article');
    if(next===route)return;
    clear();route=next;
    if(!route)return;
    if(route.classList.contains('bio25-page')){
      initScene(route.querySelector('.bio25-panel[data-bio-panel="bio"]'),'bio');
      pageObserver=new MutationObserver(schedule);
      pageObserver.observe(route,{subtree:true,attributes:true,attributeFilter:['hidden','class']});
    }else if(route.classList.contains('research24')){
      route.querySelectorAll('.research24-scene').forEach(el=>initScene(el,'research'));
      sceneObserver=new MutationObserver(schedule);
      // React to actual scene switches without observing animation styles.
      sceneObserver.observe(route,{subtree:true,attributes:true,attributeFilter:['aria-hidden','inert','data-phase']});
    }
    schedule();
  }
  new MutationObserver(bind).observe(app,{childList:true});
  reduced.addEventListener?.('change',()=>{
    if(reduced.matches){
      for(const a of animations)a.cancel();animations.clear();
      for(const scene of scenes)for(const el of scene.parts)finish(el);
    }
    schedule();
  });
  bind();
})();
