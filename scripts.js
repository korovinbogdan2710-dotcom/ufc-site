let fights = [
    {fighter1: 'Конор Макгрегор', fighter2: 'Хабиб Нурмагомедов', date: '2025-12-12'},
    {fighter1: 'Джон Джонс', fighter2: 'Стипе Миочич', date: '2025-12-15'}
];

function displayFights() {
    const fightList = document.getElementById('fight-list');
    fightList.innerHTML = '';
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

displayFights();
