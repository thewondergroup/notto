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
  heroTogo:    { img:'media/togo-poster.jpg',  video:'media/togo.mp4' },
  heroBars:    { img:'media/hero-poster.jpg',  video:'media/hero.mp4' },
  reel:        { img:'media/reel-poster.jpg',  video:'media/reel.mp4' },

  /* lifestyle / sections */
  catering:    { img:'media/spread.jpg' },
  ingredients: { img:'media/pepper-anchovy.jpg', pos:'50% 45%' },
  loyal1:      { img:'media/loyal1.jpg' },
  loyal2:      { img:'media/loyal2.jpg' },
  loyal3:      { img:'media/loyal3.jpg' },

  /* locations — real shots */
  locBroadgate:{ img:'media/locBroadgate.jpg', pos:'50% 45%' },   /* shopfront, Broadgate Central */
  locPicc:     { img:'media/locPicc.jpg',      pos:'50% 0%' },   /* 198 Piccadilly frontage */
  locCG:       { img:'media/locCG.jpg',        pos:'50% 60%' },   /* 4 Henrietta Street frontage */

  /* venue hero videos (detail pages) — real footage */
  heroBroadgate:{ img:'media/togo-poster.jpg', video:'media/togo.mp4' },
  heroPicc:     { img:'media/picc-poster.jpg', video:'media/picc.mp4' },    /* pasta bar sign → plates → negroni */
  heroCG:       { img:'media/cg-poster.jpg',   video:'media/cg.mp4' },      /* macaroni, butter, burrata, plated */
  /* spare clip, not yet placed: media/kitchen.mp4 (butter, focaccia, burrata, ravioli) + kitchen-poster.jpg */

  /* about */
  team:        { img:'media/spread.jpg' },
  suppliers:   { img:'media/dipWide.jpg' },
  story:       { img:'media/ravioliWide.jpg' },

  /* team portraits */
  personPhil:   { img:'media/personPhil.jpg',   pos:'50% 20%' },
  personJulian: { img:'media/personJulian.jpg', pos:'50% 30%' },   /* low-res — replace with a larger file when available */
  personAli:    { img:'media/personAli.jpg',    pos:'50% 30%' },   /* low-res — replace with a larger file when available */

  /* restaurant offer tiles */
  offPappardelle:{ img:'media/casarecce-ragu.jpg' },
  offSalad:      { img:'media/bowl-chicken.jpg', pos:'50% 55%' },
  offLunchbox:   { img:'media/lunchbox-tray.jpg', pos:'50% 22%' },
  offPasta:      { img:'media/tagliatelle-mushroom.jpg' },
  offAntipasti:  { img:'media/prosciutto-figs.jpg', pos:'50% 50%' },
  offCocktails:  { img:'media/cheers.jpg', pos:'50% 62%' },
  offWine:       { img:'media/spread.jpg', pos:'20% 40%' },

  /* catering page tiles */
  catPasta:      { img:'media/casarecce-ragu.jpg' },
  catBurrata:    { img:'media/dipWide.jpg', pos:'50% 55%' },
  catDelivery:   { img:'media/lunchbox-tray.jpg', pos:'50% 22%' },

  /* events / private dining */
  eventsHero:    { img:'media/spread.jpg' },
  eventsRoom:    { tone:'sage' },                       /* awaiting interior shot */
  eventsFood:    { img:'media/prosciutto-figs.jpg', pos:'50% 50%' },
  eventsDrink:   { img:'media/cheers.jpg', pos:'50% 62%' },

  /* careers */
  careFoh:       { tone:'sage' },                       /* awaiting shoot */
  careKitchen:   { img:'media/personPhil.jpg', pos:'50% 30%' },
  careProd:      { tone:'cream' },                      /* awaiting shoot */
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
      <p class="lab">NOTTO loyalty</p>
      <h2>Eight pastas. The ninth is <em>on us</em>.</h2>
      <p>Join NOTTO loyalty, collect a stamp with every pasta and your ninth is free. Simple as that.</p>
    </div>
    <div class="lb-form">
      <a class="btn btn--white" href="#" data-leat="join">Join NOTTO loyalty</a>
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

const LOYALTY_MODAL = `
<div class="modal" id="loyalty-modal" hidden role="dialog" aria-modal="true" aria-labelledby="loyalty-modal-title">
  <div class="modal-backdrop" data-modal-close></div>
  <div class="modal-panel">
    <button class="modal-close" type="button" aria-label="Close" data-modal-close>&times;</button>
    <p class="lab">NOTTO loyalty</p>
    <h2 id="loyalty-modal-title">Eight pastas. The ninth is <em>on us</em>.</h2>
    <div class="modal-embed" id="leat-widget"></div>
  </div>
</div>`;

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a href="index.html" class="mark" aria-label="NOTTO">NOTTO</a>
        <p style="color:var(--on-green-mute);margin-top:14px;max-width:30ch">Fresh pasta, made every day. London, since 2021.</p>
      </div>
      <div>
        <h5>Order</h5>
        <ul>
          <li><a href="#" data-storekit="collect">Click &amp; collect</a></li>
          <li><a href="catering.html" data-storekit="catering">Catering</a></li>
          <li><a href="https://www.sevenrooms.com/reservations/nottopastabars?venues=nottopastabarscg,nottopastabar" target="_blank" rel="noopener">Book a table</a></li>
          <li><a href="#" data-leat="vouchers">Vouchers</a></li>
        </ul>
      </div>
      <div>
        <h5>Discover</h5>
        <ul>
          <li><a href="menus.html">Menus</a></li>
          <li><a href="restaurants.html">Find us</a></li>
          <li><a href="pre-theatre.html">Pre-theatre dining</a></li>
          <li><a href="#" data-leat="join">Loyalty scheme</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="allergens.html">Allergens</a></li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="events.html">Private dining</a></li>
          <li><a href="careers.html">Work with us</a></li>
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
      <span><a href="privacy.html">Privacy</a> · <a href="allergens.html">Allergens</a> · <a href="terms.html">Terms</a></span>
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
  catering: ''   /* paste the StoreKit catering URL here when it exists */
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
    f.src=LEAT_URL; f.title='Join NOTTO loyalty'; f.loading='lazy';
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
document.querySelectorAll('[data-leat]').forEach(a=>{
  a.addEventListener('click',e=>{ e.preventDefault(); openLoyalty(); });
});
if(loyaltyModal){
  loyaltyModal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeLoyalty));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLoyalty(); });
}

/* run hydration */
hydrate();
