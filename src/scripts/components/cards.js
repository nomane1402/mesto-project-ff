// Функция создания карточки

export function createCard (item, likeHandler, deleteHandler, expandPicture) {
  const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое темплейта
  const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонированирую элемент темплейта
  const cardImage = placeElement.querySelector('.card__image');
  
  cardImage.src = item.link;
  cardImage.alt = "Фото места " + item.name;
  placeElement.querySelector('.card__title').textContent = item.name; // заполнить textContent у card__title
  placeElement.querySelector('.card__delete-button').addEventListener('click', (event) => {deleteHandler(event)}); // обработчик клика для кнопки удаления
  placeElement.querySelector('.card__like-button').addEventListener('click', likeHandler);

  cardImage.addEventListener('click', () => expandPicture(item));

  return placeElement;
}

// Функция удаления карточки

export function deleteCard (event) {
  const cardElement = event.target.closest('.places__item');
  if (cardElement) {
    cardElement.remove();
  }
}

// Функция лайка карточки
export function likeCard (event) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
}
