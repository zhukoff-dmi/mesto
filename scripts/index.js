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
editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
})

//.Закрытие popup
function popupClose() {
    popup.classList.remove('popup_opened');
}

//.Оправка формыБ закрытие popup
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', editButton);
closeButton.addEventListener('click', popupClose);



