/* ============================================================
   NOTTO — interactive To Go menu (Pasta bar / Salad bar)
   Requires ASSETS + hydrate() from site.js (load site.js first).
   ============================================================ */
const IMAGES = {
  "bucatini": "media/bucatini.jpg",
  "gnocchetti": "media/gnocchetti.jpg",
  "lunchbox": "media/lunchbox.jpg",
  "pappardelle": "media/pappardelle.jpg",
  "rigatoni": "media/rigatoni.jpg",
  "salad-roman": "media/salad-roman.jpg",
  "salad-small": "media/salad-small.jpg",
  "salad-tuscan": "media/salad-tuscan.jpg",
  "spaghetti": "media/spaghetti.jpg",
  "tagliolini-nero": "media/tagliolini-nero.jpg",
};

const MENU = {
  pasta:[
    {id:'pappardelle', name:'Pappardelle', price:'', asset:'pappardelle',
      shot:'Pappardelle · beef ragù',
      blurb:'Slow-cooked ragù of beef, field mushrooms and red wine, folded through fresh pappardelle.',
      build:{Pasta:['Fresh pappardelle'],Ragù:['Slow-cooked beef','Field mushrooms','Red wine'],Finish:['Parmesan']}},
    {id:'rigatoni', name:'Rigatoni', price:'', asset:'rigatoni',
      shot:'Rigatoni · tomato, mozzarella, basil',
      blurb:'Sun-ripened tomato, sweet onion, mozzarella and basil. The one everyone comes back for.',
      build:{Pasta:['Rigatoni'],Sauce:['Sun-ripened tomato','Sweet onion'],Finish:['Mozzarella','Basil']}},
    {id:'gnocchetti', name:'Gnocchetti', price:'', asset:'gnocchetti',
      shot:'Gnocchetti · sausage, fennel, chilli',
      blurb:'Smashed sausage with fennel, chilli, white wine and garlic. Rustic and generous.',
      build:{Pasta:['Gnocchetti'],Sauce:['Smashed sausage','Fennel','Chilli','White wine','Garlic'],Finish:['Parmesan']}},
    {id:'tagliolini', name:'Tagliolini nero', price:'', asset:'tagliolini-nero',
      shot:'Tagliolini nero · prawn bolognese',
      blurb:'Squid-ink tagliolini under a bolognese of prawns, sweet peppers, tomato and chilli.',
      build:{Pasta:['Tagliolini nero'],Sauce:['Prawn bolognese','Sweet peppers','Tomato','Chilli'],Finish:['Olive oil']}},
    {id:'bucatini', name:'Bucatini', price:'', asset:'bucatini',
      shot:'Bucatini · chilli, garlic, crumbs',
      blurb:'Chilli, garlic, extra-virgin olive oil and toasted crumbs. Simple, done properly.',
      build:{Pasta:['Bucatini'],Sauce:['Chilli','Garlic','Extra-virgin olive oil'],Finish:['Toasted crumbs']}},
    {id:'spaghetti', name:'Spaghetti', price:'', asset:'spaghetti',
      shot:'Spaghetti · chilli, garlic, crumbs',
      blurb:'Chilli, garlic, extra-virgin olive oil and toasted crumbs. The classic aglio e olio.',
      build:{Pasta:['Spaghetti'],Sauce:['Chilli','Garlic','Extra-virgin olive oil'],Finish:['Toasted crumbs']}},
  ],
  salads:[
    {id:'roman', name:'The Roman', price:'', asset:'salad-roman',
      shot:'The Roman · caesar',
      blurb:'Caesar-style salad with chicken, butter beans, and an anchovy and parmesan dressing.',
      build:{Base:['Cos lettuce'],Add:['Chicken','Butter beans','Croutons'],Dress:['Anchovy & parmesan']}},
    {id:'amalfi', name:'The Amalfi', price:'', asset:'amalfi', tone:'sage',
      shot:'The Amalfi · niçoise',
      blurb:'Niçoise-style salad with line-caught tuna and crunchy chickpeas.',
      build:{Base:['Leaves','Tomato'],Add:['Line-caught tuna','Chickpeas','Red onion'],Dress:['Olive oil']}},
    {id:'tuscan', name:'The Tuscan', price:'', asset:'salad-tuscan',
      shot:'The Tuscan · peppers, artichoke, cannellini',
      blurb:'A vibrant salad of sweet peppers, artichoke hearts, red onions, cannellini beans and balsamic.',
      build:{Base:['Rocket'],Add:['Sweet peppers','Artichoke hearts','Cannellini beans','Red onion'],Dress:['Balsamic']}},
    {id:'lunchbox', name:'NOTTO Mediterranean lunchbox', price:'', asset:'lunchbox',
      shot:'NOTTO Mediterranean lunchbox',
      blurb:'Roasted sweet peppers and red onions with balsamic vinegar, dressed cannellini beans with tomatoes and pesto, bocconcini mozzarella, macerated courgettes with lemon zest and marjoram — topped with a few mixed olives. Add chicken, tuna or egg to complete.',
      build:{Beans:['Cannellini','Tomato','Pesto'],Veg:['Roasted peppers','Red onion','Courgettes'],Add:['Chicken','Tuna','Egg']}},
    {id:'small', name:'The Small', price:'', asset:'salad-small',
      shot:'The Small · green side',
      blurb:'A light green side salad with Mrs H\u2019s dressing.',
      build:{Base:['Baby gem','Red & green leaves'],Dress:['Mrs H\u2019s dressing']}},
  ]
};

/* map each dish to its media: real photo if we have one, else a tone frame */
Object.values(MENU).flat().forEach((d)=>{
  if(IMAGES[d.asset])      ASSETS[d.asset]={ img: IMAGES[d.asset] };
  else if(d.tone && !ASSETS[d.asset]) ASSETS[d.asset]={ tone: d.tone };
});

const rail=document.getElementById('rail');
const detail=document.getElementById('detail');
let current={tab:'pasta',dish:'pappardelle'};

function renderRail(){
  const items=MENU[current.tab];
  rail.innerHTML=items.map(d=>`
    <article class="dish" data-dish="${d.id}" aria-current="${d.id===current.dish}">
      <div class="media" data-type="image" data-shot="${d.shot}" data-asset="${d.asset}"></div>
      <div class="dish-cap"><h3>${d.name}</h3>${d.price?`<span class="price">${d.price}</span>`:''}</div>
    </article>`).join('');
  hydrate(rail);
  rail.querySelectorAll('.dish').forEach(el=>{
    el.addEventListener('click',()=>{ current.dish=el.dataset.dish; renderRail(); renderDetail(); });
  });
}

function renderDetail(){
  const d=MENU[current.tab].find(x=>x.id===current.dish)||MENU[current.tab][0];
  current.dish=d.id;
  detail.innerHTML=`
    <div class="media" data-type="image" data-shot="${d.shot}" data-asset="${d.asset}"></div>
    <div class="detail-body">
      <h3>${d.name}</h3>
      ${d.price?`<span class="price">${d.price}</span>`:''}
      <p>${d.blurb}</p>
      <div class="build">
        ${Object.entries(d.build).map(([k,v])=>`
          <div><h5>${k}</h5><ol>${v.map((x,i)=>`<li>${i+1}. ${x}</li>`).join('')}</ol></div>`).join('')}
      </div>
      <a class="btn" href="https://notto-to-go.square.site">Order ${d.name.toLowerCase()}</a>
      <p class="allerg">Allergen and nutrition information — <a href="#">full breakdown</a>.</p>
    </div>`;
  hydrate(detail);
}

document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected','false'));
    t.setAttribute('aria-selected','true');
    current.tab=t.dataset.tab;
    current.dish=MENU[current.tab][0].id;
    renderRail(); renderDetail();
  });
});

// sync the tab underline to whichever tab is featured by default
document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected', String(t.dataset.tab===current.tab)));
renderRail(); renderDetail();
