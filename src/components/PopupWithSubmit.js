import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(selectorPopup, deleteCardPopup) {
        super(selectorPopup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._deleteCardPopup = deleteCardPopup;
    }

    open(card) {
        super.open();
        this._card = card;
    }

    delete() {
        this._handleButton(this._id, this._card);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._deleteCardPopup(this._card);
        })
    }
}