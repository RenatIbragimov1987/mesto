
	const hasInvalidInput = (inputList) => {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	};
	const toggleButtonState = (inputList, buttonElement) => {
		if (hasInvalidInput(inputList)) {
			buttonElement.classList.add('popup__submit-button_inactive');
			buttonElement.setAttribute('disabled', true);;
		} else {
			buttonElement.classList.remove('popup__submit-button_inactive');
			buttonElement.removeAttribute('disabled');
		}
	}; 
	const showInputError = (formElement, inputElement, errorMessage) => {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add('popup__input-error_active');
		inputElement.classList.add('popup__field_border_red');
		errorElement.classList.add('popup__input-error');
	  errorElement.textContent = errorMessage;
	};
	
	const hideInputError = (formElement, inputElement) => {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	  inputElement.classList.remove('popup__input-error_active');
		inputElement.classList.remove('popup__field_border_red');	
	  errorElement.classList.remove('popup__input-error');
	  errorElement.textContent = '';
	};
	
	const checkInputValidity = (formElement, inputElement) => {
		if (!inputElement.validity.valid) {
			showInputError(formElement, inputElement, inputElement.validationMessage);
		} else {
			hideInputError(formElement, inputElement);
		}
	};
	
	const setEventListeners = (formElement) => {
		const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
		const buttonElement = formElement.querySelector('.popup__submit-button');
		toggleButtonState(inputList, buttonElement);
		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', function () {
				checkInputValidity(formElement, inputElement);
				toggleButtonState(inputList, buttonElement);
			});
		});
	};
	
	const enableValidation = () => {
		const formList = Array.from(document.querySelectorAll('.popup__form'));
		formList.forEach((formElement) => {
			formElement.addEventListener('submit', (evt) => {
				evt.preventDefault();
			});
			const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
			fieldsetList.forEach((fieldSet) => {
		setEventListeners(fieldSet);
	}); 
		});
	};
	
	enableValidation();
	
	
