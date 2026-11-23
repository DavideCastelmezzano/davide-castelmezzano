
/* REV169: sostituisce solo il gestore menu della REV138.
   L'apertura usa uno sfogliamento dall'alto; la chiusura ne ripercorre il movimento. */
(()=>{
 'use strict';
 const toggle=document.getElementById('menu-toggle');
 const nav=document.getElementById('site-nav');
 if(!toggle||!nav)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const links=[...nav.querySelectorAll('a[data-nav]')];
 const order=['opere','bio','ricerca','contatti'];
 for(const name of order){const a=links.find(x=>x.dataset.nav===name);if(a)nav.append(a)}
 const ordered=order.map(name=>links.find(x=>x.dataset.nav===name)).filter(Boolean);
 ordered.forEach((a,index)=>{
   if(a.dataset.nav==='bio')a.textContent='Bio';
   let ink=a.querySelector('.rev169-link-ink');
   if(!ink){ink=document.createElement('span');ink.className='rev169-link-ink';ink.textContent=a.textContent; a.replaceChildren(ink)}
   a.style.setProperty('--rev169-order',String(index));
 });
 const lang=document.createElement('div');lang.className='rev169-lang';lang.setAttribute('aria-label','Lingua del sito: italiano');
 lang.innerHTML='<button type="button" class="rev169-lang-current" data-lang="it" aria-pressed="true">IT</button><button type="button" data-lang="en" aria-pressed="false">EN</button>';
 nav.append(lang);
 // REV181 — two direct channels below the IT / ENG visual label.
 // The exact addresses are the same as those already used on Contatti.
 const socials=document.createElement('div');
 socials.className='rev181-socials';socials.setAttribute('aria-label','Contatti diretti');
 socials.innerHTML=`<a class="rev181-social-link" href="https://www.instagram.com/davidecastelmezzano/" target="_blank" rel="noopener noreferrer" aria-label="Instagram di Davide Castelmezzano" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.1" y="3.1" width="17.8" height="17.8" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r=".9" fill="currentColor" stroke="none"/></svg></a><a class="rev181-social-link" href="mailto:davidecastelmezzano@yahoo.com" aria-label="Scrivi un'email a Davide Castelmezzano" title="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M16 8v5.3c0 1.7 2.4 2.6 3.6.8C24.1 6.8 17.9 2.4 12 2.4a9.6 9.6 0 1 0 6.7 16.5"/></svg></a>`;
 nav.append(socials);
 let state='closed',savedFocus=null,ending=0,opening=0,routeHold=0;
 const clear=()=>{clearTimeout(ending);clearTimeout(opening);clearTimeout(routeHold);ending=0;opening=0;routeHold=0};
 const duration=()=>reduced.matches?0:860;
 const updateCurrent=()=>{
   const hash=location.hash||'#/';
   let active=hash.includes('/ricerca')?'ricerca':hash.includes('/bio')?'bio':hash.includes('/contatti')?'contatti':'opere';
   for(const a of ordered)a.classList.toggle('rev169-current',a.dataset.nav===active);
 };
 const restoreFocus=()=>{
   if(savedFocus?.isConnected && savedFocus!==document.body)savedFocus.focus({preventScroll:true});
   else toggle.focus({preventScroll:true});
 };
 function open(){
   if(state==='open'||state==='opening')return;
   clear();savedFocus=document.activeElement;
   state='opening';updateCurrent();
   nav.classList.remove('rev169-closing','rev169-show-words','rev170-route-hold','has-hover');
   ordered.forEach(a=>a.classList.remove('is-hovered'));
   // Force the initial clipped state before the scroll-like reveal.
   nav.classList.remove('open');void nav.offsetWidth;
   nav.classList.add('open');
   document.body.classList.add('menu-open');
   toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Chiudi menu');
   toggle.firstChild && toggle.firstChild.nodeType===3 && (toggle.firstChild.textContent='');
   nav.setAttribute('aria-hidden','false');
   opening=setTimeout(()=>{
     if(state!=='opening')return;
     nav.classList.add('rev169-show-words');
     state='open';opening=0;
     // Focus after the overlay has arrived, never on invisible words.
     toggle.focus({preventScroll:true});
   },reduced.matches?0:410);
 }
 function close(href=null){
   if(state==='closed'||state==='closing')return;
   clear();
   state='closing';nav.classList.remove('rev169-show-words');
   toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Apri menu');
   const retract=()=>{
     if(state!=='closing')return;
     nav.classList.remove('rev170-route-hold');
     nav.classList.add('rev169-closing');
     ending=setTimeout(()=>{
       if(state!=='closing')return;
       state='closed';nav.classList.remove('open','rev169-closing','rev170-route-hold','has-hover');
       document.body.classList.remove('menu-open');nav.setAttribute('aria-hidden','true');
       if(toggle.firstChild?.nodeType===3)toggle.firstChild.textContent='MENU ';
       ordered.forEach(a=>a.classList.remove('is-hovered'));
       restoreFocus();
     },reduced.matches?0:680);
   };
   if(href&&location.hash!==href){
     // Switch the route while the curtain still fully covers the old image.
     // The router intentionally keeps .open while body.menu-open is present.
     nav.classList.add('rev170-route-hold');
     location.hash=href;
     routeHold=setTimeout(retract,reduced.matches?0:160);
   }else retract();
 }
 nav.setAttribute('aria-hidden','true');
 toggle.onclick=()=>{if(state==='closed'||state==='closing')open();else close()};
 ordered.forEach(a=>{
   a.addEventListener('pointerenter',()=>{if(state!=='open')return;nav.classList.add('has-hover');a.classList.add('is-hovered')});
   a.addEventListener('pointerleave',()=>{a.classList.remove('is-hovered');nav.classList.remove('has-hover')});
   a.addEventListener('click',e=>{
     if(state!=='open')return;
     if(e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;
     e.preventDefault();e.stopPropagation();close(a.getAttribute('href'));
   });
 });
 nav.addEventListener('click',e=>{if(e.target===nav && (state==='open'||state==='opening'))close()});
 document.addEventListener('keydown',e=>{
   if(state==='closed')return;
   if(e.key==='Escape'){e.preventDefault();close();return}
   if(e.key!=='Tab')return;
   const focusable=[toggle,...ordered,...lang.querySelectorAll('button'),...socials.querySelectorAll('a')];
   const idx=focusable.indexOf(document.activeElement);
   if(e.shiftKey&&idx<=0){e.preventDefault();focusable.at(-1).focus()}
   else if(!e.shiftKey&&idx===focusable.length-1){e.preventDefault();toggle.focus()}
 });
 window.addEventListener('hashchange',()=>{updateCurrent();if(state==='open'||state==='opening')close()});
 document.getElementById('site-series-switch')?.addEventListener('click',()=>document.querySelector('.art-gallery-label')?.click());
})();
