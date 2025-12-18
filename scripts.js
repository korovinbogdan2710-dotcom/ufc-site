const cards = document.getElementById('cards');
const addFighterBtn = document.getElementById('addFighterBtn');
const modal = document.getElementById('modal');
const fighterForm = document.getElementById('fighterForm');
const closeModal = document.getElementById('closeModal');
const searchInput = document.getElementById('search');
const weightFilter = document.getElementById('weightFilter');
const sortBy = document.getElementById('sortBy');
const darkToggle = document.getElementById('darkToggle');

let fighters = JSON.parse(localStorage.getItem('ufc_fighters_v2') || '[]');

// helper functions
const save = () => localStorage.setItem('ufc_fighters_v2', JSON.stringify(fighters));
const uid = () => Math.random().toString(36).slice(2, 9);

// sample data
if(!fighters.length){
  fighters = [
    {id: uid(), name:'Иван Петров', country:'RU', weight:'heavy', rating:85, photo:''},
    {id: uid(), name:'Miguel Santos', country:'BR', weight:'welter', rating:78, photo:''},
    {id: uid(), name:'Lee Chan', country:'KR', weight:'light', rating:90, photo:''}
  ];
  save();
}

// render cards
function render() {
  const q = searchInput.value.toLowerCase();
  const weight = weightFilter.value;
  const sort = sortBy.value;
  let list = fighters.slice();
  if(weight !== 'all') list = list.filter(f => f.weight === weight);
  if(q) list = list.filter(f => f.name.toLowerCase().includes(q));
  if(sort === 'name') list.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort === 'rating') list.sort((a,b)=>b.rating-a.rating);

  cards.innerHTML = '';
  list.forEach((f,i)=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.innerHTML = `
      <img class="photo" src="${f.photo || 'https://via.placeholder.com/400x240?text=Fighter'}" alt="${f.name}">
      <h4>${f.name} <span class="badge">${f.weight}</span></h4>
      <p>${f.country} • Рейтинг: ${f.rating || '—'}</p>
      <div style="margin-top:8px;display:flex;gap:8px;">
        <button class="btn" data-id="${f.id}" data-act="edit">Редактировать</button>
        <button class="btn" data-id="${f.id}" data-act="del">Удалить</button>
      </div>
    `;
    cards.appendChild(el);

    // Новогоднее плавное появление с задержкой
    setTimeout(() => {
      el.style.transition = 'all 0.5s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, i*100);
  });
}

// events
addFighterBtn.addEventListener('click', ()=> modal.classList.remove('hidden'));
closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
searchInput.addEventListener('input', render);
weightFilter.addEventListener('change', render);
sortBy.addEventListener('change', render);
darkToggle.addEventListener('click', ()=> document.body.classList.toggle('dark'));

cards.addEventListener('click', e=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const id = btn.dataset.id;
  const act = btn.dataset.act;
  if(act === 'del'){
    fighters = fighters.filter(f=>f.id!==id); save(); render();
  }
  if(act === 'edit'){
    const f = fighters.find(x=>x.id===id);
    if(!f) return;
    modal.classList.remove('hidden');
    fighterForm.name.value = f.name;
    fighterForm.country.value = f.country;
    fighterForm.weight.value = f.weight;
    fighterForm.rating.value = f.rating;
    fighterForm.photo.value = f.photo;
    fighterForm.dataset.editId = id;
  }
});

fighterForm.addEventListener('submit', e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(fighterForm).entries());
  if(fighterForm.dataset.editId){
    const id = fighterForm.dataset.editId;
    const idx = fighters.findIndex(x=>x.id===id);
    fighters[idx] = {...fighters[idx], ...data, rating: Number(data.rating||0)};
    delete fighterForm.dataset.editId;
  } else {
    fighters.push({id:uid(), name:data.name, country:data.country, weight:data.weight, rating:Number(data.rating||0), photo:data.photo});
  }
  fighterForm.reset();
  modal.classList.add('hidden');
  save();
  render();
});

modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.add('hidden'); });

render();

/* === СНЕГ на странице === */
function createSnowflake(){
  const s=document.createElement("div");
  s.className="snowflake";
  s.innerHTML="❄️";
  const size=8+Math.random()*22;
  s.style.fontSize=size+"px";
  s.style.left=Math.random()*window.innerWidth+"px";
  s.style.opacity=0.3+Math.random()*0.7;
  const duration=4+Math.random()*6;
  s.style.transition=`transform ${duration}s linear, opacity ${duration}s linear`;
  document.body.appendChild(s);
  requestAnimationFrame(()=>{
    s.style.transform=`translateY(${window.innerHeight+30}px) translateX(${Math.random()*100-50}px)`;
    s.style.opacity=0;
  });
  setTimeout(()=>s.remove(), duration*1000);
}
setInterval(createSnowflake, 150);

/* === Анимация главного экрана (если есть hero) === */
const heroTitle = document.querySelector('.hero-newyear h1');
if(heroTitle){
  heroTitle.style.transition = 'text-shadow 2s ease-in-out';
  setInterval(()=> {
    heroTitle.style.textShadow = '0 0 35px #4fc3f7';
    setTimeout(()=> heroTitle.style.textShadow='0 0 20px #4fc3f7',1000);
  },2000);
}

document.querySelector('.hero-btn').addEventListener('click', function(e){
  e.preventDefault(); // отменяем стандартное поведение ссылки

  // Находим кнопку вкладки "Бои"
  const fightsTab = document.querySelector('.tab-btn[data-tab="fights"]');
  if(fightsTab){
    fightsTab.click(); // Симулируем клик по вкладке
    // Плавный скролл до секции
    const fightsSection = document.getElementById('fights');
    if(fightsSection){
      fightsSection.scrollIntoView({behavior: 'smooth'});
    }
  }
});
