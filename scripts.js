// Данные для боев UFC
let fights = [
    {fighter1: 'Конор Макгрегор', fighter2: 'Хабиб Нурмагомедов', date: '2025-12-12'},
    {fighter1: 'Джон Джонс', fighter2: 'Стипе Миочич', date: '2025-12-15'}
];

// Функция для отображения боев
function displayFights() {
    const fightList = document.getElementById('fight-list');
    fightList.innerHTML = ''; // Очистить список

    fights.forEach(fight => {
        const fightItem = document.createElement('div');
        fightItem.classList.add('fight');
        fightItem.innerHTML = `
            <p><strong>${fight.fighter1}</strong> vs <strong>${fight.fighter2}</strong></p>
            <p>Дата: ${fight.date}</p>
        `;
        fightList.appendChild(fightItem);
    });
}

// Функция для добавления нового боя
document.getElementById('fight-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fighter1 = document.getElementById('fighter1').value;
    const fighter2 = document.getElementById('fighter2').value;
    const date = document.getElementById('date').value;

    if (fighter1 && fighter2 && date) {
        fights.push({fighter1, fighter2, date});
        alert('Бой добавлен!');
        displayFights();
    } else {
        alert('Заполните все поля!');
    }
});

// Запускаем отображение боев при загрузке страницы
if (document.getElementById('fight-list')) {
    displayFights();
}
