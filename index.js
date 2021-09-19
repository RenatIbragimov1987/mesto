
const popup = document.querySelector('.popup');
const openPopup =  document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const submitButton = document.querySelector('.popup__submit-button');

openPopup.addEventListener('click', function(e){
	e.preventDefault();
	popup.classList.add('popup_opened');
});
popupClose.addEventListener('click', function(e){
	e.preventDefault();
	popup.classList.remove('popup_opened');
});

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

openPopup.addEventListener('click', function() {
	setPopupInputValue();
	openPopup(popup);
});


formElement.addEventListener('submit', formSubmitHandler);
