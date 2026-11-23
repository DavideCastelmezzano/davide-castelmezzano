
(()=>{
 'use strict';
 const app=document.getElementById('app');
 if(!app)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
 const ease=t=>{t=clamp(t);return t*t*(3-2*t)};
 const timings={hero:.22,enter:.58,read:.42,next:.58,end:.20};
 let root=null,sections=[],track=null,stage=null,raf=0,previous=0;
 let visibleAbout=0,visibleNeo=0, initialized=false;
 let pause=null,endPause=null,mode='none';
 const shouldPin=()=>!reduced.matches && innerWidth>700;
 function clearFrame(){if(raf)cancelAnimationFrame(raf);raf=0;previous=0;}
 function measure(){
  if(!track||!stage)return;
  const vh=stage.getBoundingClientRect().height||innerHeight;
  const span=vh*(timings.hero+timings.enter+timings.read+timings.next+timings.end);
  track.style.setProperty('--rev160-track-height',`${(vh+span).toFixed(2)}px`);
 }
 function moveToNative(){
   if(!root||!sections.length)return;
   if(stage){
     // I nodi originali vengono ripristinati, senza clonare immagini o testi.
     for(const sec of sections)root.insertBefore(sec,track);
     track?.remove();stage=null;track=null;
   }
   root.classList.remove('rev160-enhanced');
   pause ||= document.createElement('div');
   pause.className='rev156-reading-pause';pause.setAttribute('aria-hidden','true');
   endPause ||= document.createElement('div');
   endPause.className='rev156-end-pause';endPause.setAttribute('aria-hidden','true');
   root.insertBefore(pause,sections[2]);root.appendChild(endPause);
   for(const section of sections){
     section.style.removeProperty('--rev160-y-about');
     section.style.removeProperty('--rev160-y-neo');
     section.style.removeProperty('--rev159-lag');
     section.style.removeProperty('--rev159-stick-top');
   }
   mode='native';
 }
 function moveToPinned(){
   if(!root||!sections.length)return;
   pause?.remove();endPause?.remove();
   root.classList.add('rev160-enhanced');
   track=document.createElement('div');track.className='rev160-scroll-track';
   stage=document.createElement('div');stage.className='rev160-scroll-stage home139';
   track.append(stage);root.insertBefore(track,sections[0]);
   sections.forEach(sec=>stage.appendChild(sec));
   sections[1].style.setProperty('--rev160-y-about','100%');
   sections[2].style.setProperty('--rev160-y-neo','100%');
   measure();
   mode='pinned';
 }
 function recalcMode(){
   if(!root)return;
   const desired=shouldPin()?'pinned':'native';
   if(desired!==mode){
     clearFrame();
     if(desired==='pinned')moveToPinned();else moveToNative();
     visibleAbout=0;visibleNeo=0;initialized=false;
   }
   if(mode==='pinned')measure();
   else{
     const vh=innerHeight;
     for(const panel of sections.slice(1)){
       const offset=Math.min(0,vh-panel.offsetHeight);
       panel.style.setProperty('--rev160-stick-top',offset.toFixed(2)+'px');
     }
   }
   requestDraw();
 }
 function bind(){
   const page=app.querySelector(':scope > article.home139');
   if(page===root)return;
   clearFrame();root=page;stage=null;track=null;
   pause=null;endPause=null;mode='none';initialized=false;
   sections=page?[
     page.querySelector(':scope > section.home139-hero'),
     page.querySelector(':scope > section.home139-about'),
     page.querySelector(':scope > section.home139-neo')
   ]:[];
   if(sections.some(sec=>!sec)){sections=[];return;}
   recalcMode();
 }
 function draw(time){
   raf=0;
   if(!root?.isConnected||sections.length!==3||mode!=='pinned'||!track||!stage)return;
   const vh=stage.offsetHeight||innerHeight;
   const y=window.scrollY;
   const offset=y-(y+track.getBoundingClientRect().top);
   const p1=clamp((offset-timings.hero*vh)/(timings.enter*vh));
   const p2=clamp((offset-(timings.hero+timings.enter+timings.read)*vh)/(timings.next*vh));
   const targetAbout=ease(p1), targetNeo=ease(p2);
   if(!initialized){visibleAbout=targetAbout;visibleNeo=targetNeo;initialized=true;}
   else {
      // Critically damped-feeling, no wheel interception or scroll hijacking.
      // The image only catches up while a panel is actually changing.
      const dt=previous?clamp(time-previous,8,42):16.7;
      const alpha=1-Math.exp(-dt/80);
      if(Math.abs(targetAbout-visibleAbout)>.00015)visibleAbout+=(targetAbout-visibleAbout)*alpha;
      else visibleAbout=targetAbout;
      if(Math.abs(targetNeo-visibleNeo)>.00015)visibleNeo+=(targetNeo-visibleNeo)*alpha;
      else visibleNeo=targetNeo;
   }
   previous=time;
   const aboutY=(100*(1-visibleAbout));
   const neoY=(100*(1-visibleNeo));
   sections[1].style.setProperty('--rev160-y-about',`${aboutY.toFixed(4)}%`);
   sections[2].style.setProperty('--rev160-y-neo',`${neoY.toFixed(4)}%`);
   // Il morphing dei testi legge le nuove posizioni dopo ogni frame di slide.
   document.dispatchEvent(new Event('rev160:frame'));
   if(Math.abs(targetAbout-visibleAbout)>.00015||Math.abs(targetNeo-visibleNeo)>.00015)requestDraw();
 }
 function requestDraw(){if(!raf)raf=requestAnimationFrame(draw);}
 let resizeHandle=0;
 function onResize(){
   clearTimeout(resizeHandle);
   resizeHandle=setTimeout(()=>{
     const before=mode;
     recalcMode();
     if(mode==='pinned'&&before===mode){initialized=false;requestDraw();}
   },70);
 }
 new MutationObserver(bind).observe(app,{childList:true});
 addEventListener('scroll',requestDraw,{passive:true});
 addEventListener('resize',onResize,{passive:true});
 reduced.addEventListener?.('change',recalcMode);
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
