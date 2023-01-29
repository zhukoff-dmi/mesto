class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    };

    //скрываем ошибку валидации
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    };

    //показываем ошибку валидации
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    //проверяем валидность инпутов
    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    };

    //проверка валидности полей
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    //блокировка кнопки сабмита
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    //Слушатели на методы
    _setEventListener() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    //проверка всех форм и включение валидации
    enableValidation() {
        this._setEventListener();
    };

    //очистка ошибок и деактивация кнопки
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState();
    }

}

export default FormValidator;