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

let isAdmin = false; // по умолчанию не админ
const adminPassword = "q112233445566W"; // твой пароль

// ===== ФУНКЦИИ ОТОБРАЖЕНИЯ =====
function displayFighters(list = fighters) {
    const container = document.getElementById('fighters-list');
    container.innerHTML = '';
    list.forEach((f, index) => {
        const div = document.createElement('div');
        div.classList.add('fighter-card');
        div.innerHTML = `
            <img src="${f.photo}" alt="${f.name}">
            <h3>${f.name}</h3>
            <p>Вес: ${f.weight}</p>
            <p>Страна: ${f.country}</p>
            ${isAdmin ? `<button onclick="deleteFighter(${index})">Удалить</button>` : ''}
        `;
        container.appendChild(div);
    });
}

function displayMatches() {
    const container = document.getElementById('matches-list');
    container.innerHTML = '';
    matches.forEach((m, index) => {
        const div = document.createElement('div');
        div.classList.add('match');
        div.innerHTML = `
            <p><strong>${m.fighter1}</strong> vs <strong>${m.fighter2}</strong></p>
            <p>Дата: ${m.date}</p>
            ${isAdmin ? `<button onclick="deleteMatch(${index})">Удалить</button>` : ''}
        `;
        container.appendChild(div);
    });
}

function displayResults() {
    const container = document.getElementById('results-list');
    container.innerHTML = '';
    results.forEach((r, index) => {
        const div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = `
            <p>${r.match}</p>
            <p>Победитель: <strong>${r.winner}</strong></p>
            ${isAdmin ? `<button onclick="deleteResult(${index})">Удалить</button>` : ''}
        `;
        container.appendChild(div);
    });
}

// ===== ФУНКЦИИ УДАЛЕНИЯ =====
function deleteFighter(index) {
    if(!isAdmin) return;
    if(confirm(`Удалить бойца ${fighters[index].name}?`)) {
        fighters.splice(index, 1);
        displayFighters();
    }
}

function deleteMatch(index) {
    if(!isAdmin) return;
    if(confirm(`Удалить матч ${matches[index].fighter1} vs ${matches[index].fighter2}?`)) {
        matches.splice(index, 1);
        displayMatches();
    }
}

function deleteResult(index) {
    if(!isAdmin) return;
    if(confirm(`Удалить результат ${results[index].match}?`)) {
        results.splice(index, 1);
        displayResults();
    }
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

// ===== ВХОД АДМИНА ЧЕРЕЗ КЛАВИШУ X =====
document.addEventListener('keydown', (e) => {
    if(e.key.toLowerCase() === 'x' && !isAdmin){
        const inputPass = prompt("Введите пароль для входа в систему администратора:");
        if(inputPass === adminPassword){
            isAdmin = true;
            alert("Вы вошли как админ! Формы редактирования видны.");
            document.getElementById('add-match-form').style.display = "block";
            document.getElementById('add-result-form').style.display = "block";
            displayFighters();
            displayMatches();
            displayResults();
        } else {
            alert("Неверный пароль! Доступ запрещён.");
        }
    }
});

// ===== ДОБАВЛЕНИЕ ДАННЫХ =====
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

document.getElementById('add-match-form').addEventListener('submit', e => {
    if(!isAdmin) return;
    e.preventDefault();
    const fighter1 = document.getElementById('match-fighter1').value;
    const fighter2 = document.getElementById('match-fighter2').value;
    const date = document.getElementById('match-date').value;
    matches.push({fighter1, fighter2, date});
    displayMatches();
    e.target.reset();
});

document.getElementById('add-result-form').addEventListener('submit', e => {
    if(!isAdmin) return;
    e.preventDefault();
    const match = document.getElementById('result-match').value;
    const winner = document.getElementById('result-winner').value;
    results.push({match, winner});
    displayResults();
    e.target.reset();
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
displayFighters();
displayMatches();
displayResults();
