class Card {
    constructor(item, templateCard, imageOpenPopup, userId, handleLikeCard, handleDeleteCard) {
        this._title = item.name;
        this._link = item.link;
        this._cardId = item._id;
        this._ownerId = item.owner._id;
        this._likes = item.likes;
        this._userId = userId;

        this._templateCard = templateCard;
        this._imageOpenPopup = imageOpenPopup;
        this._handleLikeCard = handleLikeCard;
        this._handleDeleteCard =handleDeleteCard;
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
    likeCard() {
        this._likeCardButton.classList.toggle('card__like_active');
    }

    _isLiked() {
        return this._likes.find(user =>{user._id === this._userId});
    }

    _showLikeStatus() {
        if(this._isLiked()) {
            this._likeCardButton.classList.add('card__like_active');
        }
    }

    solidLikeStatus(likes) {
        this._likes = likes
    }

    showLikeCount(count) {
        this._likeCount.textContent = count;
    }

    //попап карточки
    _handleCardClick() {
        this._imageOpenPopup(this._title, this._link);
    }

    //слушатели карточки
    _setEventListeners() {
        this._deleteCardButton.addEventListener('click', () => {this._handleDeleteCard(this, this._cardId)});

        this._likeCardButton.addEventListener('click', () => {this._handleLikeCard(this, this._isLiked(), this._cardId)});

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
        this._likeCount = this>this._element.querySelector('.card__like-number');

        this._showLikeCount(this._likes.length);
        this._showLikeStatus();

        if(this._userId !== this._ownerId) {
            this._deleteCardButton.remove();
        }

        this._setEventListeners();

        return this._element;
    }
};

export default Card;