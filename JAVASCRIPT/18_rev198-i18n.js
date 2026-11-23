/* REV198 — Two-language content controller (Italian / English).
 * Italian original preserved; art titles/proper names are left in their original form.
 * Works with route rendering, hover-generated thumbnails, modal captions and form notices.
 */
(function(){
  'use strict';
  const translations={"Opere":"Works","OPERE":"WORKS","Ricerca":"Research","RICERCA":"RESEARCH","Contatti":"Contact","CONTATTI":"CONTACT","Bio / CV":"Bio / CV","BIOGRAFIA":"BIOGRAPHY","CURRICULUM":"CV","CURRICULUM VITAE":"CURRICULUM VITAE","Serie pittoriche":"Painting series","Scegli un altro percorso pittorico":"Choose another artistic series","Menu":"Menu","MENU":"MENU","Apri menu":"Open menu","Chiudi menu":"Close menu","Navigazione principale":"Main navigation","Torna alla homepage":"Back to the homepage","Lingua del sito: italiano":"Website language: Italian","Contatti diretti":"Direct contact links","PITTURA CONTEMPORANEA":"CONTEMPORARY PAINTING","TUTTI I DIRITTI RISERVATI":"ALL RIGHTS RESERVED","Le immagini delle opere sono protette dal diritto d’autore.":"Images of the artworks are protected by copyright.","Le immagini delle opere sono protette dal diritto d'autore.":"Images of the artworks are protected by copyright.","Note legali e crediti":"Legal notices and credits","Informazioni legali":"Legal information","Informazioni, collegamenti legali e crediti":"Information, legal links and credits","Davide Castelmezzano, pittore":"Davide Castelmezzano, painter","Instagram di Davide Castelmezzano":"Davide Castelmezzano on Instagram","IMMAGINI IN":"IMAGES IN","DIVENIRE":"BECOMING","CHI SONO ?":"ABOUT ME","Serie":"Series","SERIE":"SERIES","SERIE PITTORICA 2026":"PAINTING SERIES 2026","SCOPRI":"DISCOVER","NEO GENESI":"NEO GENESI","ENIGMI SEMIOTICI":"ENIGMI SEMIOTICI","FANTASIA":"FANTASIA","PER INFO SULL'OPERA":"ENQUIRE ABOUT THIS WORK","ESPLORA L'OPERA":"EXPLORE THE WORK","TORNA INDIETRO":"GO BACK","INTERO":"FULL WORK","Visualizza entrambi i pannelli":"View both panels","Visualizza il pannello 1":"View panel 1","Mostra o nascondi il pannello 2":"Show or hide panel 2","Visualizzazione del dittico":"Diptych view","Esplora l'opera a schermo intero":"Explore the artwork in full screen","Esplorazione dell'opera":"Artwork exploration","Trascina per esplorare la pittura":"Drag to explore the painting","Opere di Davide Castelmezzano":"Works by Davide Castelmezzano","Spazio espositivo":"Exhibition space","Opera principale; scorri per sfogliare":"Main artwork; scroll to browse","Galleria opere — Revisione 36":"Works gallery — Revision 36","Galleria delle opere di Davide Castelmezzano":"Gallery of works by Davide Castelmezzano","Opera ingrandita":"Enlarged artwork","Opera in primo piano":"Artwork viewer","Opera":"Artwork","Chiudi ingrandimento":"Close enlargement","Chiudi la visualizzazione":"Close viewer","CHIUDI":"CLOSE","Opera precedente":"Previous artwork","Opera successiva":"Next artwork","ALTRE OPERE":"OTHER WORKS","Seleziona un'altra opera":"Select another artwork","Indice delle opere":"Artwork index","Chiudi indice":"Close index","Leggi tutto":"Read more","Riduci testo":"Show less","Daimon (Smek)":"Daimon (Smek)","Dettaglio di":"Detail of","Biografia e curriculum di Davide Castelmezzano":"Biography and CV of Davide Castelmezzano","L'artista, biografia e curriculum":"The artist, biography and CV","Davide Castelmezzano al lavoro nel suo studio a Roma":"Davide Castelmezzano working in his Rome studio","Percorso dell'artista":"The artist’s journey","Curriculum completo, scorri per leggere":"Full CV, scroll to read","Ricerca artistica":"Artistic research","Davide Castelmezzano, pittura":"Davide Castelmezzano, painting","Dettagli pittorici di Smek e Illudes":"Painting details from Smek and Illudes","Davide Castelmezzano nel suo studio di pittura":"Davide Castelmezzano in his painting studio","Dettaglio originale di Illudes":"Original detail from Illudes","Illudes — nuovo dettaglio":"Illudes — new detail","RESTIAMO":"LET’S STAY","in contatto.":"in touch.","Scrivimi":"Write to me","Campi obbligatori *":"Required fields *","Compila il modulo per inviarmi un messaggio.":"Fill out the form to send me a message.","NOME E COGNOME *":"FULL NAME *","INDIRIZZO EMAIL *":"EMAIL ADDRESS *","IL TUO MESSAGGIO *":"YOUR MESSAGE *","INVIA IL MESSAGGIO":"SEND MESSAGE","Come ti chiami":"Your name","Come ti chiami?":"Your name","nome@esempio.com":"name@example.com","Raccontami brevemente la tua proposta o richiesta...":"Briefly describe your proposal or enquiry...","Messaggio dal sito":"Message from the website","Lascia vuoto":"Leave empty","Modulo di contatto":"Contact form","Collegamenti diretti":"Direct contact links","Scrivi un'email":"Send an email","Si aprirà il programma di posta per completare l’invio.":"Your email application will open to complete the message.","Invio in corso…":"Sending…","Messaggio inviato correttamente.":"Message sent successfully.","Impossibile inviare il messaggio. Riprova più tardi.":"Unable to send the message. Please try again later.","Riprendi lo scorrimento delle immagini":"Resume image slideshow","Metti in pausa lo scorrimento delle immagini":"Pause image slideshow","Riprendi il video":"Resume video","Metti in pausa il video":"Pause video","Dalla convivenza di linguaggi visivi differenti emerge un nuovo equilibrio pittorico.":"A new painterly balance emerges from the coexistence of different visual languages.","Tre dipinti della prima ricerca figurativa, tra associazioni fantastiche, figure e metamorfosi.":"Three paintings from an early figurative investigation, exploring unexpected associations, figures and metamorphoses.","Opere precedenti che documentano l’evoluzione della ricerca pittorica. Per alcuni titoli o date, i dati rimangono da confermare.":"Earlier works documenting the development of the artist’s painting practice. Some titles and dates have yet to be confirmed.","Figurazione fantastica":"Fantastic Figuration","Altre opere":"Earlier Works","SERIE / 2026":"SERIES / 2026","PERCORSO PRECEDENTE":"EARLIER WORK","Data da confermare":"Date to be confirmed","Opera dall’archivio · titolo da confermare":"Work from the archive · title to be confirmed","Olio su tela":"Oil on canvas","Olio su tavola":"Oil on panel","Olio su plexiglass":"Oil on Plexiglas","Olio su tavola · Dittico":"Oil on panel · Diptych","Olio su tela · Dittico":"Oil on canvas · Diptych","40 × 50 cm ciascun pannello · 40 × 100 cm complessivi":"40 × 50 cm each panel · 40 × 100 cm overall","55 × 60 cm ciascun pannello · 55 × 120 cm complessivi":"55 × 60 cm each panel · 55 × 120 cm overall","dettaglio, 2026":"detail, 2026","Mostre":"Exhibitions","Residenze":"Residencies","Riconoscimenti":"Awards & Distinctions","Pubblicazioni":"Publications","Formazione":"Education","INFORMAZIONI LEGALI / DAVIDE CASTELMEZZANO":"LEGAL INFORMATION / DAVIDE CASTELMEZZANO","Lingua dei documenti / Document language":"Document language","CLICCA PER ENTRARE":"CLICK TO ENTER","CLICCA PER ENTRARE.":"CLICK TO ENTER.","ENTRA":"ENTER","Entra":"Enter","Premi Entra per accedere al sito.":"Press Enter to access the site.","Davide Castelmezzano. Attraverso il nome si vede la pittura. Premi Entra per accedere al sito.":"Davide Castelmezzano. The painting is visible through the name. Press Enter to access the site.","Attraverso il nome si vede la pittura.":"The painting is visible through the name.","Premi per entrare":"Press to enter","I dati inseriti saranno utilizzati soltanto per rispondere alla richiesta.":"The information you provide will only be used to respond to your enquiry.","Per proposte espositive, collaborazioni o richieste relative alla mia ricerca pittorica, puoi scrivermi qui.":"For exhibition proposals, collaborations or enquiries about my painting practice, you can contact me here.","Davide Castelmezzano (Matera, 1992) vive e lavora a Roma. La sua ricerca pittorica esplora le possibilità di trasfigurazione fantastica dell’immagine attraverso il dialogo tra gestualità pittorica e pareidolia.":"Davide Castelmezzano (Matera, 1992) lives and works in Rome. His painting practice explores the possibilities of the image’s fantastic transfiguration through a dialogue between painterly gesture and pareidolia.","Neo Genesi esplora le possibilità che emergono dall’incontro tra forme e immagini apparentemente incompatibili. Attraverso la gestualità pittorica, elementi differenti entrano in relazione, generando configurazioni inattese e nuove possibilità figurative.":"Neo Genesi explores the possibilities that emerge when seemingly incompatible forms and images meet. Through painterly gesture, disparate elements enter into dialogue, generating unexpected configurations and new figurative possibilities.","La ricerca pittorica nasce dall’interesse per ciò che può emergere dall’incontro tra immagini, forme e linguaggi visivi differenti. Al centro del lavoro vi è la possibilità che elementi apparentemente distanti, entrando in relazione, possano trasformarsi reciprocamente e dare origine a configurazioni inattese.":"My painting practice is rooted in an interest in what may emerge when images, forms and different visual languages encounter one another. At its core is the possibility that seemingly distant elements, brought into relation, can transform each other and give rise to unexpected configurations.","Il processo creativo si sviluppa attraverso un confronto continuo tra intenzione, intuizione e sperimentazione. Associazioni, contrasti e coincidenze visive diventano occasioni per esplorare nuove relazioni, lasciando che quanto emerge durante il lavoro possa suggerire direzioni impreviste e modificare le scelte iniziali.":"The creative process unfolds through an ongoing dialogue between intention, intuition and experimentation. Associations, contrasts and visual coincidences become opportunities to explore new relationships, allowing what emerges during the work to suggest unforeseen directions and reshape the initial decisions.","Neo Genesi nasce dall’esigenza di superare la costruzione narrativa che aveva caratterizzato parte della produzione precedente e di esplorare altre possibilità di formazione dell’immagine.":"Neo Genesi arose from a desire to move beyond the narrative construction that had characterised part of my earlier work and to explore other possibilities for the formation of an image.","Il progetto prende avvio dalla selezione e dall’assemblaggio digitale di frammenti della tradizione pittorica occidentale. Sottratti ai loro contesti originari, questi elementi vengono ricombinati fino a generare configurazioni pareidoliche che, attraverso la pittura, acquistano corpo e presenza materiale.":"The project begins with the selection and digital assembly of fragments from the Western painting tradition. Removed from their original contexts, these elements are recombined into pareidolic configurations that acquire body and material presence through painting.","Con lo sviluppo della serie, queste configurazioni smettono progressivamente di rappresentare un punto d’arrivo. L’introduzione di linee sinuose e interventi gestuali, seguita dalla sperimentazione con stencil utilizzati in positivo e in negativo, apre ulteriori possibilità di relazione tra linguaggi visivi differenti.":"As the series developed, these configurations gradually ceased to be an end in themselves. The introduction of sinuous lines and gestural interventions, followed by experiments with stencils used both positively and negatively, opened up further possibilities for relationships between different visual languages.","La figurazione, il gesto, l’astrazione e la componente informale non concorrono soltanto ad accrescere la complessità dell’immagine, ma alla costruzione di un nuovo equilibrio pittorico. Pur mantenendo le proprie differenze, questi linguaggi convivono e si trasformano reciprocamente, dando origine a un’unità visiva che non coincide con la semplice somma delle sue parti.":"Figuration, gesture, abstraction and informal painting do not merely add to the complexity of the image: together, they construct a new painterly balance. While retaining their differences, these languages coexist and transform one another, giving rise to a visual unity that is more than the sum of its parts.","Da questa convivenza, anche tra linguaggi apparentemente contrastanti, emerge un’armonia inattesa che rappresenta una possibilità pittorica nuova rispetto alla produzione precedente.":"From this coexistence, including between seemingly contrasting languages, an unexpected harmony emerges, opening up a new painterly possibility in relation to my earlier work.","Davide Castelmezzano nasce a Matera nel 1992. Vive e lavora a Roma, dove si trasferisce nel 2012 per intraprendere gli studi di Pittura presso l’Accademia di Belle Arti, dopo aver conseguito il diploma al Liceo Artistico Statale Carlo Levi di Matera.":"Davide Castelmezzano was born in Matera in 1992. He lives and works in Rome, where he moved in 2012 to study Painting at the Academy of Fine Arts, after graduating from the Carlo Levi State Art High School in Matera.","Durante la formazione accademica studia con Moreno Bondi e Vincenzo Scolamiero, approfondendo le tecniche pittoriche tradizionali, con particolare attenzione alla pittura fiamminga, rinascimentale e veneta. Nel 2017 consegue il diploma accademico di primo livello in Pittura con una tesi dedicata all’immaginario visivo e onirico di Federico Fellini. Nel 2020 consegue il diploma accademico di secondo livello con 110 e lode, sviluppando una ricerca sulla deformazione antropomorfa.":"During his academic training he studied with Moreno Bondi and Vincenzo Scolamiero, deepening his knowledge of traditional painting techniques, with particular attention to Flemish, Renaissance and Venetian painting. In 2017 he earned his first-level academic diploma in Painting with a thesis on the visual and dreamlike imagery of Federico Fellini. In 2020 he completed his second-level academic diploma with highest honours, developing a study of anthropomorphic deformation.","La sua prima produzione si caratterizza per un linguaggio figurativo fantastico, nel quale figure umane, animali e oggetti vengono associati all’interno di composizioni complesse. Attraverso il disegno libero e una pittura costruita per successive stratificazioni, realizza immagini nelle quali elementi apparentemente incongruenti suggeriscono narrazioni possibili, senza rappresentare necessariamente storie definite.":"His early work is characterised by a fantastic figurative language in which human figures, animals and objects are combined into complex compositions. Through freehand drawing and painting built up in successive layers, he creates images in which apparently incongruous elements suggest possible narratives without necessarily depicting defined stories.","In questa fase approfondisce il proprio interesse per la pittura di Riccardo Tommasi Ferroni e frequenta lo studio del figlio Giovanni Tommasi Ferroni, con il quale instaura un rapporto di stima e confronto artistico, ricevendo indicazioni e consigli sui materiali e sui procedimenti pittorici.":"During this period, he further developed his interest in the painting of Riccardo Tommasi Ferroni and frequented the studio of his son, Giovanni Tommasi Ferroni. Their relationship was based on mutual respect and artistic dialogue, and included advice on materials and painting techniques.","Successivamente matura l’esigenza di superare la dimensione narrativa, orientando la propria ricerca verso nuove possibilità di costruzione dell’immagine. Questo cambiamento trova espressione in Neo Genesi (2026), progetto nel quale frammenti della tradizione figurativa, sperimentazione digitale e differenti procedimenti pittorici concorrono alla formazione di immagini caratterizzate dalla convivenza di registri visivi eterogenei.":"He subsequently felt the need to move beyond narrative, directing his research towards new ways of constructing images. This shift took shape in Neo Genesi (2026), a project in which fragments from the figurative tradition, digital experimentation and different painterly processes contribute to images characterised by the coexistence of heterogeneous visual registers.","Nel corso della sua attività partecipa a esposizioni collettive in Italia e all’estero, tra cui Multi-Narrative: Painting in Coexistence presso la China Academy of Art di Hangzhou (2021), Incipit surrealtà a Roma e Matera (2024) e Geopolitica: trasformazioni e sviluppi presso la Galleria Plus Art Pulse di Roma (2026). Nel 2026 riceve una segnalazione della giuria alla XVII edizione del Premio Combat, con pubblicazione nel catalogo ufficiale.":"Over the course of his career he has participated in group exhibitions in Italy and abroad, including Multi-Narrative: Painting in Coexistence at the China Academy of Art in Hangzhou (2021), Incipit surrealtà in Rome and Matera (2024), and Geopolitica: trasformazioni e sviluppi at Galleria Plus Art Pulse in Rome (2026). In 2026 he received a jury commendation at the 17th Premio Combat and was included in the official catalogue.","Geopolitica: trasformazioni e sviluppi, Galleria Plus Art Pulse, Roma.":"Geopolitica: trasformazioni e sviluppi, Galleria Plus Art Pulse, Rome.","Premio di pittura Giovanni Colacicchi, Galleria AAIE, Roma.":"Giovanni Colacicchi Painting Prize, Galleria AAIE, Rome.","Premio di pittura Giovanni Colacicchi, Ala Nobile del Palazzo Comunale, Sabaudia.":"Giovanni Colacicchi Painting Prize, Ala Nobile, Palazzo Comunale, Sabaudia.","Nel sogno del fantastico, Galleria Viva, Soriano nel Cimino.":"Nel sogno del fantastico, Galleria Viva, Soriano nel Cimino.","OpenArt Now 50x50, Aurora Boreale Associazione Culturale, Roma.":"OpenArt Now 50x50, Aurora Boreale Cultural Association, Rome.","A tre voci, a cura di Robertomaria Siena, Spazio Urano, Roma.":"A tre voci, curated by Robertomaria Siena, Spazio Urano, Rome.","Arte è Bellezza, Sale del Palazzo Comunale, Bolsena.":"Arte è Bellezza, exhibition rooms of the Palazzo Comunale, Bolsena.","Arte è Bellezza. La forza del puro. Omaggio ad Alberini, Palazzo Nuzzi, Orte.":"Arte è Bellezza. La forza del puro. Omaggio ad Alberini, Palazzo Nuzzi, Orte.","Arte è Bellezza. Le nuove frontiere dell’arte, Scuderie di Palazzo Chigi Albani, Soriano nel Cimino.":"Arte è Bellezza. Le nuove frontiere dell’arte, Scuderie di Palazzo Chigi Albani, Soriano nel Cimino.","Incipit surrealtà, a cura di Robertomaria Siena, La Design.aTa Art Gallery, Roma.":"Incipit surrealtà, curated by Robertomaria Siena, La Design.aTa Art Gallery, Rome.","Incipit surrealtà, a cura di Robertomaria Siena, Scuderie di Palazzo Malvinni-Malvezzi, Matera.":"Incipit surrealtà, curated by Robertomaria Siena, Scuderie di Palazzo Malvinni-Malvezzi, Matera.","25° Anniversario Galería Artelibre, esposizione virtuale internazionale, Galería Artelibre, Spagna; pubblicazione nel Tomo I – Catalogo Rosso.":"25th Anniversary of Galería Artelibre, international online exhibition, Galería Artelibre, Spain; featured in Volume I – Red Catalogue.","Multi-Narrative: Painting in Coexistence, China Academy of Art, Hangzhou, Cina.":"Multi-Narrative: Painting in Coexistence, China Academy of Art, Hangzhou, China.","Residenza Arte è Bellezza, con il patrocinio del Ministero della Cultura, Soriano nel Cimino (VT), Italia.":"Arte è Bellezza artist residency, supported by the Italian Ministry of Culture, Soriano nel Cimino (VT), Italy.","Premio Combat – 17ª edizione, segnalazione della giuria e pubblicazione nel catalogo ufficiale.":"Premio Combat – 17th edition, jury commendation and inclusion in the official catalogue.","Luxembourg Art Prize, Certificato di Merito Artistico, Pinacothèque du Luxembourg.":"Luxembourg Art Prize, Certificate of Artistic Merit, Pinacothèque du Luxembourg.","Panta Rei Editoriale, articolo dedicato all’opera La Domatrice di Incubi.":"Panta Rei Editoriale, article on the painting La Domatrice di Incubi.","Pubblicazione nel Tomo I – Catalogo Rosso, Galería Artelibre.":"Published in Volume I – Red Catalogue, Galería Artelibre.","Guía de Arte LEONARDO 2023, pagina monografica, Galería Artelibre.":"Guía de Arte LEONARDO 2023, dedicated artist profile, Galería Artelibre.","Diploma accademico di secondo livello in Pittura, Accademia di Belle Arti di Roma, 110 e lode.":"Second-level academic diploma in Painting, Academy of Fine Arts of Rome, with highest honours.","Diploma accademico di primo livello in Pittura, Accademia di Belle Arti di Roma.":"First-level academic diploma in Painting, Academy of Fine Arts of Rome.","Opere selezionate":"Selected works","Serie / 2026":"Series / 2026","Apri opera":"Open artwork","Indietro":"Back","Avanti":"Next","Apri indice":"Open index","Dettaglio pittorico":"Painting detail","Visualizza":"View","Zoom":"Zoom","Riprendi":"Resume","Pausa":"Pause","Lavori":"Works","Galleria":"Gallery","Copia indirizzo email":"Copy email address","Email copiata":"Email copied","Privacy e cookie":"Privacy and cookies","Nome:":"Name:","Messaggio dal sito —":"Message from the website —","Email:":"Email:","Per informazioni":"For enquiries","Serie pittorica":"Painting series","Percorso precedente":"Earlier practice","PERCORSI":"PATHWAYS","Sito web di Davide Castelmezzano":"Website of Davide Castelmezzano","Ricerche":"Research","Chiudi":"Close","Torna su":"Back to top","Lingua":"Language","Artista":"Artist","Ritratto dell’artista":"Portrait of the artist","Data da verificare":"Date to be confirmed","Dettaglio di Smek":"Detail from Smek","Dettaglio di Illudes":"Detail from Illudes"};
  Object.assign(translations, {
    'Davide Castelmezzano (Matera, 1992) vive e lavora a Roma.':'Davide Castelmezzano (Matera, 1992) lives and works in Rome.',
    'La sua ricerca pittorica esplora le possibilità di trasfigurazione fantastica dell’immagine attraverso il dialogo tra gestualità pittorica e pareidolia.':'His painting practice explores the possibilities of the image’s fantastic transfiguration through a dialogue between painterly gesture and pareidolia.',
    'Neo Genesi esplora le possibilità che emergono dall’incontro tra forme e immagini apparentemente incompatibili.':'Neo Genesi explores the possibilities that emerge when seemingly incompatible forms and images meet.',
    'Attraverso la gestualità pittorica, elementi differenti entrano in relazione, generando configurazioni inattese e nuove possibilità figurative.':'Through painterly gesture, disparate elements enter into dialogue, generating unexpected configurations and new figurative possibilities.',
    'OPERA DALL’ARCHIVIO · TITOLO DA CONFERMARE':'WORK FROM THE ARCHIVE · TITLE TO BE CONFIRMED',
    'OPERE NEO GENESI':'WORKS — NEO GENESI',
    'OPERE ENIGMI SEMIOTICI':'WORKS — ENIGMI SEMIOTICI',
    'OPERE FANTASIA':'WORKS — FANTASIA'
  });
  const reverse=new Map(Object.entries(translations).map(([it,en])=>[en,it]));
  const stored=(()=>{try{return localStorage.getItem('davide-language-v1')}catch(e){return null}})();
  const legalBases=['privacy','cookies','note-legali'];
  const legalBase=()=>{const seg=location.hash.replace(/^#\/?/,'').split('?')[0].replace(/\/$/,'');return legalBases.find(x=>seg===x||seg===x+'-en')||null};
  let current=(/-(?:en)(?:\?|$)/.test(location.hash)?'en':stored==='en'?'en':'it');
  let active=false,changing=false;
  const originalText=new WeakMap();const originalAttrs=new WeakMap();
  const attrs=['alt','aria-label','title','placeholder','value'];
  const blocked=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','OPTION']);
  function resolveText(src){
    if(current==='it')return src;
    if(Object.prototype.hasOwnProperty.call(translations,src))return translations[src];
    // Dynamic text interpolates the artwork's name: retain the name unchanged.
    let m=src.match(/^Avvicina l.opera (.+)$/);if(m)return 'Move closer to the artwork '+m[1];
    m=src.match(/^Dettaglio di (.+)$/);if(m)return 'Detail of '+m[1];
    m=src.match(/^Visualizza (.+)$/);if(m)return 'View '+m[1];
    m=src.match(/^(.+) · Pannello ([12])$/);if(m)return m[1]+' · Panel '+m[2];
    m=src.match(/^OPERE (NEO GENESI|ENIGMI SEMIOTICI|FANTASIA)$/);if(m)return 'WORKS — '+m[1];
    m=src.match(/^(.+?) — dettaglio, (\d{4})$/);if(m)return m[1]+' — detail, '+m[2];
    m=src.match(/^Messaggio dal sito — (.+)$/);if(m)return 'Message from the website — '+m[1];
    // Dynamic medium/year may be assembled as separate strings.
    if(src.startsWith('Olio ')){
      let output=src;
      const mediumKeys=Object.keys(translations).filter(x=>x.startsWith('Olio ')).sort((a,b)=>b.length-a.length);
      for(const k of mediumKeys)if(output.startsWith(k)){output=translations[k]+output.slice(k.length);break}
      return output.replaceAll('ciascun pannello','each panel').replaceAll('complessivi','overall');
    }
    if(src.startsWith('Data da confermare'))return 'Date to be confirmed'+src.slice('Data da confermare'.length);
    return src;
  }
  function formatText(s){const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);return m?m:[ '',s,'' ];}
  function rendered(s){const [,lead,body,trail]=formatText(s);return lead+resolveText(body)+trail;}
  function translateText(node){
    if(!node?.parentElement || blocked.has(node.parentElement.tagName))return;
    const now=node.nodeValue;let original=originalText.get(node);
    if(original===undefined || (now!==original && now!==rendered(original))){
      const [,lead,body,trail]=formatText(now);
      original=lead+(reverse.get(body)||body)+trail;
      originalText.set(node,original);
    }
    const result=rendered(original);
    if(now!==result)node.nodeValue=result;
  }
  function translateElement(el){
    if(!(el instanceof Element))return;
    if(el.matches('[data-lang]'))return;
    let originals=originalAttrs.get(el);
    if(!originals){originals={};originalAttrs.set(el,originals)}
    for(const attr of attrs){
      if(!el.hasAttribute(attr))continue;
      if(attr==='value' && !(el instanceof HTMLInputElement && el.type==='hidden'))continue;
      const actual=el.getAttribute(attr);
      let it=originals[attr];
      if(it===undefined || (actual!==it && actual!==resolveText(it)))it=reverse.get(actual)||actual;
      originals[attr]=it;
      const wanted=resolveText(it);
      if(actual!==wanted)el.setAttribute(attr,wanted);
    }
  }
  function visit(root){
    if(!root)return;
    if(root.nodeType===Node.TEXT_NODE){translateText(root);return}
    if(root.nodeType!==Node.ELEMENT_NODE && root.nodeType!==Node.DOCUMENT_NODE)return;
    if(root.nodeType===Node.ELEMENT_NODE){translateElement(root);if(blocked.has(root.tagName))return}
    const iterator=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
    while(iterator.nextNode()){
      const node=iterator.currentNode;
      if(node.nodeType===Node.TEXT_NODE)translateText(node);
      else if(!blocked.has(node.tagName))translateElement(node);

    }
  }
  function correctLegalLinks(){
    const base=legalBase();if(!base)return;
    document.querySelectorAll('.legal31-langs a').forEach(a=>{
      const label=a.textContent.trim();
      if(label!=='IT'&&label!=='EN')return;
      const href='#/'+base+(label==='EN'?'-en':'');
      if(a.getAttribute('href')!==href)a.setAttribute('href',href);
      a.toggleAttribute('aria-current',label.toLowerCase()===current);
      if(a.hasAttribute('aria-current'))a.setAttribute('aria-current','page');
    });
  }
  function updateButtons(){
    document.querySelectorAll('[data-lang]').forEach(btn=>{
      const selected=btn.dataset.lang===current;
      btn.classList.toggle('is-current',selected);
      btn.setAttribute('aria-pressed',String(selected));
      btn.setAttribute('aria-label',(btn.dataset.lang==='it'?'Italiano':'English')+(selected?' — selected':''));
      btn.setAttribute('lang',btn.dataset.lang);
    });
    document.querySelectorAll('.rev169-lang').forEach(el=>el.setAttribute('aria-label',current==='it'?'Lingua del sito: italiano':'Website language: English'));
    document.querySelectorAll('#app [lang]').forEach(el=>el.setAttribute('lang',current));
    document.documentElement.lang=current;
    document.documentElement.setAttribute('data-language',current);
    document.querySelector('meta[name="description"]')?.setAttribute('content',current==='it'?'Davide Castelmezzano, pittore contemporaneo. Neo Genesi, opere, ricerca, biografia, curriculum e contatti.':'Davide Castelmezzano, contemporary painter. Neo Genesi, artworks, artistic research, biography, CV and contact.');
    if(document.title){
      if(current==='en')document.title=document.title.replace(/Ricerca/g,'Research').replace(/Contatti/g,'Contact').replace(/Altrilavori/g,'Earlier Works').replace(/Note-legali/g,'Legal Notices');
      else document.title=document.title.replace(/Research/g,'Ricerca').replace(/Contact/g,'Contatti').replace(/Earlier Works/g,'Altrilavori').replace(/Legal Notices/g,'Note-legali');
    }
  }
  const observer=new MutationObserver(records=>{
    if(changing)return;
    changing=true;
    try{
      for(const rec of records){
        if(rec.type==='childList'){
          for(const node of rec.addedNodes)visit(node);
        }else if(rec.type==='characterData'){translateText(rec.target)}
        else if(rec.type==='attributes')translateElement(rec.target);
      }
      correctLegalLinks();
    }finally{changing=false}
  });
  function repaint(){
    changing=true;
    try{visit(document.body);correctLegalLinks();updateButtons()}finally{changing=false}
  }
  function setLang(lang,keepRoute=false){
    if(!['it','en'].includes(lang))return;
    current=lang;
    try{localStorage.setItem('davide-language-v1',current)}catch(e){}
    const base=legalBase();
    if(base && !keepRoute){
       const target='#/'+base+(lang==='en'?'-en':'');
       if(location.hash!==target){location.hash=target;return}
    }
    repaint();
  }
  // All language selectors are native buttons, including the existing full-screen menu.
  document.addEventListener('click',e=>{
    const switcher=e.target.closest('[data-lang]');
    if(switcher){e.preventDefault();e.stopPropagation();setLang(switcher.dataset.lang);return}
    const legal=e.target.closest('a[href^="#/"]');
    if(!legal)return;
    const href=legal.getAttribute('href');
    if(legal.closest('.legal31-langs')){setLang(legal.textContent.trim()==='EN'?'en':'it',true);return;}
    if(current!=='en')return;
    const base=legalBases.find(x=>href==='#/'+x);
    if(base){e.preventDefault();location.hash='#/'+base+'-en'}
  },true);
  window.addEventListener('hashchange',()=>{
    const base=legalBase();
    if(base){
      const requested=location.hash.split('?')[0].endsWith('-en')?'en':'it';
      if(current!==requested)setLang(requested,true);
    }
    queueMicrotask(repaint);
  });
  // Watch dynamic routing, interactive artwork labels, tooltips and feedback.
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrs});
  repaint();
  window.DavideI18n={set:setLang,get:()=>current,refresh:repaint};
})();