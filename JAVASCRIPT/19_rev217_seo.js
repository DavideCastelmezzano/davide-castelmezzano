/* REV217 – crawlable URLs and per-page SEO. Does not alter gallery or image behavior. */
(()=>{
'use strict';
const BASE='https://www.davidecastelmezzano.com';
const PAGES={"home":{"title_it":"Davide Castelmezzano | Pittura contemporanea a Roma","title_en":"Davide Castelmezzano | Contemporary Painting in Rome","description_it":"Davide Castelmezzano (Matera, 1992) è un pittore contemporaneo che vive e lavora a Roma. Scopri la serie Neo Genesi, le opere, la ricerca pittorica e il curriculum.","description_en":"Davide Castelmezzano (born in Matera in 1992) is a contemporary painter based in Rome. Discover Neo Genesi, paintings, artistic research and biography.","og_image":"MEDIA/home_hero_1.webp"},"neogenesi":{"title_it":"Neo Genesi (2026) | Dipinti di Davide Castelmezzano","title_en":"Neo Genesi (2026) | Paintings by Davide Castelmezzano","description_it":"Neo Genesi, serie pittorica del 2026 di Davide Castelmezzano. Opere in cui gestualità pittorica e relazioni inattese tra forme e immagini generano nuove configurazioni figurative.","description_en":"Neo Genesi, a 2026 painting series by Davide Castelmezzano. Gestural painting and unexpected relationships between images and forms lead to new figurative configurations.","og_image":"MEDIA/preview/opera_daimon.jpg"},"altrilavori":{"title_it":"Fantasia (2018–2024) | Opere di Davide Castelmezzano","title_en":"Fantasia (2018–2024) | Paintings by Davide Castelmezzano","description_it":"Fantasia: raccolta di opere pittoriche realizzate da Davide Castelmezzano tra il 2018 e il 2024. Esplora i dipinti e le informazioni sulle opere.","description_en":"Fantasia: paintings by Davide Castelmezzano created between 2018 and 2024. Explore the artworks and their details.","og_image":"MEDIA/preview/opera_domatrice.jpg"},"percorso":{"title_it":"Enigmi semiotici (2019–2021) | Davide Castelmezzano","title_en":"Enigmi semiotici (2019–2021) | Davide Castelmezzano","description_it":"Enigmi semiotici: opere pittoriche di Davide Castelmezzano del periodo 2019–2021. Identità antropomorfe, Mistero della seduzione, Estensioni interiori.","description_en":"Enigmi semiotici: paintings by Davide Castelmezzano from 2019–2021, including Identità antropomorfe, Mistero della seduzione and Estensioni interiori.","og_image":"MEDIA/preview/opera_identita.jpg"},"ricerca":{"title_it":"Ricerca pittorica e Neo Genesi | Davide Castelmezzano","title_en":"Artistic Research and Neo Genesi | Davide Castelmezzano","description_it":"La ricerca pittorica di Davide Castelmezzano indaga relazioni inattese fra immagini, forme e linguaggi visivi, tra gestualità, sperimentazione e intuizione.","description_en":"Davide Castelmezzano explores unexpected relationships between images, shapes and visual languages through gesture, experimentation and intuition.","og_image":"MEDIA/ricerca_poster.webp"},"bio":{"title_it":"Biografia e curriculum | Davide Castelmezzano pittore","title_en":"Biography and CV | Painter Davide Castelmezzano","description_it":"Biografia e curriculum di Davide Castelmezzano, pittore nato a Matera nel 1992, attivo a Roma. Formazione, mostre, residenze, riconoscimenti e pubblicazioni.","description_en":"Biography and CV of Davide Castelmezzano, a painter born in Matera in 1992 and based in Rome. Education, exhibitions, residencies and awards.","og_image":"MEDIA/biografia_ritratto.jpg"},"contatti":{"title_it":"Contatti e collaborazioni | Davide Castelmezzano","title_en":"Contact and Collaborations | Davide Castelmezzano","description_it":"Contatta Davide Castelmezzano per proposte espositive, collaborazioni e richieste relative alle opere e alla sua ricerca pittorica.","description_en":"Contact contemporary painter Davide Castelmezzano about exhibitions, collaborations, artworks and artistic research.","og_image":"MEDIA/contatti.webp"},"privacy":{"title_it":"Privacy Policy | Davide Castelmezzano","description_it":"Informativa sulla privacy del portfolio di Davide Castelmezzano: trattamento dei dati, hosting GitHub Pages, font web, diritti degli interessati.","og_image":"MEDIA/home_hero_1.webp"},"cookies":{"title_it":"Cookie Policy | Davide Castelmezzano","description_it":"Informazioni su cookie, preferenza lingua e localStorage nel portfolio di Davide Castelmezzano.","og_image":"MEDIA/home_hero_1.webp"},"note-legali":{"title_it":"Note legali e crediti | Davide Castelmezzano","description_it":"Note legali, copyright delle opere pittoriche e crediti del portfolio artistico di Davide Castelmezzano.","og_image":"MEDIA/home_hero_1.webp"},"privacy-en":{"title_en":"Privacy Policy | Davide Castelmezzano","description_en":"Privacy notice for the website of painter Davide Castelmezzano, including data processing, hosting, web fonts and visitors’ rights.","og_image":"MEDIA/home_hero_1.webp"},"cookies-en":{"title_en":"Cookie Policy | Davide Castelmezzano","description_en":"Cookie notice for the Davide Castelmezzano portfolio: language preference, localStorage and third-party services.","og_image":"MEDIA/home_hero_1.webp"},"note-legali-en":{"title_en":"Legal Notices and Credits | Davide Castelmezzano","description_en":"Legal notices, artwork copyright and website credits for the official portfolio of painter Davide Castelmezzano.","og_image":"MEDIA/home_hero_1.webp"}};
const valid=new Set(Object.keys(PAGES));
const legal=new Set(['privacy','cookies','note-legali']);
const escape=(s)=>String(s||'').trim();
function pageRoute(){
 const h=location.hash;
 const raw=h.startsWith('#/')?h.slice(2).split('?')[0].replace(/\/$/,''):null;
 const parts=location.pathname.replace(/\/+$/,'').split('/').filter(Boolean);const path=(parts.at(-1)==='index.html'?parts.at(-2):parts.at(-1))||'home';
 return valid.has(raw)?raw:(raw===''?'home':(valid.has(path)?path:'home'));
}
function sitePrefix(){
 // On the custom domain this is '/'; also compatible with the GitHub project URL.
 const b=document.querySelector('base');
 if(b)return new URL(b.href).pathname;
 const path=location.pathname;
 const split=path.indexOf('/davide-castelmezzano/');
 return split===0?'/davide-castelmezzano/':'/';
}
const pathname=(route)=>sitePrefix()+(route==='home'?'':route+'/');
const canonical=(route)=>BASE+'/'+(route==='home'?'':route+'/');
function setMeta(selector,attribute,value){const el=document.querySelector(selector);if(el)el.setAttribute(attribute,value);}
function sync(){
 const route=pageRoute();const data=PAGES[route];if(!data)return;
 const lang=(route.endsWith('-en')?'en':(window.DavideI18n?.get?.()||'it'));
 const title=data['title_'+lang]||data.title_it||data.title_en;
 const description=data['description_'+lang]||data.description_it||data.description_en;
 if(title)document.title=title;
 setMeta('meta[name="description"]','content',description);
 setMeta('link[rel="canonical"]','href',canonical(route));
 setMeta('meta[property="og:title"]','content',title);
 setMeta('meta[property="og:description"]','content',description);
 setMeta('meta[property="og:url"]','content',canonical(route));
 setMeta('meta[property="og:image"]','content',BASE+'/'+data.og_image);
 setMeta('meta[property="og:locale"]','content',lang==='en'?'en_GB':'it_IT');
 setMeta('meta[name="twitter:title"]','content',title);
 setMeta('meta[name="twitter:description"]','content',description);
 setMeta('meta[name="twitter:image"]','content',BASE+'/'+data.og_image);
 // Keep the embedded page metadata aligned when the SPA switches views without a reload.
 const el=document.querySelector('script[type="application/ld+json"]');
 if(el){try{
    const json=JSON.parse(el.textContent);const page=(json['@graph']||[]).find(x=>x['@type']==='WebPage');
    if(page){page['@id']=canonical(route)+'#webpage';page.url=canonical(route);page.name=title;page.description=description;page.inLanguage=lang;el.textContent=JSON.stringify(json).replaceAll('</','<\/');}
 }catch(e){/* JSON-LD should never affect navigation. */}}
 // Alternate language URLs exist as distinct crawlable pages only for the legal notices.
 document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(a=>a.remove());
 const stem=route.replace(/-en$/,'');
 if(legal.has(stem)){
   for(const [locale,r] of [['it',stem],['en',stem+'-en']]){
     const a=document.createElement('link');a.rel='alternate';a.hreflang=locale;a.href=canonical(r);document.head.append(a);
   }
 }
}
window.__seo217Sync=sync;
// Convert legacy #/ routes to clean, indexable paths after all existing hashchange handlers run.
window.addEventListener('hashchange',()=>{
 const route=pageRoute();if(!valid.has(route))return;
 const path=pathname(route);
 if(!['file:','about:'].includes(location.protocol) && (location.pathname!==path || location.hash))history.replaceState(history.state,'',path+location.search);
 sync();
});
// Browser back/forward between clean URLs fires popstate, not necessarily hashchange.
window.addEventListener('popstate',()=>{
 if(location.hash.startsWith('#/'))return;
 if(typeof render==='function'){render();window.DavideI18n?.refresh?.();}
 sync();
});
// Native <a href> links are crawlable. Intercept only the on-site route links to keep SPA navigation.
document.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const a=event.target.closest?.('a[href]');if(!a||a.download||a.target==='_blank')return;
 const raw=a.getAttribute('href');if(!raw)return;
 let route=null;
 if(raw.startsWith('#/')){
   route=raw.slice(2).replace(/\/$/,'').split('?')[0]||'home';
 }else if(raw.startsWith('/') && !raw.startsWith('//')){
   const r=raw.replace(/\/+$/,'').split('/').pop()||'home';
   if(valid.has(r))route=r;
 }
 if(!valid.has(route))return;
 // Keep legacy event-driven menu/hero animations untouched.
 if(a.closest('#site-nav'))return;
 if(a.closest('.art-home'))return;
 if(raw.startsWith('#/') && location.pathname===sitePrefix() && location.protocol!=='file:')return;
 // Respect the existing IT/ENG selector behavior when linking to legal pages.
 if(legal.has(route) && window.DavideI18n?.get?.()==='en')route+='-en';
 const oldHash=location.hash;
 if(route===pageRoute() && !location.hash){event.preventDefault();return;}
 event.preventDefault();
 queueMicrotask(()=>{
   if(location.hash!==oldHash)return; // Another existing handler has already navigated.
   location.hash='#/'+(route==='home'?'':route);
 });
},true);
// Allow the existing language switcher to update SEO text without changing the design.
document.addEventListener('click',event=>{if(event.target.closest?.('[data-lang]'))queueMicrotask(sync);},true);
sync();
})();
