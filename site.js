/* ============================================================
   NOTTO — shared site script (all pages)
   Media map, image/video hydration, shared footer, nav behaviour,
   and placeholder handling for StoreKit / Leat routes.
   ============================================================ */

/* ---- MEDIA MAP ----
   Every slot points at a file in /media/. Swap a file (same name) or
   change a path here to update. `video:` makes a slot an autoplay loop. */
const ASSETS = {
  /* `pos:` is an optional CSS object-position — use it to pick the focal
     point when a portrait photo sits in a landscape frame (or vice versa). */

  /* hero videos */
  heroTogo:    { img:'media/cg-poster.jpg',    video:'media/cg.mp4' },       /* pasta-led: macaroni cooked and plated */
  heroBars:    { img:'media/picc-poster.jpg',  video:'media/picc.mp4' },     /* the experience: sign, plates, negroni */
  reel:        { img:'media/kitchen-poster.jpg', video:'media/kitchen.mp4' },

  /* home page menu cards */
  choiceBars:  { img:'media/cacio-e-pepe.jpg', pos:'50% 62%' },
  choiceTogo:  { img:'media/bowl-gnocchetti-top.jpg' },

  /* lifestyle / sections */
  catering:    { img:'media/spread.jpg' },
  ingredients: { img:'media/pepper-anchovy.jpg', pos:'50% 45%' },   /* Piedmontese pepper, on the Sept menu */

  /* locations — real shots */
  locBroadgate:{ img:'media/locBroadgate.jpg', pos:'50% 45%' },   /* shopfront, Broadgate Central */
  locPicc:     { img:'media/locPicc.jpg',      pos:'50% 0%' },   /* 198 Piccadilly frontage */
  locCG:       { img:'media/locCG.jpg',        pos:'50% 60%' },   /* 4 Henrietta Street frontage */

  /* venue hero videos (detail pages) — real footage */
  heroBroadgate:{ img:'media/cg-poster.jpg',   video:'media/cg.mp4' },
  heroPicc:     { img:'media/picc-poster.jpg', video:'media/picc.mp4' },    /* pasta bar sign → plates → negroni */
  heroCG:       { img:'media/kitchen-poster.jpg', video:'media/kitchen.mp4' },  /* butter, focaccia, burrata, ravioli */


  /* team portraits */
  personPhil:   { img:'media/personPhil.jpg',   pos:'50% 20%' },
  personJulian: { img:'media/personJulian.jpg', pos:'50% 30%' },   /* low-res — replace with a larger file when available */
  personAli:    { img:'media/personAli.jpg',    pos:'50% 30%' },   /* low-res — replace with a larger file when available */

  /* restaurant offer tiles */
  offPappardelle:{ img:'media/bowl-strozzapreti.jpg' },
  offSalad:      { img:'media/milano-bowl.jpg', pos:'40% 50%' },
  offLunchbox:   { img:'media/lunchbox-tray.jpg', pos:'50% 22%' },
  offPasta:      { img:'media/ravioli-pumpkin-top.jpg' },
  offAntipasti:  { img:'media/prosciutto-figs.jpg', pos:'50% 50%' },
  offCocktails:  { img:'media/negroni.jpg', pos:'50% 60%' },
  offWine:       { img:'media/spread.jpg', pos:'20% 40%' },

  /* catering page tiles */
  catPasta:      { img:'media/bowl-gnocchetti.jpg' },
  catBurrata:    { img:'media/mozzarella.jpg', pos:'50% 60%' },
  catDelivery:   { img:'media/lunchbox-tray.jpg', pos:'50% 22%' },

  /* events / private dining */
  eventsHero:    { img:'media/spread.jpg' },
  eventsRoom:    { img:'media/room-interior.jpg' },
  eventsFood:    { img:'media/ravioli-pumpkin.jpg', pos:'50% 55%' },
  eventsDrink:   { img:'media/cheers.jpg', pos:'50% 62%' },

  /* careers */
  careFoh:       { img:'media/team-foh.jpg', pos:'50% 15%' },
  careKitchen:   { img:'media/broadgate-counter.jpg', pos:'50% 60%' },
  careProd:      { img:'media/personPhil.jpg', pos:'50% 30%' },
};

/* hydrate every .media[data-asset]: real photo/video, else a tone frame */
function hydrate(scope=document){
  scope.querySelectorAll('.media[data-asset]').forEach(el=>{
    if(el.dataset.hydrated) return;
    const a = ASSETS[el.dataset.asset] || {};
    if(a.video){
      const v=document.createElement('video');
      v.src=a.video; v.poster=a.img||''; v.autoplay=true; v.muted=true; v.loop=true; v.playsInline=true;
      el.prepend(v); el.dataset.state='live';
    } else if(a.img){
      const i=document.createElement('img'); i.src=a.img; i.alt=''; i.loading='lazy';
      if(a.pos) i.style.objectPosition=a.pos;
      el.prepend(i); el.dataset.state='live';
    } else {
      el.dataset.state='empty'; el.dataset.tone=a.tone||'cream';
      const f=document.createElement('div'); f.className='frame';
      f.innerHTML='<span class="frame-kind">'+(el.dataset.type==='video'?'Video':'Photograph')+'</span>'+
                  '<span class="frame-shot">'+(el.dataset.shot||'')+'</span>'+
                  '<span class="frame-note">Awaiting shoot</span>';
      el.prepend(f);
    }
    el.dataset.hydrated='1';
  });
}

/* ---- SITE-WIDE LOYALTY BANNER + FOOTER ---- */
const LOYALTY_BANNER = `
<section class="loyal-banner" id="loyalty-signup">
  <div class="wrap">
    <div class="lb-text">
      <p class="lab">NOTTO Perks &middot; when you order direct</p>
      <h2>Eight pastas. The ninth is <em>on us</em>.</h2>
      <p>Order direct from our website, collect a stamp with every pasta and your ninth is free. Simple as that.</p>
    </div>
    <div class="lb-form">
      <a class="btn btn--white" href="#" data-leat="join">Join NOTTO Perks</a>
      <a class="btn btn--white" href="#" data-vouchers>Gift a Feast</a>
      <small>Takes a minute. Lives on your phone. Free pasta.</small>
    </div>
  </div>
</section>`;

/* ---- LOYALTY MODAL (Leat widget lives in here) ----
   Paste the Leat embed snippet into LEAT_EMBED below (the HTML/script
   Leat gives you). If you only have a hosted join URL, put it in LEAT_URL
   instead and it will load in a frame. Any element with data-leat="..."
   opens this modal. Never put the Leat API token in this file. */
const LEAT_EMBED = ``;
const LEAT_URL = 'https://forms.leat.com/forms/d51cb612-52a8-4226-aa46-cc75b34a19f5/public/custom';

/* Gift vouchers — Leat gift card widget. The widget script is loaded the
   first time someone clicks a Vouchers link, then opened. Set LEAT_WIDGET to
   null to fall back to VOUCHER_URL (a plain link) or the "coming shortly" note.
   Set LEAT_WIDGET.always to true to load the widget (and its floating button)
   on every page load instead of on demand. */
const LEAT_WIDGET = { widgetId:'3786', accountId:'ef2b6519-3ecd-45bf-b172-e7a7630fbc86', src:'https://widget.leat.com/widget.js', always:false };
const VOUCHER_URL = '';

const LOYALTY_MODAL = `
<div class="modal" id="loyalty-modal" hidden role="dialog" aria-modal="true" aria-labelledby="loyalty-modal-title">
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-panel">
    <button class="modal-close" type="button" aria-label="Close" data-modal-close>&times;</button>
    <p class="lab">NOTTO Perks &middot; when you order direct</p>
    <h2 id="loyalty-modal-title">Eight pastas. The ninth is <em>on us</em>.</h2>
    <div class="modal-embed" id="leat-widget"></div>
  </div>
</div>`;

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a href="./" class="mark" aria-label="NOTTO">NOTTO</a>
        <p style="color:var(--on-green-mute);margin-top:14px;max-width:30ch">Fresh pasta, made every day. London, since 2021.</p>
      </div>
      <div>
        <h5>Order</h5>
        <ul>
          <li><a href="https://order.storekit.com/notto-broadgate/menu" target="_blank" rel="noopener" data-storekit="collect">Order online</a></li>
          <li><a href="catering" data-storekit="catering">Catering</a></li>
          <li><a href="https://www.sevenrooms.com/reservations/nottopastabars?venues=nottopastabarscg,nottopastabar" target="_blank" rel="noopener">Book a table</a></li>
          <li><a href="#" data-vouchers>Vouchers</a></li>
        </ul>
      </div>
      <div>
        <h5>Discover</h5>
        <ul>
          <li><a href="menus">Menus</a></li>
          <li><a href="restaurants">Find us</a></li>
          <li><a href="pre-theatre">Pre-theatre dining</a></li>
          <li><a href="perks">Loyalty</a></li>
          <li><a href="about">About</a></li>
          <li><a href="allergens">Allergens</a></li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="contact">Contact</a></li>
          <li><a href="events">Groups &amp; events</a></li>
          <li><a href="careers">Work with us</a></li>
        </ul>
      </div>
      <div>
        <h5>Follow</h5>
        <ul>
          <li><a href="https://www.instagram.com/nottopastabars">Instagram</a></li>
          <li><a href="https://www.tiktok.com/@nottopastabar">TikTok</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bar">
      <span>© 2026 NOTTO. 1 Broadgate · 198 Piccadilly · 4 Henrietta Street.</span>
      <span><a href="privacy">Privacy</a> · <a href="allergens">Allergens</a> · <a href="terms">Terms</a> · Made by <a class="credit" href="https://www.thewonderagency.co/" target="_blank" rel="noopener">The Wonder Agency</a></span>
    </div>
  </div>
</footer>`;

const footSlot = document.getElementById('site-footer');
if(footSlot){ footSlot.outerHTML = LOYALTY_BANNER + FOOTER_HTML + LOYALTY_MODAL; }

/* ---- MOBILE: hamburger toggle ---- */
const navBar = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
if(navToggle && navBar){
  navToggle.addEventListener('click',()=>{
    const open = navBar.dataset.menu==='open';
    navBar.dataset.menu = open ? '' : 'open';
    navToggle.setAttribute('aria-expanded', String(!open));
    document.body.style.overflow = open ? '' : 'hidden';
  });
}

/* ---- NAV: restaurants mega-menu dropdown ---- */
const navItems = document.querySelectorAll('.nav-item');
const isMobile = ()=> window.matchMedia('(max-width:640px)').matches;
navItems.forEach(item=>{
  const link = item.querySelector(':scope > a');
  let closeTimer;
  const open =()=>{ clearTimeout(closeTimer); if(!isMobile()) item.dataset.open='true'; };
  const close=()=>{ closeTimer=setTimeout(()=>{ item.dataset.open='false'; }, 220); };
  item.addEventListener('mouseenter',open);
  item.addEventListener('mouseleave',close);
  // MOBILE: tapping the label opens the submenu instead of navigating.
  // The overview page is reachable via the "See all restaurants" link inside.
  if(link){
    link.addEventListener('click',e=>{
      if(isMobile()){
        e.preventDefault();
        item.dataset.open = item.dataset.open==='true' ? 'false' : 'true';
      }
    });
  }
});
document.addEventListener('click',e=>{
  navItems.forEach(item=>{ if(!item.contains(e.target)) item.dataset.open='false'; });
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') navItems.forEach(i=>i.dataset.open='false'); });

/* ---- NAV: Discover mega-menu (if present) ---- */
const trigs=document.querySelectorAll('.trig');
function closeAllMega(){
  trigs.forEach(t=>t.setAttribute('aria-expanded','false'));
  document.querySelectorAll('.mega').forEach(m=>m.dataset.open='false');
}
trigs.forEach(t=>{
  t.addEventListener('click',e=>{
    e.stopPropagation();
    const open=t.getAttribute('aria-expanded')==='true';
    closeAllMega();
    if(!open){ t.setAttribute('aria-expanded','true'); const m=document.getElementById('mega-'+t.dataset.mega); if(m) m.dataset.open='true'; }
  });
});
document.addEventListener('click',closeAllMega);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeAllMega(); });

/* ---- StoreKit ordering routes ---- */
const STOREKIT_URL = {
  collect:  'https://order.storekit.com/notto-broadgate/menu',
  catering: ''   /* paste the StoreKit CATERING url here; until then catering buttons use the Broadgate menu */
};
document.querySelectorAll('[data-storekit]').forEach(a=>{
  const url=STOREKIT_URL[a.dataset.storekit];
  if(url){ a.href=url; a.target='_blank'; a.rel='noopener'; return; }
  a.addEventListener('click',e=>{
    /* no StoreKit URL yet: follow a real href if there is one, otherwise explain */
    if(a.getAttribute('href') && a.getAttribute('href')!=='#') return;
    e.preventDefault();
    alert('Ordering opens here once StoreKit is connected.');
  });
});
/* ---- Loyalty modal behaviour ---- */
const loyaltyModal = document.getElementById('loyalty-modal');
function mountLeat(){
  const slot=document.getElementById('leat-widget');
  if(!slot || slot.dataset.mounted) return;
  slot.dataset.mounted='1';
  if(LEAT_EMBED.trim()){
    /* innerHTML won't run <script> tags, so rebuild them */
    const tpl=document.createElement('template'); tpl.innerHTML=LEAT_EMBED;
    tpl.content.querySelectorAll('script').forEach(old=>{
      const sc=document.createElement('script');
      [...old.attributes].forEach(a=>sc.setAttribute(a.name,a.value));
      sc.textContent=old.textContent; old.replaceWith(sc);
    });
    slot.appendChild(tpl.content);
  } else if(LEAT_URL){
    const f=document.createElement('iframe');
    f.src=LEAT_URL; f.title='Join NOTTO Perks'; f.loading='lazy';
    slot.appendChild(f);
    const alt=document.createElement('p'); alt.className='modal-alt';
    alt.innerHTML='Form not showing? <a href="'+LEAT_URL+'" target="_blank" rel="noopener">Open it in a new tab →</a>';
    slot.appendChild(alt);
  } else {
    slot.innerHTML='<div class="modal-placeholder"><strong>I will connect Leat here</strong></div>';
  }
}
function openLoyalty(){
  if(!loyaltyModal) return;
  if(navBar && navBar.dataset.menu==='open'){ navBar.dataset.menu=''; if(navToggle) navToggle.setAttribute('aria-expanded','false'); }
  mountLeat();
  loyaltyModal.hidden=false;
  document.body.style.overflow='hidden';
  const c=loyaltyModal.querySelector('.modal-close'); if(c) c.focus();
}
function closeLoyalty(){
  if(!loyaltyModal || loyaltyModal.hidden) return;
  loyaltyModal.hidden=true;
  document.body.style.overflow='';
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-leat]'); if(!a) return;
  e.preventDefault(); openLoyalty();
});
if(loyaltyModal){
  loyaltyModal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeLoyalty));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLoyalty(); });
}

/* ---- Homepage promo pop-up: rotates through five slides ----
   Shown once per browser session on the home page, after PROMO_DELAY ms.
   Edit the slides here. Set PROMO_SLIDES = [] to switch it off. */
const PROMO_DELAY = 4000;
const PROMO_SLIDES = [
  { id:'groups',   img:'media/spread.jpg',         lab:'Groups &amp; events &middot; 6 or more', title:'Christmas, <em>sorted</em>.', body:'One menu for the whole table, from &pound;25 a head at Piccadilly and Covent Garden.', cta:'Book for 6 or more', href:'events' },
  { id:'catering', img:'media/catering.jpg',       lab:'Catering &middot; delivered to you',     title:'Feed the <em>whole office</em>.', body:'Fresh pasta, salads and focaccia for meetings, team lunches and everything in between.', cta:'See catering', href:'catering' },
  { id:'loyalty',  img:'media/bowl-rigatoni.jpg',  lab:'NOTTO Perks &middot; loyalty',            title:'Eight pastas. The ninth is <em>on us</em>.', body:'Order direct from our website and collect a stamp with every pasta.', cta:'Join NOTTO Perks', attr:'data-leat="join"' },
  { id:'vouchers', img:'media/festive-cheers-2.jpg', lab:'Gift vouchers',                         title:'Give them a taste of <em>NOTTO</em>.', body:'Any amount from &pound;25, or gift a whole Feast. Valid for 12 months.', cta:'Buy a voucher', attr:'data-vouchers' },
  { id:'order',    img:'media/lunchbox.jpg',       lab:'Broadgate &middot; order online',        title:'Lunch, <em>sorted</em>.', body:'Order ahead for collection or delivery in the City.', cta:'Order online', href:'https://order.storekit.com/notto-broadgate/menu', ext:true }
];
if(document.body.classList.contains('is-home') && PROMO_SLIDES.length){
  let seen=false; try{ seen=sessionStorage.getItem('notto-promo')==='1'; }catch(e){}
  if(!seen){
    const slides=PROMO_SLIDES.map((p,i)=>`
      <div class="promo-slide" data-promo="${p.id}" ${i?'hidden':''} role="group" aria-roledescription="slide" aria-label="${i+1} of ${PROMO_SLIDES.length}">
        <div class="promo-img"><img src="${p.img}" alt="" loading="lazy"></div>
        <div class="promo-body">
          <p class="lab">${p.lab}</p>
          <h2>${p.title}</h2>
          <p>${p.body}</p>
          <a class="btn" ${p.attr||''} href="${p.href||'#'}" ${p.ext?'target="_blank" rel="noopener"':''} data-promo-cta="${p.id}">${p.cta}</a>
        </div>
      </div>`).join('');
    const dots=PROMO_SLIDES.map((p,i)=>`<button type="button" class="promo-dot" aria-label="Show slide ${i+1}" data-promo-go="${i}"${i?'':' aria-current="true"'}></button>`).join('');
    document.body.insertAdjacentHTML('beforeend',`
<div class="modal promo" id="promo-modal" hidden role="dialog" aria-modal="true" aria-roledescription="carousel" aria-label="What's on at NOTTO">
  <div class="modal-backdrop" data-promo-close></div>
  <div class="modal-panel promo-panel">
    <button class="modal-close" type="button" aria-label="Close" data-promo-close>&times;</button>
    <div class="promo-track">${slides}</div>
    <div class="promo-nav">
      <button type="button" class="promo-arrow" aria-label="Previous" data-promo-step="-1">&#8592;</button>
      <div class="promo-dots">${dots}</div>
      <button type="button" class="promo-arrow" aria-label="Next" data-promo-step="1">&#8594;</button>
    </div>
  </div>
</div>`);
    const pm=document.getElementById('promo-modal');
    const all=[...pm.querySelectorAll('.promo-slide')], dotEls=[...pm.querySelectorAll('.promo-dot')];
    let cur=0, timer=null;
    const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show=i=>{ cur=(i+all.length)%all.length; all.forEach((s,k)=>s.hidden=k!==cur); dotEls.forEach((d,k)=>d.toggleAttribute('aria-current',k===cur)); };
    const stop=()=>{ clearInterval(timer); timer=null; };
    const play=()=>{ if(reduce||timer) return; timer=setInterval(()=>show(cur+1),5500); };
    const close=()=>{ pm.hidden=true; document.body.style.overflow=''; stop(); try{ sessionStorage.setItem('notto-promo','1'); }catch(e){} };
    pm.querySelectorAll('[data-promo-close]').forEach(el=>el.addEventListener('click',close));
    pm.querySelectorAll('[data-promo-step]').forEach(el=>el.addEventListener('click',()=>{ stop(); show(cur+(+el.dataset.promoStep)); }));
    pm.querySelectorAll('[data-promo-go]').forEach(el=>el.addEventListener('click',()=>{ stop(); show(+el.dataset.promoGo); }));
    pm.querySelector('.promo-panel').addEventListener('mouseenter',stop);
    pm.querySelector('.promo-panel').addEventListener('focusin',stop);
    pm.querySelectorAll('[data-promo-cta]').forEach(el=>el.addEventListener('click',()=>{
      try{ (window.dataLayer=window.dataLayer||[]).push({event:'promo_click',promo:el.dataset.promoCta}); }catch(e){}
      close();
    }));
    document.addEventListener('keydown',e=>{ if(pm.hidden) return; if(e.key==='Escape') close(); if(e.key==='ArrowRight'){stop();show(cur+1);} if(e.key==='ArrowLeft'){stop();show(cur-1);} });
    setTimeout(()=>{
      if(typeof loyaltyModal!=='undefined' && loyaltyModal && !loyaltyModal.hidden) return;
      pm.hidden=false; document.body.style.overflow='hidden'; play();
      const c=pm.querySelector('.modal-close'); if(c) c.focus();
    },PROMO_DELAY);
  }
}

/* ---- Vouchers (Leat gift card widget) ---- */
let leatWidgetState = null; /* null | 'loading' | 'ready' */
function loadLeatWidget(){
  return new Promise((resolve,reject)=>{
    if(window.PiggyWidget){ leatWidgetState='ready'; return resolve(window.PiggyWidget); }
    if(leatWidgetState==='loading'){ window.addEventListener('piggyWidgetReady',()=>resolve(window.PiggyWidget),{once:true}); return; }
    leatWidgetState='loading';
    const s=document.createElement('script');
    s.id='leat-widget-script'; s.defer=true; s.src=LEAT_WIDGET.src;
    s.setAttribute('data-widget-id',LEAT_WIDGET.widgetId);
    s.setAttribute('data-account-id',LEAT_WIDGET.accountId);
    s.setAttribute('account-uuid',LEAT_WIDGET.accountId);
    window.addEventListener('piggyWidgetReady',()=>{ leatWidgetState='ready'; resolve(window.PiggyWidget); },{once:true});
    s.onerror=()=>{ leatWidgetState=null; reject(new Error('Leat widget failed to load')); };
    document.body.appendChild(s);
    /* belt and braces: if the ready event never fires but the API appears, resolve anyway */
    let tries=0; const t=setInterval(()=>{ if(window.PiggyWidget){ clearInterval(t); leatWidgetState='ready'; resolve(window.PiggyWidget); } else if(++tries>50){ clearInterval(t); } },200);
  });
}
function openVouchers(e){
  if(e) e.preventDefault();
  loadLeatWidget().then(w=>{ try{ w.open('giftcards'); }catch(err){ try{ w.open(); }catch(e2){} } })
    .catch(()=>{ if(VOUCHER_URL) location.href=VOUCHER_URL; else alert('Gift vouchers are coming online shortly. In the meantime, ask in any NOTTO.'); });
}
document.querySelectorAll('[data-vouchers]').forEach(a=>{
  if(LEAT_WIDGET){ a.addEventListener('click',openVouchers); return; }
  if(VOUCHER_URL){ a.href=VOUCHER_URL; a.target='_blank'; a.rel='noopener'; return; }
  a.addEventListener('click',e=>{ e.preventDefault(); alert('Gift vouchers are coming online shortly. In the meantime, ask in any NOTTO.'); });
});
if(LEAT_WIDGET && LEAT_WIDGET.always) loadLeatWidget().catch(()=>{});

/* ---- Deep links from emails and ads ----
   nottopasta.com/#vouchers  opens the gift card widget
   nottopasta.com/#loyalty   opens the loyalty sign-up
   Works on any page. The hash is cleared so a refresh does not reopen it. */
function handleDeepLink(){
  const h=(location.hash||'').toLowerCase();
  if(h==='#vouchers'){ history.replaceState(null,'',location.pathname+location.search); setTimeout(()=>openVouchers(),250); }
  else if(h==='#loyalty'||h==='#join'){ history.replaceState(null,'',location.pathname+location.search); setTimeout(()=>openLoyalty(),250); }
}
handleDeepLink();
window.addEventListener('hashchange',handleDeepLink);

/* ---- Split hero: whole panel is clickable, buttons inside keep their own links ---- */
document.querySelectorAll('.half[data-href]').forEach(h=>{
  h.addEventListener('click',e=>{ if(e.target.closest('a')) return; location.href=h.dataset.href; });
});

/* run hydration */
hydrate();

/* ---- Newsletter (Mailchimp) ----
   Posts to Mailchimp's JSONP endpoint so the visitor stays on the page.
   Audience: NOTTO Pasta Bars. The gdpr[...] checkbox is the marketing
   permission Mailchimp requires; "tags" is the Mailchimp tag id applied
   to website sign-ups. */
const MAILCHIMP = {
  action: 'https://nottopastabar.us1.list-manage.com/subscribe/post-json?u=d24ae2077e79a2dae174205f9&id=9c331ba638&v_id=3764&f_id=00fd7ae5f0',
  honeypot: 'b_d24ae2077e79a2dae174205f9_9c331ba638',
  tags: '5907938'
};
document.querySelectorAll('form[data-mailchimp]').forEach((form,i)=>{
  const email=form.querySelector('input[type=email]'), consent=form.querySelector('input[type=checkbox]'), msg=form.querySelector('.form-msg'), btn=form.querySelector('button');
  if(i>0){ email.id='mc-email-'+i; form.querySelector('label[for=mc-email]').htmlFor=email.id; }
  const say=(t,err)=>{ msg.textContent=t; form.classList.toggle('is-error',!!err); };
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) return say('Please enter a valid email address.',true);
    if(consent && !consent.checked) return say('Please tick the box so we know you\u2019re happy to hear from us.',true);
    const cb='mcCb'+Date.now();
    const q=new URLSearchParams({EMAIL:email.value,tags:MAILCHIMP.tags,c:cb});
    if(consent) q.append(consent.name,'Y');
    q.append(MAILCHIMP.honeypot,'');
    btn.disabled=true; say('One moment\u2026');
    const s=document.createElement('script');
    window[cb]=(r)=>{
      btn.disabled=false; delete window[cb]; s.remove();
      if(r.result==='success'){ say('You\u2019re in. Check your inbox.'); form.reset(); }
      else{
        const t=(r.msg||'').replace(/^\d+ - /,'').replace(/<[^>]+>/g,'');
        say(/already subscribed/i.test(t)?'You\u2019re already on the list.':(t||'Something went wrong. Please try again.'),true);
      }
    };
    s.src=MAILCHIMP.action+'&'+q.toString();
    s.onerror=()=>{ btn.disabled=false; say('Something went wrong. Please try again.',true); };
    document.body.appendChild(s);
  });
});

/* =====================================================================
   ENQUIRY FORMS (contact, groups & events, catering, careers)
   Submissions go to a Google Apps Script that checks reCAPTCHA, saves a
   row in the NOTTO enquiries Google Sheet and emails the right person.
   Paste the two values below once the script is deployed:
     ENQUIRY_ENDPOINT    the Apps Script web app URL (ends in /exec)
     RECAPTCHA_SITE_KEY  the reCAPTCHA v3 SITE key (the public one)
   The reCAPTCHA SECRET key never goes in this file.
   ===================================================================== */
const ENQUIRY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw6I_fFteqfYYj3BPndlJa0XjX9kpfR7sMIKMSSNkNTbNbMAa7Cw1S1wpiHIgFZLUuH9w/exec';
const RECAPTCHA_SITE_KEY = '';
const CATERING_PACK_URL = 'media/notto-catering-pack.pdf';

/* remember where a visitor came from, so every lead carries its ad source */
(function(){
  try{
    const q=new URLSearchParams(location.search), keep={};
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(k=>{ if(q.get(k)) keep[k]=q.get(k); });
    if(Object.keys(keep).length) sessionStorage.setItem('notto-src',JSON.stringify(keep));
    if(!sessionStorage.getItem('notto-landing')) sessionStorage.setItem('notto-landing',location.pathname);
  }catch(e){}
})();

const enquiryForms=document.querySelectorAll('form[data-enquiry]');
if(enquiryForms.length){
  if(RECAPTCHA_SITE_KEY){
    const r=document.createElement('script');
    r.src='https://www.google.com/recaptcha/api.js?render='+encodeURIComponent(RECAPTCHA_SITE_KEY); r.async=true;
    document.head.appendChild(r);
  }
  /* preselect a topic from a link (data-enquiry-topic) or the URL (?topic=allergens) */
  const pick=(form,val)=>{ const s=form.querySelector('select[name="topic"]'); if(!s||!val) return;
    const o=[...s.options].find(o=>o.text.toLowerCase().indexOf(val.toLowerCase())===0); if(o) s.value=o.value||o.text; };
  const qTopic=new URLSearchParams(location.search).get('topic');
  if(qTopic) enquiryForms.forEach(f=>pick(f,qTopic));
  document.querySelectorAll('[data-enquiry-topic]').forEach(a=>a.addEventListener('click',()=>{
    enquiryForms.forEach(f=>pick(f,a.dataset.enquiryTopic));
  }));
  const pack=document.querySelectorAll('[data-pack]');
  pack.forEach(a=>{ a.href=CATERING_PACK_URL; a.addEventListener('click',()=>{ try{ (window.dataLayer=window.dataLayer||[]).push({event:'catering_pack_download'}); }catch(e){} }); });

  const readFile=f=>new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(String(r.result).split(',')[1]); r.onerror=rej; r.readAsDataURL(f); });
  const token=action=>new Promise(res=>{
    if(!RECAPTCHA_SITE_KEY||!window.grecaptcha) return res('');
    grecaptcha.ready(()=>grecaptcha.execute(RECAPTCHA_SITE_KEY,{action}).then(res).catch(()=>res('')));
  });

  if(!RECAPTCHA_SITE_KEY) document.querySelectorAll('.enq-rc').forEach(el=>el.remove());
  enquiryForms.forEach(form=>{
    const started=Date.now();
    const kind=form.dataset.enquiry, msg=form.querySelector('.enq-msg'), btn=form.querySelector('button[type="submit"]');
    const done=form.nextElementSibling && form.nextElementSibling.classList.contains('enq-done') ? form.nextElementSibling : null;
    const say=(t,err)=>{ msg.textContent=t; form.classList.toggle('is-error',!!err); };
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const bad=[...form.querySelectorAll('[required]')].find(el=>!String(el.value).trim());
      if(bad){ say('Please fill in the fields marked *.',true); bad.focus(); return; }
      const em=form.querySelector('input[type="email"]');
      if(em && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value)){ say('Please check your email address.',true); em.focus(); return; }
      if(!ENQUIRY_ENDPOINT){ say('Sorry, our form isn’t connected yet. Please call the restaurant and we’ll help.',true); return; }
      const data={form_type:kind, page:location.pathname, elapsed:Date.now()-started};
      new FormData(form).forEach((v,k)=>{ if(!(v instanceof File)) data[k]=v; });
      try{ Object.assign(data, JSON.parse(sessionStorage.getItem('notto-src')||'{}')); data.landing_page=sessionStorage.getItem('notto-landing')||''; }catch(err){}
      const file=form.querySelector('input[type="file"]');
      if(file && file.files[0]){
        if(file.files[0].size>5*1024*1024){ say('Please keep your CV under 5MB.',true); return; }
        data.file={ name:file.files[0].name, type:file.files[0].type, data:await readFile(file.files[0]) };
      }
      btn.disabled=true; say('Sending…');
      data.token=await token(kind);
      try{
        const r=await fetch(ENQUIRY_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});
        const out=await r.json();
        if(!out.ok) throw new Error(out.message||'');
        try{ (window.dataLayer=window.dataLayer||[]).push({event:'generate_lead',form_type:kind}); }catch(err){}
        form.reset(); say('');
        if(done){ form.hidden=true; done.hidden=false; done.focus(); } else say('Thanks, we’ve got it.');
      }catch(err){
        say(err.message||'Something went wrong. Please try again, or call the restaurant.',true);
      }finally{ btn.disabled=false; }
    });
  });
}
