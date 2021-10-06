const popupClose = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const submitButton = document.querySelector('.popup__submit-button');
const popupButtonAdd = document.querySelector('.profile__button-add');
const popup = document.querySelector('.popup');
const openButtonPopup =  document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__field_form_title');
const jobInput = document.querySelector('.popup__field_form_subtitle');
const popupButtonClose = document.querySelector('.popup__close-icon_form');
const cardsContainer = document.querySelector('.elements');
const popupTypeAdd = document.querySelector('.popup_form_add');
const formEditProfile = document.querySelector('.popup__form');
const formAddCard = document.querySelector('.popup__form_mesto');
const elementsTemplate = document.querySelector('#card').content;												//получили элемент id-card c содержимым
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseIconImg = document.querySelector('.popup__close-icon_img');

function openPopup() {
  popup.classList.add('popup_opened'); //присвоили класс   
}
openButtonPopup.addEventListener('click', function() {
	openEditProfilePopup();
});//открыли окно попап

function closePopup() {
  popup.classList.remove('popup_opened'); //отключили класс
}
popupClose.addEventListener('click', closePopup); //закрыли окно попап

function openEditProfilePopup() {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileParagraph.textContent;
	openPopup();
}

function fillInUserInputs() {
	profileTitle.textContent = nameInput.value;
	profileParagraph.textContent = jobInput.value;
}

function submitEditProfileForm (evt) {
	evt.preventDefault();
	fillInUserInputs();
	closePopup();
}
formElement.addEventListener('submit', submitEditProfileForm);

function openPopupAdd() {
	popupTypeAdd.classList.add('popup_opened'); //присвоили класс попап МЕСТО 
}

popupButtonAdd.addEventListener('click', function() {
	openPopupAdd(); //открыли окно попап МЕСТО
});

function closePopupAdd() {
	popupTypeAdd.classList.remove('popup_opened'); //отключили класс попап МЕСТО
}
popupButtonClose.addEventListener('click', closePopupAdd); //закрыли окно попап МЕСТО

function openPopupImage(cardLink, cardName) {																										//открытие попапа с картинкой
	popupTypeImage.querySelector('.popup__image-title').textContent = cardName;
	popupTypeImage.querySelector('.popup__image-title').alt = cardName;
	popupTypeImage.querySelector('.popup__img').src = cardLink;
	popupTypeImage.classList.add('popup_opened');

}

function closePopupImage() {																											//закрытие попапа с картинкой
	popupTypeImage.classList.remove('popup_opened');
};
popupCloseIconImg.addEventListener('click', closePopupImage)											//закрыли попап с картинкой



const fieldTitle = document.querySelector('.popup__field_title');
const fieldSubtitle = document.querySelector('.popup__field_subtitle');
function addCard(evt) {
	evt.preventDefault();
	const data = {
		name: fieldTitle.value,
		link: fieldSubtitle.value
	};
	cardsContainer.prepend(createCard(data.link, data.name))
	evt.currentTarget.reset();
	closePopupAdd()
	
};

formAddCard.addEventListener('submit', addCard);

function createCard(cardLink, cardName) {
	const newCardElement = elementsTemplate.querySelector('.element').cloneNode(true);			//склонировали элементы закинули в newCardElrment
	const elementCard = newCardElement.querySelector('.element__card');
	const elementTitleCard = newCardElement.querySelector('.element__title');
	elementTitleCard.alt = cardName;
	elementTitleCard.textContent = cardName;
	newCardElement.querySelector('.element__card').src = cardLink;

	const likeCard = newCardElement.querySelector('.element__like');									//лайк карточке
	likeCard.addEventListener('click', () => {																				//клик с ссылкой на функцию с подменой класса
		likeToggle(likeCard);
	});
	const deleteCard = newCardElement.querySelector('.element__trash');								//корзина удаления
	deleteCard.addEventListener('click', () => {																			//функция удаления карточки
		newCardElement.remove();
	});
	elementCard.addEventListener('click', function() {																//открыли попап с картинкой
		openPopupImage(cardLink, cardName);
	});

	return newCardElement;
};
createCard()

initialCards.forEach((item) => {
	const newCard = createCard(item.link, item.name);
	cardsContainer.append(newCard);
});

function likeToggle(likeCard) {																											//функция подмены класса для лайка
	likeCard.classList.toggle('element__like_active_black');
};

