
(function(){
  const switcher=document.getElementById('site-series-switch');
  if(!switcher)return;
  switcher.addEventListener('click',function(){
    const frame=document.getElementById('rev36-frame');
    if(!frame)return;
    try{
      const inner=frame.contentDocument;
      const button=inner && inner.getElementById('collectionButton');
      if(button){button.click();return;}
    }catch(e){console.warn('Impossibile aprire il selettore delle serie',e);}
  });
})();
