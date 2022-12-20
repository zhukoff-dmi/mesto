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

profileAddButtonCard.addEventListener('click', function () {
    openPopup(popupAddFormCard);
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
const closeButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__form-profile');
const nameProfileInput = formElement.querySelector('.popup__input_type_name');
const jobProfileInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//.Открытие popup 
function openPopup(item) {
    item.classList.add('popup_opened');
};

//.Закрытие popup
function closePopup(item) {
    item.classList.remove('popup_opened');
};

closeButton.forEach(function (btn) {
    btn.addEventListener('click', function () {
        const popup = btn.closest('.popup');
        closePopup(popup);
    });
});

//popup профиля 
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameProfileInput.value = profileName.textContent;
    jobProfileInput.value = profileDescription.textContent;
});

//Оправка формы закрытие popup профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameProfileInput.value;
    profileDescription.textContent = jobProfileInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);











