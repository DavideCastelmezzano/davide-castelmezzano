
(()=>{
'use strict';
const app=document.getElementById('app');if(!app)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let page=null,groups=[],observer=null,mutations=null,routeGeneration=0,nextRevealAt=0;
let visible=new WeakSet(),animated=new WeakSet(),animations=new Set(),timeouts=new Set();
const addTimer=(fn,ms)=>{const h=setTimeout(()=>{timeouts.delete(h);fn()},ms);timeouts.add(h);return h};
const kindDuration={title:1290,copy:1030,label:990,action:1050};
const ease='cubic-bezier(.38,.05,.23,1)';
const usable=el=>{
 if(!el?.isConnected||el.closest('[hidden],[inert]'))return false;
 const scene=el.closest('.research24-scene');
 if(scene&&(scene.inert||scene.getAttribute('aria-hidden')==='true'))return false;
 const panel=el.closest('.bio25-panel');
 if(panel&&(!panel.classList.contains('is-active')||panel.hidden))return false;
 return true;
};
const within=el=>{
 const r=el.getBoundingClientRect();
 if(!r.width||!r.height||r.bottom<=0||r.top>=innerHeight*.94||r.right<=0||r.left>=innerWidth)return false;
 // Respect nested scrolling panels. An item may be in the viewport but clipped.
 for(let p=el.parentElement;p&&p!==app;p=p.parentElement){
  const s=getComputedStyle(p);
  if(/auto|scroll|hidden/.test(s.overflowY) && p.clientHeight+2<p.scrollHeight){
   const clip=p.getBoundingClientRect();
   if(r.top>clip.bottom-5||r.bottom<clip.top+5)return false;
  }
 }
 return true;
};
function createGroup(anchor){const group={anchor,items:[],started:false};groups.push(group);return group}
function attach(group,el,kind,position=0){
 if(!el||el.classList.contains('rev165-item'))return;
 el.classList.add('rev165-item');
 if(!reduced.matches)el.classList.add('rev165-wait','rev165-'+kind);
 group.items.push({el,kind,position,started:false});
 observer?.observe(el);
}
function add(group,selector,kind){[...group.anchor.querySelectorAll(selector)].forEach((el,i)=>attach(group,el,kind,i))}
function groupBlock(root,title,copy,label,action){
 if(!root)return;
 const g=createGroup(root);
 if(title)add(g,title,'title');
 if(label)add(g,label,'label');
 if(copy)add(g,copy,'copy');
 if(action)add(g,action,'action');
}
function pageMode(node){
 if(!node)return '';
 if(node.classList.contains('home139'))return 'home';
 if(node.classList.contains('research24'))return 'research';
 if(node.classList.contains('bio25-page'))return 'bio';
 if(node.classList.contains('suite-page'))return 'gallery';
 if(node.classList.contains('contact109'))return 'contact';
 if(node.classList.contains('legal31'))return 'legal';
 return '';
}
function establishGroups(mode){
 if(mode==='home')return; // REV163 is already bound to the page-swiping timeline.
 if(mode==='research'||mode==='bio'){
  // REV172: the reading scenes are handled by the reversible, unified
  // scroll+Gaussian controller below. Prevent competing WAAPI timelines.
  return;
 }
 if(mode==='gallery'){
  groupBlock(page.querySelector('.suite-information'),'.suite-work-info strong','.suite-work-info span',null,'.rev145-gallery-actions button');
 }
 if(mode==='contact'){
  groupBlock(page.querySelector('.contact109-story'),'h1','.contact109-center > p',null,null);
  groupBlock(page.querySelector('.contact109-area'),'.contact109-form-top h2','.contact109-form-top > p, .contact109-invite, .contact109-privacy',null,'.contact109-send');
 }
 if(mode==='legal'){
  groupBlock(page.querySelector('.legal31-body'),'h1',null,null,null);
  const c=page.querySelector('.legal31-content');
  if(c){let g=null;
   for(const el of c.children){
    if(el.matches('h2,h3')){g=createGroup(el);attach(g,el,'title',0)}
    else if(el.matches('p,ul,ol')){
     if(!g)g=createGroup(el);
     if(el.matches('p'))attach(g,el,'copy',g.items.length);
     else [...el.querySelectorAll('li')].forEach((li,i)=>attach(g,li,'copy',i));
    }
   }
  }
 }
}
/* Per ogni scena si avvia un unico orologio in lettura: titolo, poi righe
   dall'alto al basso, infine pulsante. Le righe quarta e quinta non possono
   anticipare la prima anche se entrano tutte assieme nel viewport. */
const stageGap={title:300,label:190,copy:260,action:260};
function keyframes(kind){
 if(kind==='title')return [
  {opacity:0,transform:'translate3d(0,18px,0) scale(.985)',filter:'blur(19px)',offset:0},
  {opacity:.58,transform:'translate3d(0,8px,0) scale(.992)',filter:'blur(8px)',offset:.45},
  {opacity:1,transform:'none',filter:'blur(0px)',offset:1}
 ];
 if(kind==='action')return [
  {opacity:0,transform:'translate3d(0,38px,0)',filter:'blur(3px)'},
  {opacity:.85,transform:'translate3d(0,11px,0)',filter:'blur(.7px)',offset:.66},
  {opacity:1,transform:'none',filter:'blur(0px)'}
 ];
 return [
  {opacity:0,transform:kind==='label'?'translate3d(-22px,0,0)':'translate3d(-43px,0,0)',filter:'blur(3px)'},
  {opacity:.82,transform:'translate3d(-12px,0,0)',filter:'blur(.7px)',offset:.62},
  {opacity:1,transform:'none',filter:'blur(0px)'}
 ];
}
function settle(it){
 const el=it.el;
 el.classList.remove('rev165-wait');el.classList.add('rev165-done');
 animated.add(el);
}
function run(it,delay){
 if(it.started)return;
 const el=it.el;
 if(!usable(el)||!within(el))return;
 it.started=true;
 if(reduced.matches||typeof el.animate!=='function'){settle(it);return}
 // Use a *single* animation clock per group, with meaningful overlap among stages.
 const anim=el.animate(keyframes(it.kind),{duration:kindDuration[it.kind],delay,fill:'both',easing:ease});
 animations.add(anim);
 el.classList.remove('rev165-wait');
 anim.finished.catch(()=>{}).finally(()=>{
  animations.delete(anim);
  if(el.isConnected){settle(it);anim.cancel()}
 });
}
function refresh(){
 if(!page?.isConnected)return;
 // Compare groups in document order; a whole section never starts 'at random'.
 const pending=[];
 for(const g of groups){
   if(!usable(g.anchor))continue;
   for(const it of g.items){
     if(!it.started && usable(it.el) && within(it.el))pending.push(it);
   }
 }
 if(!pending.length)return;
 let t=performance.now();
 // Between widely spaced scroll visits, return to immediate reaction; within
 // one viewport the order stays explicit and predictable.
 nextRevealAt=Math.max(t,Math.min(nextRevealAt,t+920));
 for(const it of pending){
   const delay=Math.max(0,nextRevealAt-performance.now());
   run(it,delay);
   if(it.started)nextRevealAt+=stageGap[it.kind]||230;
 }
}
let frame=0;
function schedule(){if(frame)return;frame=requestAnimationFrame(()=>{frame=0;refresh()})}
function cleanup(){
 routeGeneration++;nextRevealAt=0;
 if(frame)cancelAnimationFrame(frame);frame=0;
 observer?.disconnect();observer=null;
 mutations?.disconnect();mutations=null;
 timeouts.forEach(clearTimeout);timeouts.clear();
 for(const a of animations)a.cancel();animations.clear();
 for(const g of groups)for(const it of g.items){it.el.classList.remove('rev165-item','rev165-wait','rev165-done','rev165-title','rev165-copy','rev165-action','rev165-label')}
 groups=[];visible=new WeakSet();animated=new WeakSet();
}
function bind(){
 const current=app.querySelector(':scope > article');
 if(current===page)return;
 cleanup();page=current;
 const mode=pageMode(page);
 if(!mode)return;
 // Start after registering the observer, so elements share a common start frame.
 if('IntersectionObserver' in window){
  observer=new IntersectionObserver(()=>schedule(),{threshold:[0,.1],rootMargin:'0px 0px -8% 0px'});
 }
 establishGroups(mode);
 for(const g of groups)g.items.sort((a,b)=>a.el===b.el?0:(a.el.compareDocumentPosition(b.el)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1);
 if(mode==='research'||mode==='bio'){
  mutations=new MutationObserver(schedule);
  mutations.observe(page,{subtree:true,attributes:true,attributeFilter:['hidden','aria-hidden','data-phase','class']});
 }
 if(mode==='gallery'){
  // Animate title / metadata when a different painting is selected, not the painting itself.
  const labels=page.querySelectorAll('.suite-work-info strong,.suite-work-info span');
  labels.forEach(el=>{
   const obs=new MutationObserver(()=>{
    const it=groups.flatMap(g=>g.items).find(i=>i.el===el);
    if(!it)return;
    it.started=false;
    el.getAnimations().forEach(a=>{if(animations.has(a)){animations.delete(a);a.cancel()}});
    el.classList.remove('rev165-done');el.classList.add('rev165-wait');
    schedule();
   });
   obs.observe(el,{childList:true,characterData:true,subtree:true});
   // Track observers for teardown along with other mutation observers.
   galleryObservers.push(obs);
  });
 }
 schedule();
 const generation=routeGeneration;
 // In case a browser delays IntersectionObserver with very large inline images,
 // render any currently visible text after the layout has settled.
 addTimer(()=>{if(generation===routeGeneration)schedule()},180);
}
const galleryObservers=[];
const originalCleanup=cleanup;
cleanup=function(){galleryObservers.forEach(obs=>obs.disconnect());galleryObservers.length=0;originalCleanup()};
new MutationObserver(bind).observe(app,{childList:true});
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',schedule,{passive:true});
addEventListener('focusin',e=>{
 const el=e.target.closest?.('.rev165-item');
 if(el?.classList.contains('rev165-wait')){
  const it=groups.flatMap(g=>g.items).find(x=>x.el===el);
  if(it)run(it,0);
 }
});
reduced.addEventListener?.('change',()=>{
 if(reduced.matches){for(const g of groups)for(const it of g.items)settle(it)}
 else schedule();
});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
