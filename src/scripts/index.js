import '../pages/index.css';
// import { initialCards } from './components/cards.js'; 
import { createCard, deleteCard, likeCard } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';

document.addEventListener('DOMContentLoaded', function() {

// Элементы карточек 

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// DOM элементы
// const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое темплейта
const placesList = document.querySelector('.places__list'); // куда будем добавлять элементы 

    // Элементы попапов
    const editProfilePopup = document.querySelector('.popup_type_edit');
    const newCardPopup = document.querySelector('.popup_type_new-card');
    const allPopups = document.querySelectorAll('.popup');
    const currentName = document.querySelector('.profile__title');
    const currentJob = document.querySelector('.profile__description');
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');

    // Кнопки
    const editProfileButton = document.querySelector('.profile__edit-button');
    const addCardButton = document.querySelector('.profile__add-button');
    const closeButtons = document.querySelectorAll('.popup__close');
  

// Функция расскрытия картинки
function imageClick (item) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;

  openPopup(imagePopup);
}

// @todo: Функция вставки карточки на страницу

function renderCard (cardData) {
    const cardElement = createCard(
      cardData,
      likeCard,
      deleteCard,
      imageClick
    );
    placesList.prepend(cardElement); // добавляю темплейт
}

// @todo: Вывести карточки на страницу

initialCards.forEach(renderCard);  

// Спринт 6

    // Обработчик Overlay
    function overlayClick(event) {
      if (event.target === this) {
        closePopup(this);
      }
    }

    // Слушатель Overlay
    allPopups.forEach(function (popup) {
      popup.addEventListener('click', overlayClick);
    });

    // Слушатель редактирования профиля
    editProfileButton.addEventListener('click', function(){
      openPopup(editProfilePopup)
    });

    // Слушатель добавления карточки
    addCardButton.addEventListener('click', function() {
      openPopup(newCardPopup)
    });
    
    // Закрытие попапа по нажатию на крестик
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const popup = button.closest('.popup');
        closePopup(popup);
      });
    });
    
    // Обработчик события submit Edit Profile Form
    function handleEditProfileFormSubmit(evt) {
      evt.preventDefault();
      const newName = nameInput.value;
      const newJob = jobInput.value;
      currentName.textContent = newName;
      currentJob.textContent = newJob;
      closePopup(this);
    }

    editProfilePopup.addEventListener('submit', handleEditProfileFormSubmit);

    // Обработчик события submit Add Card Form
    function handleAddCardFormSubmit(evt) {
      evt.preventDefault();
      const placeName = document.querySelector('.popup__input_type_card-name');
      const placeLink = document.querySelector('.popup__input_type_url');  
      const newPlace = {
        name: placeName.value, 
        link: placeLink.value
      }
      placeName.value = '';
      placeLink.value = '';
      renderCard(newPlace);
      closePopup(this);
    }

    newCardPopup.addEventListener('submit', handleAddCardFormSubmit);

  });