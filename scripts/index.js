// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое темплейта

const cardElement = cardTemplate.querySelector('.places__item card').cloneNode(true); // клонированируем элемент темплейта

// @todo: DOM узлы

const content = document.querySelector('.content');


const imageElement = document.createElement('img');
imageElement.classList.add('card__image');

const deleteButtonElement = document.createElement('button');
deleteButtonElement.classList.add('card__delete-button');

const titleElement = document.createElement('h2');
titleElement.classList.add('card__title');

const likeButtonElement = document.createElement('button');
likeButtonElement.classList.add('card__like-button');


// @todo: Функция создания карточки

function createCard() {

}

// @todo: Функция удаления карточки



// @todo: Вывести карточки на страницу
