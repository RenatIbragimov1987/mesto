
const popup = document.querySelector('.popup');
const openPopup =  document.querySelector('.Profile__Edit-Button');
const popupClose = document.querySelector('.popup__CloseIcon');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__Field1');
const jobInput = document.querySelector('.popup__Field2');
const profileTitle = document.querySelector('.Profile__title');
const profileParagraph = document.querySelector('.Profile__paragraph');
const submitButton = document.querySelector('.popup__SubmitButton');

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
