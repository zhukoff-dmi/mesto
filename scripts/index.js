import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
};

// Тимплейт карточки
// const templateCard = document.querySelector('#template-card').content;
// const elementCard = templateCard.querySelector('.card').cloneNode(true);

// const createCard = (cardLink, cardName) => {
//     const elementCard = templateCard.querySelector('.card').cloneNode(true);

//     //Атрибуты карточки
//     const imageCard = elementCard.querySelector('.card__photo');
//     const titleCard = elementCard.querySelector('.card__title');

//     imageCard.src = cardLink;
//     imageCard.alt = cardName;
//     titleCard.textContent = cardName;

//     //Лайк
//     elementCard.querySelector('.card__like').addEventListener('click', function (event) {
//         event.target.classList.toggle('card__like_active');
//     });

//     //Удаление 
//     elementCard.querySelector('.card__delete-button').addEventListener('click', function () {
//         elementCard.remove();
//     });

//     //открытие картинки на весь экран
//     imageCard.addEventListener('click', function () {
//         openPopup(popupImage);

//         imagePlace.src = cardLink;
//         imagePlace.alt = cardName;
//         imageCaption.textContent = cardName;
//     });

//     return elementCard;
// };

//Добавление карточек на страницу
const cardsContainer = document.querySelector('.cards');

const getCard = (item) => {
    const card = new Card(item, '#template-card', imageOpenPopup);
    const elementCard = card.generateCard();
    return elementCard;
};

function createCard(item) {
    const newCard = getCard(item);
    addCard(newCard);
};

const addCard = (newCard) => {
    cardsContainer.prepend(newCard);
}

initialCards.forEach(createCard);

//popup картинки
const popupImage = document.querySelector('.popup_image');
const imagePlace = document.querySelector('.popup__image-place');
const imageCaption = document.querySelector('.popup__image-caption');

function imageOpenPopup(title, link) {
    imagePlace.src = link;
    imagePlace.alt = title;
    imageCaption.textContent = title;

    openPopup(popupImage);
}

//popup карточки
const profileAddButtonCard = document.querySelector('.profile__add-button');
const popupAddFormCard = document.querySelector('.popup_add-card');
const titleCardInput = popupAddFormCard.querySelector('.popup__input_type_title');
const linkCardInput = popupAddFormCard.querySelector('.popup__input_type_link');
const formCardElement = popupAddFormCard.querySelector('.popup__form-card');

const inputElementAddCardFiled = Array.from(formCardElement.querySelectorAll('.popup__input'))
const buttonActiveAddCard = formCardElement.querySelector('.popup__save-button');

profileAddButtonCard.addEventListener('click', function () {
    openPopup(popupAddFormCard);
    formCardElement.reset();
    newCardFoemValidation.resetValidation();
});

//Отправка формы закрытия popup карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    
    const formValues = {
    link: linkCardInput.value,
    name: titleCardInput.value,
    };

    createCard(formValues);

    closePopup(popupAddFormCard);
};

formCardElement.addEventListener('submit', handleCardFormSubmit);


const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeButtons = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__form-profile');
const nameProfileInput = formElement.querySelector('.popup__input_type_name');
const jobProfileInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


//Зaкрытие popup на overlay 
function closePopupClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    };
};
popupEditProfile.addEventListener('click', closePopupClickOverlay);
popupImage.addEventListener('click', closePopupClickOverlay);
popupAddFormCard.addEventListener('click', closePopupClickOverlay);

//.Открытие popup 
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscButton);
};

//.Закрытие popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscButton);
};

closeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const popup = btn.closest('.popup');
        closePopup(popup);
    });
});

// Закрытие popup по кнопке Esc
function closePopupEscButton(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

//popup профиля
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameProfileInput.value = profileName.textContent;
    jobProfileInput.value = profileDescription.textContent;
    editProfileFormValidation.resetValidation();   
});

//Оправка формы закрытие popup профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileDescription.textContent = jobProfileInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

//создаем экземпляр класса валидации для каждой формы
const editProfileFormValidation = new FormValidator(validationConfig, formElement);
const newCardFoemValidation = new FormValidator(validationConfig, formCardElement);

editProfileFormValidation.enableValidation();
newCardFoemValidation.enableValidation();









