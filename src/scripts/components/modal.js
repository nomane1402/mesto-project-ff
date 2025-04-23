
// Функции открытия попапа
export function openPopup(popup) {
    if (popup === document.querySelector('.popup_type_edit')) {
        fillProfile();
    }
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', escapeListener);
    }

// Функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
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

// Функция заполнения профиля
function fillProfile() {
    const currentName = document.querySelector('.profile__title');
    const currentJob = document.querySelector('.profile__description');
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_description');
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
  };