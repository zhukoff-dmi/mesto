import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, validationConfig} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import headerLogo from '../images/Header-logo.svg';

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

//создаем экземпляр класса валидации для каждой формы
const editProfileFormValidation = new FormValidator(validationConfig, formElement);
editProfileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(validationConfig, formCardElement);
newCardFormValidation.enableValidation();

//Создание карточки
function getCard(item) {
        const card = new Card(item, '#template-card', imageOpenPopup);
        return card.generateCard();
    };

const addCard = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = getCard(item);
        addCard.addItem(card);
    }
},cardsContainer);  

addCard.renderedItems();

//Экземпляры класса PopupWithForm
const popupAddFormCard = new PopupWithForm(popupAddCard, handleCardFormSubmit);
popupAddFormCard.setEventListeners();

const popupEditFormProfile = new PopupWithForm(popupEditProfile, handleProfileFormSubmit);
popupEditFormProfile.setEventListeners();

const popupFormImage = new PopupWithImage(popupImage);
popupFormImage.setEventListeners();

//Редактирование профиля
const userInfo = new UserInfo({
    nameSelector: profileName,
    descriptionSelector: profileDescription
});

//Открытие попап
profileAddButton.addEventListener('click', () => {
    popupAddFormCard.open();
    newCardFormValidation.resetValidation();
});

profileEditButton.addEventListener('click', () => {
    const {name, description} = userInfo.getUserInfo();
    popupEditFormProfile.setInputValues({'type-name': name, 'type-job': description});
    editProfileFormValidation.resetValidation();
    popupEditFormProfile.open();
});

function imageOpenPopup(name, link) {
    popupFormImage.open({name, link});
};

//Отправка формы карточки
function handleCardFormSubmit(inputs) {
    const newCard = getCard({
        name: inputs['type-title'],
        link: inputs['type-link'],
    });
    addCard.addItem(newCard);
    popupAddFormCard.close();
    newCardFormValidation.resetValidation();
}

//Отправка формы профиля
function handleProfileFormSubmit(inputs) {
    const {'type-name': name, 'type-job': description} = inputs;
    userInfo.setUserInfo({name, description});
    popupEditFormProfile.close();
}

