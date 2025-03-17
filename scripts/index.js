// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое темплейта

const placesList = document.querySelector('.places__list'); // куда будем добавлять элементы 

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard (initialCards) {
    const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонированирую элемент темплейта
    placesList.append(placeElement); // добавляю темплейт
    placeElement.querySelector('.card__image').src = initialCards.link; // заполнить src у card__image
    placeElement.querySelector('.card__title').textContent = initialCards.name; // заполнить textContent у card__title
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); // обработчик клика для кнопки удаления
}

// initialCards.forEach(function (item) {
//     const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true); 
//     placesList.append(placeElement); 
//     placeElement.querySelector('.card__image').src = item.link; 
//     placeElement.querySelector('.card__title').textContent = item.name; 
//     placeElement.querySelector('.card__delete-button').addEventListener('click', deleteCard); 
// });

// @todo: Функция удаления карточки

function deleteCard (initialCards) {
    const placeElement = document.querySelector('.places__item');
    placeElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(createCard);
