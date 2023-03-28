import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._buttonLoading = this._popupForm.querySelector('.popup__save-button');
        this._buttonLoadingText = this._buttonLoading.textContent;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    handleLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._buttonLoading.textContent = loadingText;
        } else {
            this._buttonLoading.textContent = this._buttonLoadingText;
        }
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}

export default PopupWithForm;