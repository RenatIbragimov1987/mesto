import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initial-cards.js';
import { openPopup, popupTypeImage, closePopup } from './utils.js';

const openButtonPopup =  document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const popupTypeAdd = document.querySelector('.popup_form_add');
const popupCloseIconProfil = document.querySelector('.popup__close-icon_profil');
const closePopupTypeAddButton = document.querySelector('.popup__close-icon_form');
const popupCloseIconImg = document.querySelector('.popup__close-icon_img');
const formEditProfile = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
export const cardsContainer = document.querySelector('.elements');
export const formAddCard = document.querySelector('.popup__form_mesto');
export const fieldTitle = document.querySelector('.popup__field_title');
export const fieldSubtitle = document.querySelector('.popup__field_subtitle');

const popupSubmitButtonAdd = document.querySelector('.popup__submit-button_save');

const validationSettings = {
  formSelector: '.popup__form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__submit-button',
	inactiveButtonClass: 'popup__submit-button_inactive',
	inputErrorClass: 'popup__input-error',
	errorClass: 'popup__input-error_active',
	errorClassBorder: 'popup__field_border_red',
};

const formValidAdd = new FormValidator(validationSettings, popupTypeAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(validationSettings, popupEditProfile);
formValidEdit.enableValidation();

popupButtonAdd.addEventListener('click', () => openPopup(popupTypeAdd));
openButtonPopup.addEventListener('click', () => {
	openEditProfilePopup()
});

//закрытие попапов
popupCloseIconProfil.addEventListener('click', () => closePopup(popupEditProfile));
closePopupTypeAddButton.addEventListener('click', () => closePopup(popupTypeAdd));
popupCloseIconImg.addEventListener('click', () => closePopup(popupTypeImage));

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

export function createCard(item, cardSelector) {
  const card = new Card(item, cardSelector);
  const cardElement = card.renderCard();
  return cardElement;	
}

export function addCard(evt) {
  evt.preventDefault();
  const data = {
  name: fieldTitle.value,
  link: fieldSubtitle.value,
  }
  const card = createCard(data, '#card');
  document.querySelector('.elements').prepend(card);
  closePopup(popupTypeAdd);
	fieldTitle.value = '';
	fieldSubtitle.value = '';
	popupSubmitButtonAdd.setAttribute('disabled', true);
	popupSubmitButtonAdd.classList.toggle('popup__submit-button_inactive');
}; 
popupTypeAdd.addEventListener('submit', addCard);

initialCards.forEach((item) => {
	cardsContainer.append(createCard(item, '#card'));
});



