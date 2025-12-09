// ==========================
// ПЕРЕМЕННЫЕ
// ==========================
let fighters = [];
const openModalBtn = document.querySelector('.open-modal');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const saveFighterBtn = document.getElementById('saveFighter');
const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search');
const toggleThemeBtn = document.getElementById('toggleTheme');
const sortCategory = document.getElementById('sortCategory');
const sortStat = document.getElementById('sortStat');

// ==========================
// ТЕМА
// ==========================
toggleThemeBtn.onclick = () => {
  document.body.classList.toggle('light');
};

// ==========================
// МОДАЛЬНОЕ ОКНО
// ==========================
openModalBtn.onclick = () => modal.style.display = 'flex';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target.id==='modal') modal.style.display='none'; };

// ==========================
// ДОБАВЛЕНИЕ БОЙЦА
// ==========================
saveFighterBtn.onclick = () => {
  const name = document.getElementById('fighterName').value;
  const stat = document.getElementById('fighterStat').value;
  const category = document.getElementById('fighterCategory').value;

  if(name && stat) {
    fighters.push({name, stat, category});
    document.getElementById('fighterName').value='';
    document.getElementById('fighterStat').value='';
    modal.style.display='none';
    renderFighters(fighters);
  }
};

// ==========================
// УДАЛЕНИЕ БОЙЦА С АНИМАЦИЕЙ
// ==========================
function deleteFighter(index){
  const card = cardsContainer.children[index];
  card.style.transform='scale(0) rotate(-30deg)';
  card.style.opacity='0';
  setTimeout(()=>{ fighters.splice(index,1); renderFighters(fighters); },300);
}

// ==========================
// РЕНДЕР КАРТОЧЕК
// ==========================
function renderFighters(list){
  cardsContainer.innerHTML='';
  list.forEach((fighter,index)=>{
    const card=document.createElement('div');
    card.classList.add('card');
    card.innerHTML=`
      <h3>${fighter.name}</h3>
      <p>Статистика: ${fighter.stat}</p>
      <p>Категория: ${fighter.category}</p>
      <button class="deleteBtn" onclick="deleteFighter(${index})">Удалить</button>
    `;
    cardsContainer.appendChild(card);
  });
}

// ==========================
// ПОИСК
// ==========================
searchInput.addEventListener('input',()=>{
  const value = searchInput.value.toLowerCase();
  const filtered = fighters.filter(f=>f.name.toLowerCase().includes(value));
  renderFighters(filtered);
});

// ==========================
// ФИЛЬТР ПО КАТЕГОРИИ
// ==========================
sortCategory.addEventListener('change',()=>{
  filterAndSort();
});

// ==========================
// СОРТИРОВКА ПО СТАТИСТИКЕ
// ==========================
sortStat.addEventListener('change',()=>{
  filterAndSort();
});

function filterAndSort(){
  let filtered = [...fighters];
  const cat = sortCategory.value;
  if(cat!=='all') filtered=filtered.filter(f=>f.category===cat);
  const sortType = sortStat.value;
  if(sortType==='asc'){
    filtered.sort((a,b)=>parseFloat(a.stat.split('-')[0])-parseFloat(b.stat.split('-')[0]));
  } else if(sortType==='desc'){
    filtered.sort((a,b)=>parseFloat(b.stat.split('-')[0])-parseFloat(a.stat.split('-')[0]));
  }
  renderFighters(filtered);
}

// ==========================
// ИНИЦИАЛЬНЫЕ БОЙЦЫ
// ==========================
fighters.push({name:"Хабиб Нурмагомедов", stat:"29-0", category:"Лёгкий вес"});
fighters.push({name:"Конор МакГрегор", stat:"22-6", category:"Лёгкий вес"});
fighters.push({name:"Джон Джонс", stat:"27-1", category:"Средний вес"});
renderFighters(fighters);

// ==========================
// ЧАСТИЦЫ НА ФОНЕ
// ==========================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*3+1, speed:Math.random()*1+0.2});
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.6)';
    ctx.fill();
    p.y-=p.speed;
    if(p.y<0)p.y=canvas.height;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
