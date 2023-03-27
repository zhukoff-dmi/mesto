import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import './index.css';

const popupImage = document.querySelector('.popup_image');

const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const formCardElement = popupAddCard.querySelector('.popup__form-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formElement = document.querySelector('.popup__form-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.cards');

const avatarButtonUpdate = document.querySelector('.profile__image-button');
const popupAvatarForm = document.querySelector('.popup__form-avatar');
const popupUpdateAvatar = document.querySelector('.profile__image');
const popupDeleteCard = document.querySelector('.popup_delete-card');
const popupAvatar = document.querySelector('.popup_avatar');


//создаем экземпляр класса валидации для каждой формы
const editProfileFormValidation = new FormValidator(validationConfig, formElement);
editProfileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(validationConfig, formCardElement);
newCardFormValidation.enableValidation();

const imageProfileFormValidation = new FormValidator(validationConfig, popupAvatarForm);
imageProfileFormValidation.enableValidation();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
    headers: {
        authorization: '7e54c718-5681-4ba1-ab1c-120b9ede7317',
        'Content-Type': 'application/json'
    }
});

//Редактирование профиля
const userInfo = new UserInfo({
    nameSelector: profileName,
    descriptionSelector: profileDescription,
    avatarSelector: popupUpdateAvatar
});

let userId;

Promise.all([
    api.getUserInfo(),
    api.getCards()
])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        addCard.renderedItems(cards);
    })
    .catch((err) => {
        console.log(err);
    })


//Создание карточки
function getCard(dataCard) {
    const card = new Card(dataCard, userId, imageOpenPopup, deleteCardPopupClick, handleLikeCard);
    return card.generateCard();
};

function renderCard(dataCard) {
    addCard.addItem(getCard(dataCard));
}

const addCard = new Section({renderer: renderCard}, cardsContainer);


//Обработчик лайка
const handleLikeCard = (card) => {
    if (card.isLiked()) {
        api.deleteLike(card.id)
            .then(res => {
                card.setLikesAmount(res.likes)
                card.handleLikeCard()
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.putLike(card.id)
            .then(res => {
                card.setLikesAmount(res.likes)
                card.handleLikeCard()
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

//Экземпляры класса PopupWithForm
const popupAddFormCard = new PopupWithForm(popupAddCard, handleCardFormSubmitAdd);
popupAddFormCard.setEventListeners();

const popupEditFormProfile = new PopupWithForm(popupEditProfile, handleProfileFormSubmitEdit);
popupEditFormProfile.setEventListeners();

const popupFormImage = new PopupWithImage(popupImage);
popupFormImage.setEventListeners();

const popupFormDeleteCard = new PopupWithSubmit(popupDeleteCard, handleButton);
popupFormDeleteCard.setEventListeners();

const popupFormAvatar = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
popupFormAvatar.setEventListeners();

//Отправка формы карточки
function handleCardFormSubmitAdd(dataCard) {
    popupAddFormCard.handleLoading(true);
    api.addNewCard(dataCard)
        .then(res => {
            renderCard(res);
            popupAddFormCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddFormCard.handleLoading(false);
        })
}

//Отправка формы профиля
function handleProfileFormSubmitEdit(inputData) {
    api.updateUserData(inputData)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupEditFormProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditFormProfile.handleLoading(false, 'Создать');
        });
}

//Отправка формы картинки аватара
function handleAvatarFormSubmit(avatarInfo) {
    popupFormAvatar.handleLoading(true);
    api.updateImageAvatar(avatarInfo.link)
        .then((res) => {
            userInfo.setUserInfo(res);
            popupFormAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupFormAvatar.handleLoading(false, 'Сохранить');
        });
}

//Отправка формы удаления карточки
function handleButton(card) {
    api.deleteCard(card.id)
        .then(() => {
            card.deleteCardPopup();
            popupFormDeleteCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
}


//Открытие попап
profileAddButton.addEventListener('click', () => {
    popupAddFormCard.open();
    newCardFormValidation.resetValidation();
});

profileEditButton.addEventListener('click', () => {
    const { name, description } = userInfo.getUserInfo();
    popupEditFormProfile.setInputValues({ 'name': name, 'about': description });
    editProfileFormValidation.resetValidation();
    popupEditFormProfile.open();
});

avatarButtonUpdate.addEventListener('click', () => {
    imageProfileFormValidation.resetValidation();
    popupFormAvatar.open();
})

function imageOpenPopup(dataImg){
    popupFormImage.open(dataImg);
};

function deleteCardPopupClick(dataCatd){
    popupFormDeleteCard.open(dataCatd);
}
