
const popup = document.querySelector('.popup');
const openButtonPopup =  document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const submitButton = document.querySelector('.popup__submit-button');

function openPopup() {
    popup.classList.add('popup_opened');    
}
openButtonPopup.addEventListener('click', openPopup);


function closePopup() {
    popup.classList.remove('popup_opened');    
}
popupClose.addEventListener('click', closePopup);


function setPopupInputValue() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileParagraph.textContent;
}


function setNodeTextValue() {
	profileTitle.textContent = nameInput.value;
	profileParagraph.textContent = jobInput.value;
}


function formSubmitHandler (e) {
	e.preventDefault();
	setNodeTextValue();
	popup.classList.remove('popup_opened');
}


openButtonPopup.addEventListener('click', function() {
	setPopupInputValue();
});


formElement.addEventListener('submit', formSubmitHandler);
