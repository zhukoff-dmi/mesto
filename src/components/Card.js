class Card {
    constructor(item, templateCard, imageOpenPopup) {
        this._title = item.name;
        this._link = item.link;

        this._templateCard = templateCard;
        this._imageOpenPopup = imageOpenPopup;
    }

    //клонируем содержимое
    _getTeamplate() {
        const elementCard = document 
        .querySelector(this._templateCard).content
        .querySelector('.card')
        .cloneNode(true);

        return elementCard;
    }

    //удаление карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //лайк
    _likeCard() {
        this._likeCardButton.classList.toggle('card__like_active');
    }

    //попап карточки
    _handleCardClick() {
        this._imageOpenPopup(this._title, this._link);
    }

    //лушатели карточки
    _setEventListeners() {
        this._deleteCardButton.addEventListener('click', () => {this._deleteCard()});
        this._likeCardButton.addEventListener('click', () => {this._likeCard()});
        this._imageCard.addEventListener('click', () => {this._handleCardClick()});
    }

    //создание карточки
    generateCard() {
        this._element = this._getTeamplate();
        
        this._element.querySelector('.card__title').textContent = this._title;
        this._imageCard = this._element.querySelector('.card__photo');
        this._imageCard.src = this._link;
        this._imageCard.alt = this._title;
        this._likeCardButton = this._element.querySelector('.card__like');
        this._deleteCardButton = this._element.querySelector('.card__delete-button');

        this._setEventListeners();

        return this._element;
    }
};

export default Card;