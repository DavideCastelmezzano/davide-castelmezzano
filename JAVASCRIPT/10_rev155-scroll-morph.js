
(()=>{
 'use strict';
 // The original HTML is retained. Text distortion is limited to the moments of emergence/exit.
 const app=document.querySelector('#app');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(!app || reduced.matches || !window.requestAnimationFrame)return;
 const svgNS='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(svgNS,'svg');
 svg.setAttribute('aria-hidden','true');
 svg.setAttribute('width','0');svg.setAttribute('height','0');
 svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
 const defs=document.createElementNS(svgNS,'defs');svg.appendChild(defs);document.body.appendChild(svg);
 const smooth=x=>{x=Math.min(1,Math.max(0,x));return x*x*(3-2*x)};
 const clamp=x=>Math.max(0,Math.min(1,x));
 let current=null, items=[], raf=0, lastSize=innerWidth;
 function makeFilter(index){
  const filter=document.createElementNS(svgNS,'filter');
  const id='rev155-morph-'+index;
  filter.id=id;
  filter.setAttribute('x','-24%');filter.setAttribute('y','-24%');
  filter.setAttribute('width','148%');filter.setAttribute('height','148%');
  filter.setAttribute('color-interpolation-filters','sRGB');
  const noise=document.createElementNS(svgNS,'feTurbulence');
  noise.setAttribute('type','fractalNoise');
  noise.setAttribute('baseFrequency','0.022 0.048');
  noise.setAttribute('numOctaves','2');noise.setAttribute('seed',String(index*7+2));
  noise.setAttribute('result','noise');
  filter.appendChild(noise);
  const warp=document.createElementNS(svgNS,'feDisplacementMap');
  warp.setAttribute('in','SourceGraphic');warp.setAttribute('in2','noise');
  warp.setAttribute('scale','0');warp.setAttribute('xChannelSelector','R');warp.setAttribute('yChannelSelector','G');
  filter.appendChild(warp);defs.appendChild(filter);
  return {id,warp};
 }
 function attach(el,type='title',sequence=0){
  if(!el || el.dataset.rev155==='1')return;
  // Keep line breaks and typography exactly as in REV148: no splitting or replacing text.
  const isTitle=type==='title';
  el.dataset.rev155='1';el.classList.add('rev155-type');
  if(isTitle)el.classList.add('rev155-title');
  const fx=isTitle?makeFilter(items.length):null;
  items.push({el,kind:type,seq:sequence,fx,was:NaN});
 }
 function home(){ /* REV161: homepage handled by the coordinated scroll motion below. */ }
 function other(){
  const page=app.querySelector(':scope > article.page');
  if(!page)return;
  // Long text and existing research scroll transitions are left untouched.
  // REV166: this route belongs to the coordinated REV165/166 entrance timeline.
  // Previously this legacy scroll morph applied opacity/transform/filter !important
  // to the contact headings, cancelling their intended entrance animation.
  if(page.classList.contains('contact109'))return;
 }
 function configure(){
  cancelAnimationFrame(raf);raf=0;
  for(const item of items){item.el.removeAttribute('data-rev155');item.el.classList.remove('rev155-type','rev155-title');
   item.el.style.removeProperty('opacity');item.el.style.removeProperty('transform');item.el.style.removeProperty('filter');}
  items=[];defs.replaceChildren();
  current=app.querySelector(':scope > article.page');
  if(!current)return;
  if(current.classList.contains('home'))home();else other();
  schedule();
 }
 function tick(){
  raf=0;
  if(!items.length || reduced.matches)return;
  const h=Math.max(320,window.innerHeight);
  const mobile=window.innerWidth<700;
  for(const item of items){
   const {el,kind,seq,fx}=item;
   if(!el.isConnected)continue;
   const rect=el.getBoundingClientRect();
   // Element offscreen: do not waste GPU time, but preserve a reversible state.
   if(rect.top>h+180 || rect.bottom< -180)continue;
   const title=kind==='title', body=kind==='body';
   // Entry happens in the lower 1/3 of the viewport. Words follow one another slightly.
   const low=(title?.94:(body?.90:.92))*h;
   const high=(title?.64:(body?.71:.70))*h;
   const stagger=seq*(title?14:9);
   const enter=smooth((low-(rect.top+stagger))/(low-high));
   // Exit only when text is approaching the top edge. Body copy remains clear longer.
   const exitStart=(title?.19:(body?.12:.15))*h;
   const exitEnd=(title?-.025:(body?-.08:-.04))*h;
   const exit=smooth((exitStart-rect.bottom)/(exitStart-exitEnd));
   const visibility=clamp(enter*(1-exit));
   const softness=1-visibility;
   const op=(title ? visibility : Math.min(1,.10+.90*visibility));
   const blur=softness*(title?(mobile?3.4:5.2):(body?2.1:2.6));
   const dy=(1-enter)*(title?14:8) + exit*(title?-9:-5);
   const stretch=title?(.985+.015*visibility):1;
   // Prevent CSS animations from the original site from overriding scroll direction.
   el.style.setProperty('opacity',op.toFixed(3),'important');
   el.style.setProperty('transform',`translate3d(0,${dy.toFixed(2)}px,0) scaleX(${stretch.toFixed(4)})`,'important');
   if(fx){
    const displaced=softness*(mobile?9:18);
    fx.warp.setAttribute('scale',displaced.toFixed(2));
    el.style.setProperty('filter',softness<.015?'none':`url(#${fx.id}) blur(${blur.toFixed(2)}px)`,'important');
   } else el.style.setProperty('filter',blur<.05?'none':`blur(${blur.toFixed(2)}px)`,'important');
   item.was=visibility;
  }
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(tick)}
 // Separate pages are mounted by the site's router; no animations across routes.
 new MutationObserver(()=>{
  const page=app.querySelector(':scope > article.page');
  if(page!==current)configure();
 }).observe(app,{childList:true});
 window.addEventListener('scroll',schedule,{passive:true});
 document.addEventListener('rev160:frame',schedule);
 window.addEventListener('resize',schedule,{passive:true});
 reduced.addEventListener?.('change',()=>{
  for(const item of items){for(const property of ['opacity','transform','filter'])item.el.style.removeProperty(property)}
  if(!reduced.matches)schedule();
 });
 configure();
})();
