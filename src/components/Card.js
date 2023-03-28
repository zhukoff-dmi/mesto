class Card {
    constructor(dataCard, userId, imageOpenPopup, deleteCardPopupClick, handleLikeCard) {
        this._likes = dataCard.likes;
        this._dataCard = dataCard;
        this.id = dataCard._id;
        this._cardId = dataCard.owner._id;
        this._userId = userId;

        this._handleLikeCard = handleLikeCard;
        this._imageOpenPopup = imageOpenPopup;
        this._deleteCardPopup = deleteCardPopupClick;
        this._content = document.querySelector('#template-card').content
            .querySelector('.card');
    }

    //клонируем содержимое
    _getTeamplate() {
        const elementCard = this._content.cloneNode(true);
        return elementCard;
    }

    //удаление карточки
    deleteCardPopup() {
        this._element.remove();
        this._element = null;
    }

    //добавление кнопки удаления нашим карточкам
    _showDeleteButton() {
        if(this._cardId === this._userId) {
            this._deleteCardButton.classList.add('card__delete-button_active');
        }
    }

    //лайк
    _toggleLikeCard = () => {
        if (this.isLiked()) {
            this.handleLikeCard();
        }
    }

    handleLikeCard() {
        this._likeCardButton.classList.toggle('card__like_active');
    }

    isLiked() {
        return this._likes.some((like) => like._id === this._userId); 
    }

    setLikesAmount(likes) {
        this._likes = likes;
        this._likeCount.textContent = this._likes.length;
    }


    //слушатели карточки
    _setEventListeners() {
        this._deleteCardButton.addEventListener('click', () =>  this._deleteCardPopup(this) );

        this._likeCardButton.addEventListener('click', () => this._handleLikeCard(this));

        this._imageCard.addEventListener('click', () =>  this._imageOpenPopup(this._dataCard));
    }


    //создание карточки
    generateCard() {
        this._element = this._getTeamplate();

        this._nameCard = this._element.querySelector('.card__title');
        this._imageCard = this._element.querySelector('.card__photo');
        this._likeCardButton = this._element.querySelector('.card__like');
        this._deleteCardButton = this._element.querySelector('.card__delete-button');
        this._likeCount = this._element.querySelector('.card__like-number');
        this._showDeleteButton();

        this._nameCard.textContent = this._dataCard.name;
        this._imageCard.src = this._dataCard.link;
        this._imageCard.alt = this._dataCard.name;
        this._likeCount.textContent = this._dataCard.likes.length;
        this._toggleLikeCard();

        this._setEventListeners();

        return this._element;
    }
};

export default Card;