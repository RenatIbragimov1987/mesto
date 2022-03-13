import './index.css';

import { validationSettings, profileTitle, profileParagraph, profileAvatar, nameInput, 
	jobInput, popupTypeAdd, popupEditProfile, openButtonPopup, cardsContainer, 
	popupButtonAdd, popupUpdateAvatar, btnAvatar } from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm';


const userInfo = new UserInfo(profileTitle, profileParagraph, profileAvatar);

const api = new Api({
	address: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: 'e8a9f2b0-25e0-4ec4-83e8-52c6f0623a7c'
});

let userId;
Promise.all([
	api.loadingUserInformation(),
	api.downloadingCardsServer()
	])
	.then(([profileUser, serverCards]) => {
		userId = profileUser._id;
		userInfo.setUserInfo(profileUser);
		cardList.renderItems(serverCards);
		
	})
	.catch(err => {
		console.log(`Ошибка запроса данных с сервера: ${err}`);
	});

	//попап смены аватара
const popupWithAvatar = new PopupWithForm({
	popupSelector: '.popup_update-avatar',
	colbackSubmitForm: (item) => {
		popupWithAvatar.loadStatusButton(true);
		api.profileEditingAvatar(item)
				.then(item => {
					userInfo.setUserInfo(item);
					popupWithAvatar.close();
				})
				.catch(err => {
					console.log(`Ошибка обновления аватара: ${err}`)
				})
				.finally(() => {
					popupWithAvatar.loadStatusButton(false);
				})
		
	}
});
popupWithAvatar.setEventListeners();


//создание одной карточки 
const createCard = (item) => {
	const card = new Card(
		item,
		userId,
		'#card',
		{
		handleCardClick: () => {
			popupWithImage.open(item.name, item.link);
		},
		handleCardDelete: (card) => {
			popupDeleteCard.open();
			popupDeleteCard.setSubmitCallback(() => {
				api.deleteCard(card.cardId())
					.then(() => {
						card.trashCard();
						popupDeleteCard.close();
					})
					.catch(err => {
						console.log(`Ошибка удаления: ${err}`)
					})
			});
	},
	handleCardLike: (card) => {
		if (card.likeCheck()) { //проверяем есть ли лайк
			api.removeLike(card.cardId()) //если есть удоляем лайк
				.then((data) => {
					card.setLikesInfo(data.likes);
				})
				.catch(err => {
					console.log(`Ошибка удаления: ${err}`)
				});
		} else {
			api.addLike(card.cardId()) //иначе ставим лайк
				.then((data) => {
					card.setLikesInfo(data.likes);
				})
				.catch(err => {
					console.log(`Ошибка лайка: ${err}`)
				});
			}
	}
});
	return card.renderCard();
};

const cardList = new Section({
	renderer: (item) => {
		const newCard = createCard(item)
		cardList.addItem(newCard)
	}
},
cardsContainer
);

//попап добавления карточки
const popupWithFormAdd = new PopupWithForm ({
	popupSelector: '.popup_form_add',
	colbackSubmitForm: (item) => {
		popupWithFormAdd.loadStatusButton(true);
      api.addingNewCard(item)
        .then(res => {
          cardList.addPreppend(createCard(res));
					popupWithFormAdd.close();
        })
        .catch(err => {
          console.log(`Ошибка добавления карточки: ${err}`)
        })
        .finally(() => {
					popupWithFormAdd.loadStatusButton(false);
        })
	}
})
popupWithFormAdd.setEventListeners();


//вставка новых данных пользователя на страницу
const popupWithFormProfile = new PopupWithForm ({
	popupSelector: '.popup_edit-profile',
	colbackSubmitForm: (data) => {
		popupWithFormProfile.loadStatusButton(true);
		api.profileEditing(data)
			.then(data => {
				userInfo.setUserInfo(data)
				popupWithFormProfile.close()
			})
			.catch(err => {
				console.log(`Ошибка обновления данных: ${err}`)
			})
			.finally(() => {
				popupWithFormProfile.loadStatusButton(false);
			})
	}
});
popupWithFormProfile.setEventListeners();

//добавление данных о пользователе при открии попапа профиля
openButtonPopup.addEventListener('click', () => {
	popupWithFormProfile.open();
	const insertUserInfo = userInfo.getUserInfo();
	nameInput.value = insertUserInfo.nameInfo
	jobInput.value = insertUserInfo.jobInfo
});


const formValidAdd = new FormValidator(validationSettings, popupTypeAdd);
formValidAdd.enableValidation();
const formValidEdit = new FormValidator(validationSettings, popupEditProfile);
formValidEdit.enableValidation();

const formValidChangeAvatar = new FormValidator(validationSettings, popupUpdateAvatar);
formValidChangeAvatar.enableValidation();

//попап с добавлением карточки
popupButtonAdd.addEventListener('click', () => {
	popupWithFormAdd.open();
	formValidAdd.resetValidation();
});

//попап редактирования аватарки
btnAvatar.addEventListener('click', () =>{
	popupWithAvatar.open();
	formValidChangeAvatar.resetValidation();
});

//попап открытия изображения
const popupWithImage = new PopupWithImage ('.popup_type_image');
popupWithImage.setEventListeners();

// попап удаления карточки
const popupDeleteCard = new PopupWithConfirm('.popup_type_delete-card');
popupDeleteCard.setEventListeners();