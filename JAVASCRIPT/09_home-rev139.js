/* REV139 — Tre dettagli pittorici in loop e soglia di ingresso dalla REV128. */
(function(){
 const app=document.getElementById('app'),entry=document.getElementById('home139-entry');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let boundRoot=null,stopSlides=()=>{},firstVisit=true,introTimer=0,introStop=0;
 function finishIntro(immediate=false){
  clearTimeout(introTimer);clearTimeout(introStop);
  if(!entry||entry.hidden)return;
  if(immediate||reduced.matches){window.DavideIntro177?.endImmediately(false);entry.hidden=true;document.body.classList.remove('home139-entry-active');document.dispatchEvent(new Event('home139:introEnd'));return;}
  const close=()=>{entry.hidden=true;entry.classList.remove('intro177-evaporating');document.body.classList.remove('home139-entry-active');document.dispatchEvent(new Event('home139:introEnd'));};
  if(window.DavideIntro177){window.DavideIntro177.reveal(close);}else{close();}
 }
 function enterIntro(){
  if(!entry||!firstVisit)return;
  firstVisit=false;
  if(!document.body.classList.contains('on-home')){entry.hidden=true;return;}
  entry.hidden=false;
  document.body.classList.add('home139-entry-active');
  window.DavideIntro177?.begin();
  if(reduced.matches){finishIntro(true);return;}
  /* REV189: entrance remains available until CTA interaction. */
 }
 function initSlides(root){
  const slides=[...root.querySelectorAll('.home139-slide')];if(slides.length<2)return()=>{};
  let idx=0,timer=0,observer=null,seen=true;
  const available=()=>root.isConnected&&!document.hidden&&seen&&!reduced.matches&&!document.body.classList.contains('home139-entry-active');
  const next=()=>{slides[idx].classList.remove('is-active');idx=(idx+1)%slides.length;slides[idx].classList.add('is-active')};
  const schedule=()=>{clearInterval(timer);if(available())timer=setInterval(next,6200)};
  if('IntersectionObserver' in window){observer=new IntersectionObserver(es=>{seen=es[0]?.isIntersecting??true;schedule()},{threshold:.08});observer.observe(root)}
  document.addEventListener('visibilitychange',schedule);document.addEventListener('home139:introEnd',schedule);reduced.addEventListener?.('change',schedule);
  schedule();
  return()=>{clearInterval(timer);observer?.disconnect();document.removeEventListener('visibilitychange',schedule);document.removeEventListener('home139:introEnd',schedule);reduced.removeEventListener?.('change',schedule)};
 }
 function refresh(){
  const root=app?.querySelector('.home139-hero');
  if(firstVisit)enterIntro();
  if(root!==boundRoot){stopSlides();boundRoot=root;stopSlides=root?initSlides(root):()=>{};if(!root)finishIntro(true)}
 }
 entry?.querySelector('.rev189-enter')?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();finishIntro(false)});
 entry?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();finishIntro(true)}});
 new MutationObserver(refresh).observe(app,{childList:true});
 refresh();
})();
