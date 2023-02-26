import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup)
        this._image = document.querySelector('.popup__image-place');
        this._title = document.querySelector('.popup__image-caption');
    }

    open({name, link}) {
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
        super.open();
    }
};

export default PopupWithImage;