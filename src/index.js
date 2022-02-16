import './pages/index.css';
import { FormValidator } from './components/FormValidator.js';
import Popup from './components/Popup.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
export const openButtonPopup =  document.querySelector('.profile__edit-button');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupButtonAdd = document.querySelector('.profile__button-add');
export const popupTypeAdd = document.querySelector('.popup_form_add');
export const popupCloseIcon = document.querySelector('.popup__close-icon');
export const popupIcon = document.querySelectorAll('.popup__icon');
export const popupCloseIconProfil = document.querySelector('.popup__close-icon_profil');
export const closePopupTypeAddButton = document.querySelector('.popup__close-icon_form');
export const popupCloseIconImg = document.querySelector('.popup__close-icon_img');
export const formEditProfile = document.querySelector('.popup__container');
export const profileTitle = document.querySelector('.profile__title');
export const profileParagraph = document.querySelector('.profile__paragraph');
export const nameInput = document.querySelector('.popup__field_form_title');
export const jobInput = document.querySelector('.popup__field_form_subtitle');
export const formAddCard = document.querySelector('.popup__form_mesto');
export const popupfield = document.querySelectorAll('.popup__field');
export const fieldTitle = document.querySelector('.popup__field_title');
export const fieldSubtitle = document.querySelector('.popup__field_subtitle');
export const popupSubmitButtonSave = document.querySelector('.popup__submit-button_save');
export const cardsContainer = document.querySelector('.elements');

export const initialCards = [
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


const popupProfile = new Popup(popupEditProfile)
popupProfile.setEventListeners();
openButtonPopup.addEventListener('click', () => popupProfile.open(popupEditProfile));

const popupAdd = new Popup(popupTypeAdd);
popupAdd.setEventListeners()
popupButtonAdd.addEventListener('click', () => popupAdd.open(popupTypeAdd));


const userInfo = new UserInfo({													//данные пользователя
	profileTitle: profileTitle,
	profileParagraph: profileParagraph,
});
userInfo.getUserInfo();

const cardList = new Section({													//создали секцию, через функцию отобразили карточки
	items: initialCards,
	renderer: (initialCards) => {
		const card = new Card({
			data: initialCards,
			handleCardClick: () => {
				const cardPopup = new PopupWithImage(initialCards, popupTypeImage);
				cardPopup.open(popupTypeImage);
				cardPopup.setEventListeners();
			}
		},
		'#card',
		);
		const rendCard = card.renderCard();
		return rendCard;
	}
 	},
	cardsContainer,
);
const cardSection = cardList.renderItems();
cardList.addItem(cardSection);


const popupWithFormProfile = new PopupWithForm ({									//попап с данными пользователя
	popupSelector: popupEditProfile,
	colbackSubmitForm: () => {
		userInfo.setUserInfo();
	}
});
popupWithFormProfile.setEventListeners();


	
const popupWithFormAdd = new PopupWithForm ({										//попап с добавлением карточки
	popupSelector: popupTypeAdd,
	colbackSubmitForm: () => {
		const data = { 
			name: fieldTitle.value, 
			link: fieldSubtitle.value,
		};
		const cardAdd = new Card({
			data:	data, 
			handleCardClick: () =>{
			},
		}, 
		'#card',
		);	
	const cardPopupAdd = cardAdd.renderCard();
	cardsContainer.prepend(cardPopupAdd);
	}
});
popupWithFormAdd.setEventListeners();