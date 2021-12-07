import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initial-cards.js';

const openButtonPopup =  document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const popupTypeAdd = document.querySelector('.popup_form_add');
const closePopupEditProfileButton = document.querySelector('.popup__close-icon');
const closePopupTypeAddButton = document.querySelector('.popup__close-icon_form');
const formEditProfile = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
export const cardsContainer = document.querySelector('.elements');
export const formAddCard = document.querySelector('.popup__form_mesto');
export const fieldTitle = document.querySelector('.popup__field_title');
export const fieldSubtitle = document.querySelector('.popup__field_subtitle');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const popupImg = popupTypeImage.querySelector('.popup__img');


const validationSettings = {
  formSelector: '.popup__form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__submit-button',
	inactiveButtonClass: 'popup__submit-button_inactive',
	inputErrorClass: 'popup__input-error',
	errorClass: 'popup__input-error_active'
};

const formValidAdd = new FormValidator(validationSettings, popupTypeAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(validationSettings, popupEditProfile);
formValidEdit.enableValidation();


function openPopup(popup) {																			//открытие поп
    popup.classList.add('popup_opened');
		document.addEventListener('keydown', escapeClose);					//навесили обработчик закрытия Escape
		popup.addEventListener('click', overlayClosePopup);
};

popupButtonAdd.addEventListener('click', () => openPopup(popupTypeAdd));
openButtonPopup.addEventListener('click', () => {
	openEditProfilePopup()
});


//закрытие поп
export function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', escapeClose);																//сняли обработчик закрытия Escape
	popup.removeEventListener('click', overlayClosePopup);
};

//закрытие попапов
closePopupEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closePopupTypeAddButton.addEventListener('click', () => closePopup(popupTypeAdd));


//закрытие активного окна попапа через Escape
function escapeClose (evt)	{
	if(evt.key === 'Escape') {
		const activePopup = document.querySelector('.popup_opened');
		closePopup(activePopup);
  };
};

//закрытие кликом в пустом месте
function overlayClosePopup (evt) {
	if (!evt.target.closest('.popup__container')) {
		closePopup(evt.target.closest('.popup'));
	};
};

// данные в поп с картинкой
export function openPopupImage(name, link) {
	popupImageTitle.textContent = name;
	popupImageTitle.alt = name;
	popupImg.src = link;
	openPopup(popupTypeImage)
}

//авто-вставка данных профиля
function openEditProfilePopup() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileParagraph.textContent;
	openPopup(popupEditProfile)
}

//сохранение данных профиля
function fillInUserInputs() {
	profileTitle.textContent = nameInput.value;
	profileParagraph.textContent = jobInput.value;
}

function submitEditProfileForm (evt) {							
	evt.preventDefault();
	fillInUserInputs();
	closePopup(popupEditProfile);
};
formEditProfile.addEventListener('submit', submitEditProfileForm);


export function createCard(item) {
  const card = new Card(item, '#card', openPopupImage);
  const cardElement = card.renderCard();
  return cardElement;
}


export function addCard(evt) {
  evt.preventDefault();
  const placeName = fieldTitle.value;
  const imageLink = fieldSubtitle.value;
  const data = {
  name: placeName,
  link: imageLink,
  }
  const card = createCard(data);
  document.querySelector('.elements').prepend(card);
  closePopup(popupTypeAdd);
}; 
formAddCard.addEventListener('submit', addCard);


// функция подмены класса для лайка
export function likeToggle(likeCard) {
	likeCard.classList.toggle('element__like_active_black');
};


initialCards.forEach((item) => {
	const newCardLoad = new Card(item);
	const cardElement = newCardLoad.renderCard();
	document.querySelector('.elements').append(cardElement);
});



