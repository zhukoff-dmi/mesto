//.profile__edit-button
//.popup
//.popup__close-button
//.popup__input_type_name
//.popup__input_type_job
//.profile__name
//.profile__description

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//.Открытие popup
function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

//.Закрытие popup
function popupClose() {
    popup.classList.remove('popup_opened');
}

//.Оправка формы закрытие popup
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

//Активная кнопка лайк
const likeButton = document.querySelector('.card__like');

function likeButtonActive() {
    likeButton.classList.toggle('.card__like_active');
}

likeButton.addEventListener('click', likeButtonActive);

console.log(likeButton);







