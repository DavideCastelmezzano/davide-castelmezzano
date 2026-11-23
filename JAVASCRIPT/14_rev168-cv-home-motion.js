
(()=>{
  'use strict';
  const app=document.getElementById('app');
  if(!app)return;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n)};
  let cvPanel=null,cvLines=[],cvStages=[],cvFrame=0,cvClock=0;
  let cvSize='',home=null,homePhrases=[],homeFrame=0;
  let pendingLeave=0,arriveTimeout=0,homeWasVisible=false;

  const cvEase=v=>{v=clamp(v);return 1-Math.pow(1-v,3)};
  function requestCV(){if(!cvFrame)cvFrame=requestAnimationFrame(paintCV)}

  function adjustCVViewport(){
    const panel=cvPanel;
    if(!panel?.classList.contains('is-active')||panel.hidden)return;
    const size=innerWidth+'x'+innerHeight;
    if(size===cvSize)return;
    cvSize=size;
    const recognition=[...panel.querySelectorAll('.bio25-cv-group')]
      .find(el=>el.querySelector('h3')?.textContent.trim().toLowerCase()==='riconoscimenti');
    if(!recognition)return;
    // The initial viewport ends just after Riconoscimenti; Pubblicazioni and
    // Formazione are below the fold, fully accessible with the native scroll.
    const pane=panel.getBoundingClientRect(),end=recognition.getBoundingClientRect();
    const contentHeight=end.bottom-pane.top+panel.scrollTop+15;
    const maxRoom=Math.max(190,innerHeight-pane.top-24);
    const limit=Math.max(190,Math.min(maxRoom,contentHeight));
    panel.style.setProperty('--rev171-cv-limit',Math.round(limit)+'px');
  }

  function paintCV(now){
    cvFrame=0;
    const panel=cvPanel;
    if(!panel?.isConnected||panel.hidden||!panel.classList.contains('is-active'))return;
    adjustCVViewport();
    const bounds=panel.getBoundingClientRect();
    if(bounds.height<70)return;
    const top=bounds.top+5,bottom=bounds.bottom-5;
    const atStart=panel.scrollTop<10;
    const atEnd=panel.scrollHeight-panel.clientHeight-panel.scrollTop<9;
    const nested=panel.scrollHeight>panel.clientHeight+3;
    const topExtent=Math.min(100,Math.max(58,bounds.height*.17));
    const bottomExtent=Math.min(110,Math.max(70,bounds.height*.16));
    const noMotion=reduced.matches;
    // One clock in DOM reading order: title, headings, years and lines.
    // The two halves of one CV row enter together, never out of order.
    for(const stage of cvStages){
      if(stage.begin!==null)continue;
      const rect=stage.nodes[0].getBoundingClientRect();
      if(rect.bottom<top+8||rect.top>bottom-10)continue;
      cvClock=Math.max(now,cvClock);
      stage.begin=cvClock;
      cvClock+=stage.kind==='title'?190:stage.kind==='heading'?140:67;
    }
    let active=false;
    for(const stage of cvStages){
      const t=stage.begin===null?0:cvEase((now-stage.begin)/(stage.kind==='title'?910:stage.kind==='heading'?700:590));
      if(stage.begin!==null && t<.999)active=true;
      for(const el of stage.nodes){
        const b=el.getBoundingClientRect();
        let enter=nested?smooth((bottom-b.top)/bottomExtent):1;
        let leave=nested?(atStart?1:smooth((b.bottom-top)/topExtent)):1;
        // At the opening Riconoscimenti remains completely legible. Later
        // it responds to the same reversible Gaussian transition as all rows.
        if(atStart && stage.kind==='title'){enter=1;leave=1}
        if(atStart && stage.group<=2){enter=1;leave=1}
        if(atEnd && stage.group===4){enter=1;leave=1}
        let gauss=noMotion?1:Math.min(enter,leave);
        let reveal=noMotion?1:t;
        const value=gauss*reveal;
        const edgeBlur=(1-gauss)*12.8;
        const arrivalBlur=(1-reveal)*(stage.kind==='title'?16:stage.kind==='heading'?9:3.4);
        const blur=Math.max(edgeBlur,arrivalBlur);
        const x=(stage.kind==='title'?0:stage.kind==='heading'?-15:-29)*(1-reveal);
        const y=(stage.kind==='title'?16:0)*(1-reveal);
        el.style.setProperty('opacity',(0.035+.965*value).toFixed(3),'important');
        el.style.setProperty('filter',blur>.08?`blur(${blur.toFixed(2)}px)`:'none','important');
        el.style.setProperty('transform',noMotion||reveal>.999?'translateZ(0)':`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`,'important');
      }
    }
    if(active)requestCV();
  }
  function clearCV(){
    if(cvFrame){cancelAnimationFrame(cvFrame);cvFrame=0}
    if(cvPanel)cvPanel.removeEventListener('scroll',requestCV);
    for(const el of cvLines){
      el.classList.remove('rev168-cv-line','rev171-cv-animated');
      el.style.removeProperty('opacity');
      el.style.removeProperty('filter');
      el.style.removeProperty('transform');
    }
    if(cvPanel)cvPanel.style.removeProperty('--rev171-cv-limit');
    cvPanel=null;cvLines=[];cvStages=[];cvClock=0;cvSize='';
  }
  function setupCV(){
    const panel=app.querySelector('.bio25-panel[data-bio-panel="cv"]');
    if(panel===cvPanel)return;
    clearCV();
    if(!panel)return;
    cvPanel=panel;
    const add=(nodes,kind,group)=>{
      nodes=nodes.filter(Boolean);
      if(!nodes.length)return;
      cvStages.push({nodes,kind,group,begin:null});cvLines.push(...nodes);
    };
    add([panel.querySelector('.bio25-title')],'title',-1);
    [...panel.querySelectorAll('.bio25-cv-group')].forEach((group,i)=>{
      add([group.querySelector('h3')],'heading',i);
      group.querySelectorAll('.bio25-cv-row').forEach(row=>
        add([row.querySelector('span'),row.querySelector('p')],'copy',i));
    });
    cvLines.forEach(el=>el.classList.add('rev168-cv-line','rev171-cv-animated'));
    panel.addEventListener('scroll',requestCV,{passive:true});
    requestCV();
  }

  // Two phrases inside each pre-existing home paragraph reveal at slightly
  // different moments. The paragraph itself keeps REV163's morphing, native
  // geometry and scroll-dependent reversal.
  function decorateHomeParagraph(p){
    if(!p||p.dataset.rev168Phrases)return [];
    const original=p.textContent||'';
    const parts=original.split(/(?<=[.!?])\s+(?=[A-ZÀÈÉÌÒÙ])/u);
    if(parts.length<2)return [];
    p.dataset.rev168Phrases='true';
    const fragments=[];
    p.replaceChildren();
    parts.forEach((text,i)=>{
      if(i)p.appendChild(document.createTextNode(' '));
      const span=document.createElement('span');
      span.className='rev168-home-phrase';
      span.textContent=text;
      p.append(span);
      fragments.push({span,index:i});
    });
    return [{paragraph:p,fragments}];
  }
  function requestHome(){if(!homeFrame)homeFrame=requestAnimationFrame(paintHome)}
  function paintHome(){
    homeFrame=0;
    if(!home?.isConnected)return;
    if(reduced.matches){
      homePhrases.forEach(group=>group.fragments.forEach(({span})=>span.style.removeProperty('opacity')));
      return;
    }
    for(const group of homePhrases){
      const raw=parseFloat(group.paragraph.style.getPropertyValue('opacity'));
      const p=Number.isFinite(raw)?clamp(raw):1;
      group.fragments.forEach(({span,index})=>{
        // Fine, short secondary stagger on the two sentences, so even the
        // smaller homepage texts take part in the same apparition.
        const a=smooth((p-(index===0?.07:.29))/(index===0?.64:.61));
        span.style.setProperty('opacity',a.toFixed(3));
      });
    }
    // REV162 can continue settling during a pause after the last scroll.
    if(homePhrases.some(group=>{
      const p=parseFloat(group.paragraph.style.getPropertyValue('opacity'));
      return Number.isFinite(p)&&p>.01&&p<.999;
    }))requestHome();
  }
  function clearHome(){
    if(homeFrame){cancelAnimationFrame(homeFrame);homeFrame=0}
    if(arriveTimeout){clearTimeout(arriveTimeout);arriveTimeout=0}
    if(pendingLeave){clearTimeout(pendingLeave);pendingLeave=0}
    homePhrases=[];home=null;
  }
  function setupHome(){
    const page=app.querySelector(':scope > article.home139');
    if(page===home)return;
    clearHome();home=page;
    if(!page){homeWasVisible=false;return}
    homePhrases.push(...decorateHomeParagraph(page.querySelector('.home139-about-copy > p')));
    homePhrases.push(...decorateHomeParagraph(page.querySelector('.home139-neo-info > p')));
    // First-visit intro already exists in REV167. Don't duplicate it.
    const firstIntro=document.getElementById('home139-entry');
    if(firstIntro?.hidden && !reduced.matches){
      page.classList.add('rev168-home-arriving');
      arriveTimeout=setTimeout(()=>{page.classList.remove('rev168-home-arriving');arriveTimeout=0},760);
    }
    homeWasVisible=true;
    requestHome();
  }
  function bind(){setupCV();setupHome()}
  new MutationObserver(bind).observe(app,{childList:true});
  document.addEventListener('rev160:frame',requestHome);
  addEventListener('scroll',requestHome,{passive:true});
  addEventListener('resize',()=>{cvSize='';requestCV();requestHome()},{passive:true});
  reduced.addEventListener?.('change',()=>{requestCV();requestHome()});
  // The CV panel is a nested scroller; the click listener is installed in
  // capture phase so the original tab handler can switch panels normally.
  document.addEventListener('click',e=>{
    if(e.target.closest?.('[data-bio-tab]')){
      requestAnimationFrame(()=>requestAnimationFrame(requestCV));
    }
  },true);
  // HOME only: a restrained tonal sign-off, not a site-wide page transition.
  document.addEventListener('click',e=>{
    const link=e.target.closest?.('a[href^="#/"]');
    if(link?.closest('#site-nav'))return;
    if(!link||!document.body.classList.contains('on-home')||!home?.isConnected)return;
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||reduced.matches)return;
    const href=link.getAttribute('href');
    if(!href||href==='#/'||href==='#/home')return;
    if(pendingLeave)return;
    e.preventDefault();
    home.classList.remove('rev168-home-arriving');
    home.classList.add('rev168-home-departing');
    pendingLeave=setTimeout(()=>{
      pendingLeave=0;
      if(location.hash!==href)location.hash=href;
      else home.classList.remove('rev168-home-departing');
    },265);
  },true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();
