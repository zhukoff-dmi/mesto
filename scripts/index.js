const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_visible',
    typeError: 'popup__input_type_error',
};

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

const cardInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});

// Тимплейт карточки
const templateCard = document.querySelector('#template-card').content;
const elementCard = templateCard.querySelector('.card').cloneNode(true);

const createCard = (cardLink, cardName) => {
    const elementCard = templateCard.querySelector('.card').cloneNode(true);

    //Атрибуты карточки
    const imageCard = elementCard.querySelector('.card__photo');
    const titleCard = elementCard.querySelector('.card__title');

    imageCard.src = cardLink;
    imageCard.alt = cardName;
    titleCard.textContent = cardName;

    //Лайк
    elementCard.querySelector('.card__like').addEventListener('click', function (event) {
        event.target.classList.toggle('card__like_active');
    });

    //Удаление 
    elementCard.querySelector('.card__delete-button').addEventListener('click', function () {
        elementCard.remove();
    });

    //открытие картинки на весь экран
    elementCard.querySelector('.card__photo').addEventListener('click', function () {
        openPopup(popupImage);

        imagePlace.src = cardLink;
        imagePlace.alt = cardName;
        imageCaption.textContent = cardName;
    });

    return elementCard;
};
//Добавление карточек на страницу
const cardsContainer = document.querySelector('.cards');

const addCard = (newCard) => {
    cardsContainer.prepend(newCard);
};
cardInfo.reverse().forEach((item) => {
    addCard(createCard(item.link, item.name));
});

//popup картинки
const popupImage = document.querySelector('.popup_image');
const imagePlace = document.querySelector('.popup__image-place');
const imageCaption = document.querySelector('.popup__image-caption');

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
    toggleButtonState(inputElementAddCardFiled, buttonActiveAddCard, validationConfig);
});

//Отправка формы закрытия popup карточки
function handleCardFormSubmit(event) {
    event.preventDefault();

    const cardLink = linkCardInput.value;
    const cardName = titleCardInput.value;

    addCard(createCard(cardLink, cardName));

    closePopup(popupAddFormCard);

    event.target.reset();
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
const inputElementEditPrifileFiled = Array.from(formElement.querySelectorAll('.popup__input'))
const buttonActiveEditProfile = formElement.querySelector('.popup__save-button');

profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameProfileInput.value = profileName.textContent;
    jobProfileInput.value = profileDescription.textContent;
    toggleButtonState(inputElementEditPrifileFiled, buttonActiveEditProfile, validationConfig);
});

//Оправка формы закрытие popup профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileDescription.textContent = jobProfileInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

enableValidation(validationConfig);









