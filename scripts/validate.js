
	const allInputs = document.querySelectorAll('.popup__field');
		allInputs.forEach((input) => {
			input.addEventListener("input", () => {
				validate(input);
				validate(input);
		});
	});
	
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
	

	function toggleButtonState () {
		const togglePopup = document.querySelector('.popup_opened');
		const inputs = Array.from(togglePopup.querySelectorAll('.popup__field'));
		for(let i = 0; i = inputs.length; i++) {
			validate(inputs[i]);
		}
	};


	function validate(input) {
		const togglePopup = document.querySelector('.popup_opened');
		const checkupButton = togglePopup.querySelector('.popup__submit-button')
		if (!input.validity.valid) {
			checkupButton.classList.add('popup_button_inactive');
			checkupButton.setAttribute('disabled', true);
		} else {
			checkupButton.classList.remove('popup_button_inactive');
			checkupButton.removeAttribute('disabled');
		};
	}


	const checkInputValidity = (formElement, inputElement) => {
	  if (!inputElement.validity.valid) {
	    showInputError(formElement, inputElement, inputElement.validationMessage);
	  } else {
	    hideInputError(formElement, inputElement);
	  };
	};


	const setEventListeners = (formElement) => {
	  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
	  inputList.forEach((inputElement) => {
	    inputElement.addEventListener('input', function () {
	      checkInputValidity(formElement, inputElement);
	    });
	  });
	};
	

	const enableValidation = (formElement) => {
	  const formList = Array.from(document.querySelectorAll('.popup__form-wrapper'));
	  formList.forEach((formElement) => {
	    formElement.addEventListener('submit', (evt) => {
	    	evt.preventDefault();
				validate(input)
	  });
		setEventListeners(formElement);
	});
	};

	enableValidation({
		formSelector: '.popup__form',
		inputSelector: '.popup__field',
		submitButtonSelector: '.popup__submit-button',
		inactiveButtonClass: '.popup_button_inactive',
		errorClass: '.popup__input-error_active',
	  });
	

