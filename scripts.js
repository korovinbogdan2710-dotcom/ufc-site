function addFighter() {
    const nameInput = document.getElementById('fighter-name');
    const name = nameInput.value.trim();
    if (name === "") {
        alert("Введите имя бойца!");
        return;
    }

    const li = document.createElement('li');
    li.textContent = name;

    const list = document.getElementById('fighter-list');
    list.appendChild(li);

    nameInput.value = "";
}
