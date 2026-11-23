
/* REV132 — Regia unica e progressiva per la scena centrale della homepage.
   Tutto il movimento segue lo scroll; nessuno scroll bloccato. */
(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=x=>Math.min(1,Math.max(0,x));
  const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
  let root=null,details=null,studio=null,raf=0,current=null;
  const stop=()=>{if(raf)cancelAnimationFrame(raf);raf=0};
  const set=(key,value)=>root.style.setProperty(key,value);
  const alpha=(fadeIn,fadeOut,p)=>smooth(fadeIn[0],fadeIn[1],p)*(1-smooth(fadeOut[0],fadeOut[1],p));
  function paint(p){
    const matter=alpha([0,.105],[.235,.395],p);
    const person=alpha([.23,.405],[.525,.69],p);
    const gallery=alpha([.545,.705],[.936,1],p);
    const copy=alpha([.295,.435],[.485,.605],p);
    const first=1-smooth(.71,.805,p);
    const second=smooth(.71,.805,p)*(1-smooth(.813,.904,p));
    const third=smooth(.813,.904,p);
    set('--hc-paint-opacity',matter.toFixed(4));
    set('--hc-paint-caption-opacity',alpha([.06,.14],[.215,.325],p).toFixed(4));
    set('--hc-paint-scale',(1.125-.085*smooth(.04,.38,p)).toFixed(4));
    set('--hc-paint-y',(-1.8*smooth(.04,.38,p)).toFixed(3)+'%');
    set('--hc-studio-opacity',person.toFixed(4));
    set('--hc-studio-y',(-15+24*smooth(.25,.66,p)).toFixed(2)+'px');
    set('--hc-studio-scale',(1.08-.06*smooth(.27,.67,p)).toFixed(4));
    set('--hc-copy-opacity',copy.toFixed(4));
    set('--hc-copy-y',((1-smooth(.31,.48,p))*20).toFixed(2)+'px');
    set('--hc-details-opacity',gallery.toFixed(4));
    set('--hc-detail-one-opacity',first.toFixed(4));
    set('--hc-detail-two-opacity',second.toFixed(4));
    set('--hc-detail-three-opacity',third.toFixed(4));
    set('--hc-name-one-opacity',alpha([.60,.67],[.708,.762],p).toFixed(4));
    set('--hc-name-two-opacity',alpha([.775,.815],[.823,.863],p).toFixed(4));
    set('--hc-name-three-opacity',smooth(.887,.923,p).toFixed(4));
    set('--hc-detail-s',(1.10-.075*smooth(.56,.95,p)).toFixed(4));
    set('--hc-detail-x',(-1.3*smooth(.58,.94,p)).toFixed(3)+'%');
    set('--hc-veil-opacity',smooth(.97,1,p).toFixed(4));
    if(studio){studio.inert=copy<.23;studio.style.pointerEvents=copy>.23?'auto':'none'}
    if(details){
      const active=gallery>.20;details.inert=!active;details.style.pointerEvents=active?'auto':'none';
      const currentImage=p<.758?0:p<.865?1:2;
      details.querySelectorAll('.hc-detail').forEach((el,i)=>{el.inert=!active||i!==currentImage});
    }
    root.dataset.scene=p<.30?'pittura':p<.615?'artista':'particolari';
    root.dataset.progress=Math.round(p*100);
  }
  function tick(){
    raf=0;if(!root||reduced.matches)return;
    const bounds=root.getBoundingClientRect();
    const travel=Math.max(1,bounds.height-innerHeight);
    const target=clamp(-bounds.top/travel);
    if(current===null)current=target;
    else current+=(target-current)*.20;
    if(Math.abs(target-current)<.00015)current=target;
    paint(current);
    if(current!==target)raf=requestAnimationFrame(tick);
  }
  function schedule(){if(root&&!reduced.matches&&!raf)raf=requestAnimationFrame(tick)}
  function bind(){
    const next=document.querySelector('body.on-home .home-continuum');
    if(root===next)return;
    stop();root=next;studio=next?.querySelector('.hc-studio-copy')??null;
    details=next?.querySelector('.hc-details')??null;current=null;
    if(!root)return;
    if(!reduced.matches)schedule();
    else{if(studio){studio.inert=false;studio.style.pointerEvents='auto'}if(details){details.inert=false;details.style.pointerEvents='auto'}}
  }
  const app=document.getElementById('app');
  if(app)new MutationObserver(bind).observe(app,{childList:true});
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',()=>requestAnimationFrame(bind));
  reduced.addEventListener?.('change',()=>{stop();current=null;root=null;bind()});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();

