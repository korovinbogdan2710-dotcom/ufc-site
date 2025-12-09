/// SCROLL
function scrollToFights() {
    document.getElementById("fights").scrollIntoView({ behavior: "smooth" });
}

// DATA
let fights = [];
let fighters = [];
let news = [];

const modal = document.getElementById("modal-container");

// RENDER FUNCTIONS
function renderFights() {
    const block = document.getElementById("fightsList");
    block.innerHTML = "";
    fights.forEach((f, i) => {
        block.innerHTML += `
            <div class="card">
                <h3>${f.title}</h3>
                <p>${f.date}</p>
                <button class="edit-btn" onclick="editFight(${i})">Редактировать</button>
                <button class="del-btn" onclick="deleteFight(${i})">Удалить</button>
            </div>`;
    });
}
function renderFighters() {
    const block = document.getElementById("fightersList");
    block.innerHTML = "";
    fighters.forEach((f, i) => {
        block.innerHTML += `
            <div class="card">
                <h3>${f.name}</h3>
                <p>${f.record}</p>
                <button class="edit-btn" onclick="editFighter(${i})">Редактировать</button>
                <button class="del-btn" onclick="deleteFighter(${i})">Удалить</button>
            </div>`;
    });
}
function renderNews() {
    const block = document.getElementById("newsList");
    block.innerHTML = "";
    news.forEach((n, i) => {
        block.innerHTML += `
            <div class="news-item">
                <h3>${n.title}</h3>
                <p>${n.text}</p>
                <button class="del-btn" onclick="deleteNews(${i})">Удалить</button>
            </div>`;
    });
}

// FIGHTS
function openFightModal() {
    modal.innerHTML = `
        <div class="modal-bg" onclick="closeModal()">
            <div class="modal" onclick="event.stopPropagation()">
                <h3>Добавить бой</h3>
                <input id="fight-title" placeholder="Название (Ф.Фигерейдо vs М.Коста)">
                <input id="fight-date" placeholder="Дата: 2025-01-01">
                <button class="add-btn" onclick="addFight()">Добавить</button>
            </div>
        </div>`;
}

function addFight() {
    fights.push({
        title: document.getElementById("fight-title").value,
        date: document.getElementById("fight-date").value
    });
    closeModal();
    renderFights();
}

function deleteFight(i) {
    fights.splice(i, 1);
    renderFights();
}

// FIGHTERS
function openFighterModal() {
    modal.innerHTML = `
        <div class="modal-bg" onclick="closeModal()">
            <div class="modal" onclick="event.stopPropagation()">
                <h3>Добавить бойца</h3>
                <input id="fighter-name" placeholder="Имя">
                <input id="fighter-record" placeholder="Рекорд: 10-1-0">
                <button class="add-btn" onclick="addFighter()">Добавить</button>
            </div>
        </div>`;
}
function addFighter() {
    fighters.push({
        name: document.getElementById("fighter-name").value,
        record: document.getElementById("fighter-record").value
    });
    closeModal();
    renderFighters();
}

function deleteFighter(i) {
    fighters.splice(i, 1);
    renderFighters();
}

// NEWS
function openNewsModal() {
    modal.innerHTML = `
        <div class="modal-bg" onclick="closeModal()">
            <div class="modal" onclick="event.stopPropagation()">
                <h3>Добавить новость</h3>
                <input id="news-title" placeholder="Заголовок">
                <textarea id="news-text" placeholder="Текст"></textarea>
                <button class="add-btn" onclick="addNews()">Добавить</button>
            </div>
        </div>`;
}

function addNews() {
    news.push({
        title: document.getElementById("news-title").value,
        text: document.getElementById("news-text").value
    });
    closeModal();
    renderNews();
}

function deleteNews(i) {
    news.splice(i, 1);
    renderNews();
}

// CLOSE
function closeModal() {
    modal.innerHTML = "";
}

// INITIAL
renderFights();
renderFighters();
renderNews();
