import './index.css';

import { validationSettings, 
	profileTitle, profileParagraph, 
	nameInput, jobInput, popupTypeAdd, 
	popupEditProfile, openButtonPopup, 
	initialCards, cardsContainer, 
	popupButtonAdd, fieldTitle, 
	fieldSubtitle } from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const formValidAdd = new FormValidator(validationSettings, popupTypeAdd);
formValidAdd.enableValidation();
const formValidEdit = new FormValidator(validationSettings, popupEditProfile);
formValidEdit.enableValidation();

//попап открытия изображения
const popupWithImage = new PopupWithImage ('.popup_type_image');
popupWithImage.setEventListeners();


//массив из карточек и его добавление на страницу
const cardList = new Section({
	items: initialCards,
	renderer: (initialCards) => {
		const newCard = createCard(initialCards)
		cardList.addItem(newCard)
	}
},
	cardsContainer,
);
cardList.renderItems();


//создание одной карточки
function createCard(item) {
	const card = new Card({
		data: item,
		handleCardClick: () => {
			popupWithImage.open(item.name, item.link);
		}
	},
	'#card',
	)
	const rendCard = card.renderCard();
	return rendCard;
};

//класс информации о пользователе
const userInfo = new UserInfo(profileTitle, profileParagraph);

//добавление данных о пользователе при открии попапа
openButtonPopup.addEventListener('click', () => {
	popupWithFormProfile.open();
	const insertUserInfo = userInfo.getUserInfo();
	nameInput.value = insertUserInfo.nameInfo
	jobInput.value = insertUserInfo.jobInfo
});

//подмена новых данных пользователя на страницу
const popupWithFormProfile = new PopupWithForm ({
	popupSelector: '.popup_edit-profile',
	colbackSubmitForm: (item) => {
		userInfo.setUserInfo(item['form-title'], item['form-subtitle']);
	}
});
popupWithFormProfile.setEventListeners();

//попап с добавлением карточки
popupButtonAdd.addEventListener('click', () => {
	popupWithFormAdd.open();
	formValidAdd.resetValidation();
});

const popupWithFormAdd = new PopupWithForm ({										
	popupSelector: '.popup_form_add',
	colbackSubmitForm: (item) => {
		const credCard = createCard({name:item['form-title'], link:item['form-subtitle']});
		cardList.addPreppend(credCard);
	}
});
popupWithFormAdd.setEventListeners();



