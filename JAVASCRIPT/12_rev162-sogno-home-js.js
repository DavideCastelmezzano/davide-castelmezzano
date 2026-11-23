
(()=>{
 'use strict';
 const app=document.getElementById('app');
 if(!app)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const clamp=n=>Math.max(0,Math.min(1,n));
 const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
  const ns='http://www.w3.org/2000/svg';
 let page=null,items=[],svg=null,defs=null,raf=0,prev=0,resizeHandle=0;
 const timing={about:null,neo:null};
 const getSection=(name)=>page?.querySelector(name==='about'?'.home139-about':'.home139-neo');
 function fxCreate(id){
   if(!svg){
     svg=document.createElementNS(ns,'svg');
     svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
     svg.setAttribute('width','0');svg.setAttribute('height','0');
     svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
     defs=document.createElementNS(ns,'defs');svg.appendChild(defs);document.body.appendChild(svg);
   }
   const f=document.createElementNS(ns,'filter');
   f.setAttribute('id',id);f.setAttribute('x','-30%');f.setAttribute('y','-48%');
   f.setAttribute('width','160%');f.setAttribute('height','195%');
   f.setAttribute('color-interpolation-filters','sRGB');
   const noise=document.createElementNS(ns,'feTurbulence');
   noise.setAttribute('type','fractalNoise');noise.setAttribute('baseFrequency','.013 .030');
   noise.setAttribute('numOctaves','2');noise.setAttribute('seed',String(7+items.length*9));
   noise.setAttribute('result','fog');
   const warp=document.createElementNS(ns,'feDisplacementMap');
   warp.setAttribute('in','SourceGraphic');warp.setAttribute('in2','fog');
   warp.setAttribute('xChannelSelector','R');warp.setAttribute('yChannelSelector','G');
   warp.setAttribute('scale','0');f.append(noise,warp);defs.append(f);
   return {id,warp};
 }
 function cleanup(){
   if(raf)cancelAnimationFrame(raf);raf=0;prev=0;
   for(const item of items){
     const el=item.el;
     for(const k of ['opacity','transform','filter','pointer-events','will-change','text-shadow'])el.style.removeProperty(k);
     if(item.originalTab!==null)el.setAttribute('tabindex',item.originalTab);
     else if(item.kind==='button')el.removeAttribute('tabindex');
     el.classList.remove('rev162-item');
   }
   items=[];
   if(defs)defs.replaceChildren();
   timing.about=null;timing.neo=null;
 }
 function item(selector,section,kind,delay,duration,gateStart,gateEnd){
   const el=page.querySelector(selector);if(!el)return;
   el.classList.add('rev162-item');
   const filtered=kind==='title';
   const fx=filtered?fxCreate('rev162-fog-'+items.length):null;
   const originalTab=kind==='button'?el.getAttribute('tabindex'):null;
   items.push({el,section,kind,delay,duration,gateStart,gateEnd,fx,originalTab,q:0,tabActive:null});
 }
 function bind(){
   const next=app.querySelector(':scope > article.home139');
   if(next===page)return;
   cleanup();page=next;
   if(!page)return;
   // REV163: the large titles start forming as the slide enters the viewport.
   // Copy and actions arrive during the SAME movement, not seconds afterward.
   // gateStart/gateEnd refer to the visible panel's fraction of travel (0..1).
   item('.home139-about .home139-statement > span:first-child','about','title',0,580,.25,.58);
   item('.home139-about-label','about','label',135,590,.47,.71);
   item('.home139-about .home139-statement > span:nth-child(2)','about','title',80,610,.34,.66);
   item('.home139-about-copy > p','about','copy',195,650,.54,.83);
   item('.home139-about .art-about-link','about','button',270,670,.64,.94);
   item('.home139-neo-title h1 > span:first-child','neo','title',0,560,.24,.57);
   item('.home139-neo-serie','neo','label',135,570,.46,.70);
   item('.home139-neo-title h1 > span:nth-child(2)','neo','title',80,605,.34,.64);
   item('.home139-neo-info > h2','neo','label',175,575,.52,.75);
   item('.home139-neo-info > p','neo','copy',255,650,.60,.86);
   item('.home139-neo-link','neo','button',345,665,.69,.95);
   // The first frame is drawn before the user reaches these sections.
   request();
 }
 function getMobileProgress(section){
   const el=getSection(section);if(!el)return 0;
   const r=el.getBoundingClientRect();
   const height=Math.max(320,innerHeight);
   return clamp((height*.99-r.top)/(height*.78));
 }
 function progress(){
   if(!page)return {about:0,neo:0};
   if(page.classList.contains('rev160-enhanced')){
     const a=getSection('about'),n=getSection('neo');
     const get=(el,name)=>{const v=parseFloat(el?.style.getPropertyValue(name));return clamp((100-(Number.isFinite(v)?v:100))/100)};
     return {about:get(a,'--rev160-y-about'),neo:get(n,'--rev160-y-neo')};
   }
   return {about:getMobileProgress('about'),neo:getMobileProgress('neo')};
 }
 // On small screens the sections include a tall photograph BEFORE the text.
 // Trigger per text element on viewport entry; timing the whole section would
 // finish the reveal while the typography is still off-screen.
 function mobileItemGate(it){
   const r=it.el.getBoundingClientRect();
   const vh=Math.max(320,innerHeight);
   return smooth((vh*.97-r.top)/(vh*.34));
 }
 function paint(item,small){
   const {el,q,kind,fx}=item;
   // REV205: on narrow layouts the second homepage panel must remain crisp.
   // The panel itself still slides in, but the individual words/button no
   // longer wait for separate blurred scroll thresholds to become legible.
   if((innerWidth<=900 || (innerWidth<=950 && innerHeight<=500)) && item.section==='about'){
     el.style.setProperty('opacity','1','important');
     el.style.setProperty('transform','none','important');
     el.style.setProperty('filter','none','important');
     el.style.setProperty('text-shadow','none','important');
     el.style.setProperty('will-change','auto');
     if(item.kind==='button'){
       el.style.setProperty('pointer-events','auto');
       if(item.originalTab===null)el.removeAttribute('tabindex');
       else el.setAttribute('tabindex',item.originalTab);
       item.tabActive=true;
     }
     return;
   }
   const vanish=1-q;
   if(kind==='title'){
     // The apparition begins as a slightly fractured, luminous fog and settles into sharp type.
     const alpha=Math.pow(q,.79);
     const blur=Math.pow(vanish,1.22)*(small?15:22);
     const dy=vanish*(small?28:43);
     const dx=vanish*(kind==='title'?(small?3:7):0);
     el.style.setProperty('opacity',alpha.toFixed(4),'important');
     el.style.setProperty('transform',`translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${(1-.036*vanish).toFixed(5)})`,'important');
     if(fx){
       fx.warp.setAttribute('scale',(Math.pow(vanish,1.15)*(small?12:20)).toFixed(2));
       el.style.setProperty('filter',q>.994?'none':`url(#${fx.id}) blur(${blur.toFixed(2)}px)`,'important');
     }
     // The faint halo is visible only during the early haze, not around settled text.
     el.style.setProperty('text-shadow',q>.986?'none':`0 0 ${(vanish*23).toFixed(1)}px rgba(255,255,255,${(.17*vanish).toFixed(3)})`,'important');
   }else if(kind==='copy'||kind==='label'){
     const x=-vanish*(kind==='copy'?(small?43:78):(small?20:38));
     const dy=kind==='label'?vanish*7:0;
     const blur=Math.pow(vanish,1.2)*(kind==='copy'? (small?3.4:5.4):4.8);
     el.style.setProperty('opacity',Math.pow(q,.90).toFixed(4),'important');
     el.style.setProperty('transform',`translate3d(${x.toFixed(2)}px,${dy.toFixed(2)}px,0)`,'important');
     el.style.setProperty('filter',q>.993?'none':`blur(${blur.toFixed(2)}px)`,'important');
   }else{
     const y=vanish*(small?49:80);
     const blur=Math.pow(vanish,1.32)*(small?3.8:6.5);
     el.style.setProperty('opacity',Math.pow(q,1.05).toFixed(4),'important');
     el.style.setProperty('transform',`translate3d(0,${y.toFixed(2)}px,0) scale(${(1-.045*vanish).toFixed(5)})`,'important');
     el.style.setProperty('filter',q>.993?'none':`blur(${blur.toFixed(2)}px)`,'important');
     const active=q>.79;
     if(active!==item.tabActive){
       el.style.setProperty('pointer-events',active?'auto':'none');
       if(active){if(item.originalTab===null)el.removeAttribute('tabindex');else el.setAttribute('tabindex',item.originalTab)}
       else el.setAttribute('tabindex','-1');
       item.tabActive=active;
     }
   }
   el.style.setProperty('will-change',q>.008&&q<.995?'transform,opacity,filter':'auto');
 }
 function frame(now){
   raf=0;
   if(!page?.isConnected||!items.length)return;
   if(reduced.matches){
     for(const it of items){it.q=1;it.el.style.setProperty('opacity','1','important');it.el.style.setProperty('transform','none','important');it.el.style.setProperty('filter','none','important');it.el.style.setProperty('text-shadow','none','important');it.el.style.removeProperty('pointer-events');if(it.kind==='button'){it.el.removeAttribute('tabindex')}}
     return;
   }
   const current=progress(),small=innerWidth<=760;
   let again=false;
   for(const name of ['about','neo']){
     if(current[name]>.18&&timing[name]===null)timing[name]=now;
     if(current[name]<.065&&timing[name]!==null&&items.filter(it=>it.section===name).every(it=>it.q<.022))timing[name]=null;
   }
   const exit=smooth((current.neo-.22)/.67);
   const dt=prev?Math.min(46,Math.max(8,now-prev)):16.67;
   prev=now;
   for(const it of items){
     const p=current[it.section];
     const reading=it.section==='about'?(1-exit):1;
     const scrollGate=(small && it.section==='about' && it.kind==='button'
         ? smooth((p-.29)/.40)
         : (small ? mobileItemGate(it) : smooth((p-it.gateStart)/(it.gateEnd-it.gateStart))))*reading;
     // The clock only softens the reveal; scroll controls when it begins.
     // The shorter duration makes it complete BEFORE the slide settles.
     const elapsed=timing[it.section]===null?0:Math.max(0,now-timing[it.section]-it.delay);
     const dreamClock=smooth(elapsed/it.duration);
     const target=Math.min(scrollGate,dreamClock);
     const tau=target>it.q?62:90;
     const alpha=1-Math.exp(-dt/tau);
     it.q+=(target-it.q)*alpha;
     if(Math.abs(it.q-target)<.002)it.q=target;
     if(Math.abs(it.q-target)>.0018 || (scrollGate>dreamClock+.001 && timing[it.section]!==null))again=true;
     paint(it,small);
   }
   if(again)request();
 }
 function request(){if(!raf)raf=requestAnimationFrame(frame)}
 new MutationObserver(()=>{const next=app.querySelector(':scope > article.home139');if(next!==page)bind()}).observe(app,{childList:true});
 addEventListener('scroll',request,{passive:true});
 document.addEventListener('rev160:frame',request);
 addEventListener('resize',()=>{clearTimeout(resizeHandle);resizeHandle=setTimeout(request,60)},{passive:true});
 reduced.addEventListener?.('change',request);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
