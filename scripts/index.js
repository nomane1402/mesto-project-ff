// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое темплейта

const placesList = document.querySelector('.places__list'); // куда будем добавлять элементы 

// @todo: DOM узлы



// @todo: Функция создания карточки

function createCard (item) {
    const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонированирую элемент темплейта
    placesList.append(placeElement); // добавляю темплейт
    placeElement.querySelector('.card__image').src = item.link; // заполнить src у card__image
    placeElement.querySelector('.card__image').alt = "Фото места " + item.name;
    placeElement.querySelector('.card__title').textContent = item.name; // заполнить textContent у card__title
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); // обработчик клика для кнопки удаления
}

// @todo: Функция удаления карточки

function deleteCard (event) {
    const cardElement = event.target.closest('.places__item');
    cardElement.remove();
}

// @todo: Функция вставки карточки на страницу



// @todo: Вывести карточки на страницу

initialCards.forEach(createCard);

const test = {
    name : "test",
    link : "https://images.unsplash.com/photo-1725980457213-e718a2b7bb5a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}

createCard(test);