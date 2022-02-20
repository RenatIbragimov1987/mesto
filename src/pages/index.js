// import './index.css';

import { validationSettings, popupfield, profileTitle, profileParagraph, nameInput, jobInput, popupTypeAdd, popupEditProfile, openButtonPopup, initialCards, cardsContainer, popupButtonAdd, fieldTitle, fieldSubtitle } from '../utils/constants.js';

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




//массив из карточек
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


//одна готовая карточка
function createCard(item) {
	const card = new Card({
		data: item,
		handleCardClick: () => {
			cardPopup.open(item)
		}
	},
	'#card',
	);
	const rendCard = card.renderCard();
	return rendCard; // возваращает готовую карточку
};


// бывший код
// const cardList = new Section({
// 	items: initialCards,
// 	renderer: (initialCards) => {
// 		const card = new Card({
// 			data: initialCards,
// 			handleCardClick: () => {
// 				const cardPopup = new PopupWithImage(initialCards, popupTypeImage);
// 				cardPopup.open(popupTypeImage);
// 				cardPopup.setEventListeners();
// 			}
// 		},
// 		'#card',
// 		);
// 		const rendCard = card.renderCard();
// 		console.log(rendCard);
// 		return rendCard;
// 	}
//  	},
// 	cardsContainer,
// );
// const cardSection = cardList.renderItems();
// cardList.addItem(cardSection);



const userInfo = new UserInfo(profileTitle, profileParagraph);

openButtonPopup.addEventListener('click', () => {
	popupWithFormProfile.open();
	const insertUserInfo = userInfo.getUserInfo();
	nameInput.value = insertUserInfo.nameInfo
	jobInput.value = insertUserInfo.jobInfo
});

const popupWithFormProfile = new PopupWithForm ({
	popupSelector: '.popup_edit-profile',
	colbackSubmitForm: (item) => {
		userInfo.setUserInfo(item['form-title'], item['form-subtitle']);
	}
});
popupWithFormProfile.setEventListeners();


// popupButtonAdd.addEventListener('click', () => {
//   popupWithFormAdd.open();	
// })

// const popupWithFormAdd = new PopupWithForm ({										//попап с добавлением карточки
// 	popupSelector: '.popup_form_add',
// 	colbackSubmitForm: () => {
// 		const data = { 
// 			name: fieldTitle.value, 
// 			link: fieldSubtitle.value,
// 		};
// 		const cardAdd = new Card({
// 			data:	data, 
// 			handleCardClick: () =>{
// 			},
// 		}, 
// 		'#card',
// 		);	
// 	const cardPopupAdd = cardAdd.renderCard();
// 	cardsContainer.prepend(cardPopupAdd);
// 	}
// });
// popupWithFormAdd.setEventListeners();
// popupButtonAdd.addEventListener('click', () => popupWithFormAdd.open('.popup_form_add'));


