
document.addEventListener('click', function(e){
 const b=e.target.closest('.art-neo-menu'); if(b){const n=document.querySelector('.art-neo-nav');if(n){n.hidden=!n.hidden;b.setAttribute('aria-expanded',String(!n.hidden))}return;}
 const t=e.target.closest('button.art-gallery-label'); if(t){const g=document.querySelector('.art-gallery');if(g){const open=g.classList.toggle('art-series-open');t.setAttribute('aria-expanded',String(open))}return;}
});

(function(){
 function markArtScene(){
  const body=document.body,about=document.querySelector('.art-about'),neo=document.querySelector('.art-neo');
  const mid=innerHeight*.48;
  const active=el=>{if(!el)return false;const r=el.getBoundingClientRect();return r.top<=mid&&r.bottom>mid};
  body.classList.toggle('art-scene-about',body.classList.contains('on-home')&&active(about));
  body.classList.toggle('art-scene-neo',body.classList.contains('on-home')&&active(neo));
 }
 window.addEventListener('scroll',markArtScene,{passive:true});
 window.addEventListener('resize',markArtScene,{passive:true});
 window.addEventListener('hashchange',()=>requestAnimationFrame(markArtScene));
 const app=document.getElementById('app');if(app)new MutationObserver(markArtScene).observe(app,{childList:true});
 markArtScene();
})();
