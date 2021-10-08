const openButtonPopup =  document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupButtonAdd = document.querySelector('.profile__button-add');
const popupTypeAdd = document.querySelector('.popup_form_add');
const closePopupEditProfileButton = document.querySelector('.popup__close-icon');
const closePopupTypeAddButton = document.querySelector('.popup__close-icon_form');
const popupTypeImage = document.querySelector('.popup_type_image');
const formEditProfile = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const submitButton = document.querySelector('.popup__submit-button');
const submitButtonSave = document.querySelector('.popup__submit-button_save');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
const cardsContainer = document.querySelector('.elements');
const formAddCard = document.querySelector('.popup__form_mesto');
const fieldTitle = document.querySelector('.popup__field_title');
const fieldSubtitle = document.querySelector('.popup__field_subtitle');
const elementsTemplate = document.querySelector('#card').content;												//получили элемент id-card c содержимым
const popupCloseIconImg = document.querySelector('.popup__close-icon_img');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const popupImg = popupTypeImage.querySelector('.popup__img');

function openPopup(popup) {																													//открытие поп
    popup.classList.add('popup_opened')
};
popupButtonAdd.addEventListener('click', () => openPopup(popupTypeAdd));

function closePopup(popup) {																												//закрытие поп
	popup.classList.remove('popup_opened')
};
closePopupEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
submitButton.addEventListener('click', () => closePopup(popupEditProfile));
closePopupTypeAddButton.addEventListener('click', () => closePopup(popupTypeAdd));
submitButtonSave.addEventListener('click', () => closePopup(popupTypeAdd));
popupCloseIconImg.addEventListener('click', () => closePopup(popupTypeImage))						//закрыли поп с картинкой


function openPopupImage(cardLink, cardName) {																				//данные в поп с картинкой
	popupImageTitle.textContent = cardName;
	popupImageTitle.alt = cardName;
	popupImg.src = cardLink;
	openPopup(popupTypeImage)
}

function openEditProfilePopup() {																										//авто-вставка данных профиля
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileParagraph.textContent;
	openButtonPopup.addEventListener('click', () => openPopup(popupEditProfile));
}
openEditProfilePopup()

function fillInUserInputs() {																												//сохранение данных профиля
	profileTitle.textContent = nameInput.value;
	profileParagraph.textContent = jobInput.value;
}

function submitEditProfileForm (evt) {							
	evt.preventDefault();
	fillInUserInputs();
	closePopup(formEditProfile);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);

function addCard(evt) {
	evt.preventDefault();
	const data = {
		name: fieldTitle.value,
		link: fieldSubtitle.value
	};
	cardsContainer.prepend(createCard(data.link, data.name))
	evt.currentTarget.reset();
	closePopup(formAddCard)
};
formAddCard.addEventListener('submit', addCard);

function createCard(cardLink, cardName) {																									//создание карточек
	const newCardElement = elementsTemplate.querySelector('.element').cloneNode(true);			//склонировали элементы закинули в newCardElrment
	const elementCard = newCardElement.querySelector('.element__card');
	const elementTitleCard = newCardElement.querySelector('.element__title');
	elementTitleCard.alt = cardName;
	elementTitleCard.textContent = cardName;
	newCardElement.querySelector('.element__card').src = cardLink;

	const likeCard = newCardElement.querySelector('.element__like');												//лайк карточке
	likeCard.addEventListener('click', () => {																							//клик с ссылкой на функцию с подменой класса
		likeToggle(likeCard);
	});
	const deleteCard = newCardElement.querySelector('.element__trash');											//корзина удаления
	deleteCard.addEventListener('click', () => {																						//функция удаления карточки
		newCardElement.remove();
	});

	elementCard.addEventListener('click', () => openPopupImage(cardLink, cardName))					//открыли поп с картинкой
	
	return newCardElement;
};

initialCards.forEach((item) => {
	const newCard = createCard(item.link, item.name);
	cardsContainer.append(newCard);
});

function likeToggle(likeCard) {																														//функция подмены класса для лайка
	likeCard.classList.toggle('element__like_active_black');
};

