
window.addEventListener('message',async function(event){
 const frame=document.getElementById('rev36-frame');
 if(!frame || event.source!==frame.contentWindow || !event.data)return;
 if(event.data.type==='davide-gallery-immersive'){
   document.body.classList.toggle('rev57-full-gallery',event.data.open===true);
   return;
 }
 if(event.data.type!=='davide-gallery-close-request')return;
 const doc=frame.contentDocument;
 const immersive=doc?.querySelector('#rev60-immersive .rev60-image');
 const painting=doc?.getElementById('painting');
 const overlay=document.createElement('img');
 overlay.alt='';overlay.src=event.data.src||immersive?.src||'';
 const f=frame.getBoundingClientRect();
 const r=immersive?.getBoundingClientRect();
 const initial=r?{left:f.left+r.left,top:f.top+r.top,width:r.width,height:r.height}:null;
 if(!initial||!painting){
   document.body.classList.remove('rev57-full-gallery');
   frame.contentWindow.postMessage({type:'davide-gallery-close-complete'},'*');return;
 }
 Object.assign(overlay.style,{position:'fixed',left:initial.left+'px',top:initial.top+'px',width:initial.width+'px',height:initial.height+'px',objectFit:'fill',maxWidth:'none',maxHeight:'none',transform:'none',zIndex:'2147483646',pointerEvents:'none',willChange:'left,top,width,height'});
 document.body.append(overlay);
 // Freeze the original painting during the geometry handoff.
 painting.style.visibility='hidden';
 // Always return to the full-work (-) level before measuring the destination.
 const minus=doc.querySelector('[data-level="0"]');
 minus?.click();
 const stage=doc.getElementById('wall-image-space');
 if(stage)stage.dataset.level='0';
 document.body.classList.remove('rev57-full-gallery');
 await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 const fr=frame.getBoundingClientRect();const pr=painting.getBoundingClientRect();
 const target={left:fr.left+pr.left,top:fr.top+pr.top,width:pr.width,height:pr.height};
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 try{
   const animation=overlay.animate([initial,target].map(q=>({left:q.left+'px',top:q.top+'px',width:q.width+'px',height:q.height+'px'})),{duration:reduce?1:1250,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
   await animation.finished;
 }catch(e){}
 painting.style.visibility='';
 await new Promise(resolve=>requestAnimationFrame(resolve));
 overlay.remove();
 frame.contentWindow.postMessage({type:'davide-gallery-close-complete'},'*');
});
