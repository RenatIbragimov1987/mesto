export class FormValidator {
	constructor(data, formElement) {
			this._formSelector = data.formSelector;
			this._inputSelector = data.inputSelector;
			this._submitButtonSelector = data.submitButtonSelector;
			this._inactiveButtonClass = data.inactiveButtonClass;
			this._inputErrorClass = data.inputErrorClass;
			this._errorClass = data.errorClass;
			this._formElement = formElement;
	}

	_showInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._errorClass);
		inputElement.classList.add('popup__field_border_red');
		errorElement.classList.add(this._inputErrorClass);
	  errorElement.textContent = inputElement.validationMessage;
	};
		
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._errorClass);
		inputElement.classList.remove('popup__field_border_red');	
	  errorElement.classList.remove(this._inputErrorClass);
	  errorElement.textContent = '';
	};

	_checkInputValidity(inputElement){
		if (!inputElement.validity.valid) {
				this._showInputError(inputElement, inputElement.validationMessage);
		} else {
				this._hideInputError(inputElement, inputElement.validationMessage);
		}
	}


	// фуекция обходит массив полей и отвечает на вопрос: 
// «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
	_hasInvalidInput(inputList, buttonElement) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}
	// фуекция смены цвета кнопки
	_toggleButtonState(inputList, buttonElement) {
		const isFormInvalid = this._hasInvalidInput(inputList);
		buttonElement.classList.toggle(this._inactiveButtonClass, isFormInvalid);
	
	}
// фуекция блокировки кнопки
	_disableSubmitButton(inputElement, buttonElement) {
		if (!inputElement.validity.valid) {
				buttonElement.setAttribute('disabled', true);
		} else {
			buttonElement.removeAttribute('disabled');
		}
	}
	


// массив из всех элементов с классом
// Обошли массив в теле функции и передали ему обработчик с параметром inputElement
	_setEventListeners() {
		const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState(inputList, buttonElement);
				this._disableSubmitButton(inputElement, buttonElement)
			});
		});
	}

	
	enableValidation() {
		this._formElement.addEventListener('submit', (evt) => {
				evt.preventDefault();
		});
		this._setEventListeners();
	};
}
