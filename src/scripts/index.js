import '../pages/index.css';
// import { initialCards } from './components/cards.js'; 
import { createCard, deleteCard, likeCard } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';

// Глобальные DOM элементы
const placesList = document.querySelector('.places__list'); // куда будем добавлять элементы 
const editProfilePopup = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const newCardPopup = document.querySelector('.popup_type_new-card'); // попап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // попап раскрытой картинки
const popupImage = document.querySelector('.popup__image');
const allPopups = document.querySelectorAll('.popup'); // все попапы
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');  
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

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

  // Функция заполнения профиля
  function fillProfile() {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
  };

// Функция расскрытия картинки
function imageClick (item) {
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

// Инициализация при загрузке в DOM

document.addEventListener('DOMContentLoaded', function() { 

// Начальные карточки

initialCards.forEach(renderCard);  

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
      openPopup(editProfilePopup);
      fillProfile();
    });

    // Слушатель добавления карточки
    addCardButton.addEventListener('click', function() {
      openPopup(newCardPopup);
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
      const newPlace = {
        name: placeNameInput.value, 
        link: placeLinkInput.value
      }
      placeNameInput.value = '';
      placeLinkInput.value = '';
      renderCard(newPlace);
      closePopup(this);
    }

    newCardPopup.addEventListener('submit', handleAddCardFormSubmit);

  });

  // ПР7

  const popupForm = document.querySelector('.popup__form');
  const popupInput = popupForm.querySelector('.popup__input');
  const popupError = popupForm.querySelector(`.${popupInput.id}-error`);

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    formElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active')
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  // const checkInputValidity = (formElement, inputElement) => {
  //   if (inputElement.validity.patternMismatch) {
  //     inputElement.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы");
  //     showInputError(formElement, inputElement, inputElement.validationMessage);
  //   } else {
  //     inputElement.setCustomValidity("");
  //     hideInputError(formElement, inputElement);
  //   }
  // };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
      });
    });
  };

  const enableValidation = () => {
    let formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      // formElement.addEventListener('submit', (evt) => {
      //   evt.preventDefault();
      // });
      setEventListeners(formElement);
    });
  };

  enableValidation({
    formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  });