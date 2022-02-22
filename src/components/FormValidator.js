export class FormValidator {
	constructor(data, formElement) {
			this._formSelector = data.formSelector;
			this._inputSelector = data.inputSelector;
			this._submitButtonSelector = data.submitButtonSelector;
			this._inactiveButtonClass = data.inactiveButtonClass;
			this._inputErrorClass = data.inputErrorClass;
			this._errorClass = data.errorClass;
			this._errorClassBorder = data.errorClassBorder
			this._formElement = formElement;
			this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
			this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
			
	}

	_showInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._errorClass);
		inputElement.classList.add(this._errorClassBorder);
		errorElement.classList.add(this._inputErrorClass);
	  errorElement.textContent = inputElement.validationMessage;
	};
		
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._errorClass);
		inputElement.classList.remove(this._errorClassBorder);	
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

	// метод обходит массив полей и отвечает на вопрос: 
// «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}
	// метод смены цвета кнопки
	_toggleButtonState() {
		const isFormInvalid = this._hasInvalidInput(this._inputList);
		this._submitButton.classList.toggle(this._inactiveButtonClass, isFormInvalid);
	}
// метод блокировки кнопки
	_disableSubmitButton(inputList) {
		if (!inputList.validity.valid) {
			this._submitButton.setAttribute('disabled', true);
		} else {
			this._submitButton.removeAttribute('disabled');
		}
	}

	_setEventListeners() { 
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState(inputElement, this._submitButton);
				this._disableSubmitButton(inputElement, this._submitButton);
			});
		});
	}

	resetValidation() {
		this._toggleButtonState(); //управляем кнопкой
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement) //очищаем ошибки
			this._disableSubmitButton(inputElement, this._submitButton);
		});

	}
	
	enableValidation() {
		
		this._formElement.addEventListener('submit', (evt) => {
				evt.preventDefault();
		});
		
		this._setEventListeners();
		
	};

}
