// import { fillProfile } from "../index.js";

// Функции открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
  
  document.addEventListener('keydown', escapeListener);
}

// Функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');

    popup.addEventListener('transitionend', function handler() {
      popup.classList.remove('popup_is-animated');
      popup.removeEventListener('transitionend', handler);
    }, { once: true});
    
    document.removeEventListener('keydown', escapeListener);
}

// Обработчик Escape
function escapeListener(event) {
      if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
          closePopup(openedPopup);
        }
      }
    }

