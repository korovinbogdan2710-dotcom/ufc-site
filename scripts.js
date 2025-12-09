// ===== ДАННЫЕ =====
let fighters = [
    {name: 'Максим', photo: 'images/max.jpg', weight: 'Легкий', country: 'Россия'},
    {name: 'Никита', photo: 'images/nikita.jpg', weight: 'Легкий', country: 'Россия'}
];

let matches = [
    {fighter1: 'Максим', fighter2: 'Никита', date: '2025-12-12'}
];

let results = [
    {match: 'Максим vs Никита', winner: 'Максим'}
];

// ===== ФУНКЦИИ ОТОБРАЖЕНИЯ =====
function displayFighters(list = fighters) {
    const container = document.getElementById('fighters-list');
    container.innerHTML = '';
    list.forEach(f => {
        const div = document.createElement('div');
        div.classList.add('fighter-card');
        div.innerHTML = `
            <img src="${f.photo}" alt="${f.name}">
            <h3>${f.name}</h3>
            <p>Вес: ${f.weight}</p>
            <p>Страна: ${f.country}</p>
        `;
        container.appendChild(div);
    });
}

function displayMatches() {
    const container = document.getElementById('matches-list');
    container.innerHTML = '';
    matches.forEach(m => {
        const div = document.createElement('div');
        div.classList.add('match');
        div.innerHTML = `
            <p><strong>${m.fighter1}</strong> vs <strong>${m.fighter2}</strong></p>
            <p>Дата: ${m.date}</p>
        `;
        container.appendChild(div);
    });
}

function displayResults() {
    const container = document.getElementById('results-list');
    container.innerHTML = '';
    results.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = `
            <p>${r.match}</p>
            <p>Победитель: <strong>${r.winner}</strong></p>
        `;
        container.appendChild(div);
    });
}

// ===== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК =====
const tabs = document.querySelectorAll('nav ul.tabs li');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// ===== ДОБАВЛЕНИЕ НОВЫХ БОЙЦОВ =====
document.getElementById('add-fighter-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fighter-name').value;
    const weight = document.getElementById('fighter-weight').value;
    const country = document.getElementById('fighter-country').value;
    const photo = document.getElementById('fighter-photo').value;
    fighters.push({name, weight, country, photo});
    displayFighters();
    e.target.reset();
});

// ===== ДОБАВЛЕНИЕ МАТЧЕЙ =====
document.getElementById('add-match-form').addEventListener('submit', e => {
    e.preventDefault();
    const fighter1 = document.getElementById('match-fighter1').value;
    const fighter2 = document.getElementById('match-fighter2').value;
    const date = document.getElementById('match-date').value;
    matches.push({fighter1, fighter2, date});
    displayMatches();
    e.target.reset();
});

// ===== ДОБАВЛЕНИЕ РЕЗУЛЬТАТОВ =====
document.getElementById('add-result-form').addEventListener('submit', e => {
    e.preventDefault();
    const match = document.getElementById('result-match').value;
    const winner = document.getElementById('result-winner').value;
    results.push({match, winner});
    displayResults();
    e.target.reset();
});

// ===== ПОИСК И ФИЛЬТР БОЙЦОВ =====
document.getElementById('search-fighter').addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    displayFighters(fighters.filter(f => f.name.toLowerCase().includes(value)));
});

document.getElementById('filter-weight').addEventListener('change', e => {
    const value = e.target.value;
    displayFighters(value ? fighters.filter(f => f.weight === value) : fighters);
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
displayFighters();
displayMatches();
displayResults();
