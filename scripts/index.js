const popupClose = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const submitButton = document.querySelector('.popup__submit-button');
const popupButtonAdd = document.querySelector('.profile__button-add');


const popup = document.querySelector('.popup');
const openButtonPopup =  document.querySelector('.profile__edit-button');


function openPopup() {
  popup.classList.add('popup_opened'); //присвоили класс   
}
openButtonPopup.addEventListener('click', function() {
	setPopupInputValue();
});//открыли окно попап


function closePopup() {
  popup.classList.remove('popup_opened'); //отключили класс
}
popupClose.addEventListener('click', closePopup); //закрыли окно попап


function setPopupInputValue() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileParagraph.textContent;
	openPopup();
}

function setNodeTextValue() {
	profileTitle.textContent = nameInput.value;
	profileParagraph.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
	evt.preventDefault();
	setNodeTextValue();
	closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);



const popupTypeAdd = document.querySelector('.popup_form_add');

function openPopupAdd() {
	popupTypeAdd.classList.add('popup_opened'); //присвоили класс попап МЕСТО 
}
popupButtonAdd.addEventListener('click', function() {
	openPopupAdd(); //открыли окно попап МЕСТО
});

const popupButtonClose = document.querySelector('.popup_button_close');
function closePopupAdd() {
	popupTypeAdd.classList.remove('popup_opened'); //отключили класс попап МЕСТО
}
popupButtonClose.addEventListener('click', closePopupAdd); //закрыли окно попап МЕСТО





const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

const cardsContainer = document.querySelector('.elements');//список карточек
function addElement(dataLink, dataName) {
	const elementsTemplate = document.querySelector('#card').content; 					    //получили элемент id-card c содержимым
	const newCardElement = elementsTemplate.querySelector('.element').cloneNode(true);	    //склонировали элементы закинули в newCardElrment
	newCardElement.querySelector('.element__title').alt = dataName;
	newCardElement.querySelector('.element__title').textContent = dataName;
	newCardElement.querySelector('.element__card').src = dataLink;

	const likeCard = newCardElement.querySelector('.element__like');
	likeCard.addEventListener('click', () => {
		likeToggle(likeCard);
	});
	return newCardElement;
}
addElement()

function likeToggle(likeCard) {
	likeCard.classList.toggle('element__like_active_black');
}

initialCards.forEach((item) => {
	const newCard = addElement(item.link, item.name);
	cardsContainer.append(newCard);
});

