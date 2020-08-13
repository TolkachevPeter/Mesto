class Validation {
    constructor(form, messages) {
        this.form = form;
        this.messages = messages;
        this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));
        this.button = this.form.querySelector('.popup__button');
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    // слушатель полей ввода
    setEventListeners() {
        this.inputs.forEach(el => {
            el.addEventListener('input', () => {
                this.inputValidate(el);
                this.checkFields();
            });
        });
    }

    inputValidate(input) {
        this.input = input;
        this.errorElement = this.form.querySelector(`#error-${this.input.id}`);

        if (this.input.validity.valueMissing) {
            this.setInvalid(this.messages.imptyField);
            return false;
        }
        if ((this.input.type === 'text') && (!this.input.validity.valid)) {
            this.setInvalid(this.messages.wrongLength);
            return false;
        }
        if ((this.input.type === 'url') && (!this.input.validity.valid)) {
            this.setInvalid(this.messages.notAnUrl);
            return false;
        }
        this.setValid();
        return true;
    }

    // если поле невалидно
    setInvalid(message) {
        this.errorElement.textContent = message;
        this.input.classList.add('popup__input_invalid');
    }
    // если поле валидно
    setValid() {
        this.errorElement.textContent = '';
        this.input.classList.remove('popup__input_invalid');
    }

    clearError() {
        this.form.querySelectorAll('.error').forEach(function (elem) {
            elem.textContent = '';
            
        });
        this.form.querySelectorAll('.popup__input_invalid').forEach(() => {
            this.input.classList.remove('popup__input_invalid');
        })
        
    };

    // включение/выключение кнопки формы в зависимости от статуса полей ввода
    checkFields() {
        let inputsStatus = this.inputs.some(el => el.classList.contains('popup__input_invalid') || el.validity.valueMissing);
        if (inputsStatus) {
            this.button.setAttribute('disabled', true);
            this.button.classList.add(`popup__button_invalid`);
        } else {
            this.button.removeAttribute('disabled');
            this.button.classList.remove(`popup__button_invalid`);
        }
    }
}