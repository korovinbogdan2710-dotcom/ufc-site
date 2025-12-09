// ===== Бойцы =====
let fighters = [
    {name:'Максим', photo:'images/max.jpg', weight:'Легкий'},
    {name:'Никита', photo:'images/nikita.jpg', weight:'Легкий'}
];

// ===== Матчи =====
let matches = [
    {fighter1:'Максим', fighter2:'Никита', date:'2025-12-12'}
];

// ===== Результаты =====
let results = [
    {match:'Максим vs Никита', winner:'Максим'}
];

// ===== Функции отображения =====
function displayFighters(){
    const container=document.getElementById('fighters-list');
    container.innerHTML='';
    fighters.forEach(f=>{
        const div=document.createElement('div');
        div.classList.add('fighter-card');
        div.innerHTML=`<img src="${f.photo}" alt="${f.name}"><h3>${f.name}</h3><p>Вес: ${f.weight}</p>`;
        container.appendChild(div);
    });
}

function displayMatches(){
    const container=document.getElementById('matches-list');
    container.innerHTML='';
    matches.forEach(m=>{
        const div=document.createElement('div');
        div.classList.add('match');
        div.innerHTML=`<p><strong>${m.fighter1}</strong> vs <strong>${m.fighter2}</strong></p><p>Дата: ${m.date}</p>`;
        container.appendChild(div);
    });
}

function displayResults(){
    const container=document.getElementById('results-list');
    container.innerHTML='';
    results.forEach(r=>{
        const div=document.createElement('div');
        div.classList.add('result');
        div.innerHTML=`<p>${r.match}</p><p>Победитель: <strong>${r.winner}</strong></p>`;
        container.appendChild(div);
    });
}

// ===== Переключение вкладок =====
const tabs=document.querySelectorAll('nav ul.tabs li');
const contents=document.querySelectorAll('.tab-content');

tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        contents.forEach(c=>c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// ===== Запуск отображения данных =====
displayFighters();
displayMatches();
displayResults();
