
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
const elementsTemplate = document.querySelector('#card').content;									//получили элемент id-card c содержимым
const popupCloseIconImg = document.querySelector('.popup__close-icon_img');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const popupImg = popupTypeImage.querySelector('.popup__img');
const popup = document.querySelectorAll('.popup');



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
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', escapeClose);																//сняли обработчик закрытия Escape
	popup.removeEventListener('click', overlayClosePopup);
};

//закрытие попапов
closePopupEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
closePopupTypeAddButton.addEventListener('click', () => closePopup(popupTypeAdd));
popupCloseIconImg.addEventListener('click', () => closePopup(popupTypeImage));

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

//данные в поп с картинкой
function openPopupImage(cardLink, cardName) {
	popupImageTitle.textContent = cardName;
	popupImageTitle.alt = cardName;
	popupImg.src = cardLink;
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

//деактивация кнопки сабмита
function submitButtonOff () {
	const activePopup = document.querySelector('.popup__form_mesto');
	const submitButtonSave = activePopup.querySelector('.popup__submit-button_save');
	submitButtonSave.classList.add('popup__submit-button_inactive');
	submitButtonSave.setAttribute('disabled', true);
};


function addCard(evt) {
	evt.preventDefault();
	const data = {
		name: fieldTitle.value,
		link: fieldSubtitle.value
	};
	cardsContainer.prepend(createCard(data.link, data.name))
	evt.currentTarget.reset();
	submitButtonOff();	
	closePopup(popupTypeAdd);
};
formAddCard.addEventListener('submit', addCard);

//создание карточек
function createCard(cardLink, cardName) {
	const newCardElement = elementsTemplate.querySelector('.element').cloneNode(true);					//склонировали элементы закинули в newCardElrment
	const elementCard = newCardElement.querySelector('.element__card');
	const elementTitleCard = newCardElement.querySelector('.element__title');
	elementTitleCard.alt = cardName;
	elementTitleCard.textContent = cardName;
	newCardElement.querySelector('.element__card').src = cardLink;

	const likeCard = newCardElement.querySelector('.element__like');									//лайк карточке
	likeCard.addEventListener('click', () => {															//клик с ссылкой на функцию с подменой класса
		likeToggle(likeCard);
	});
	const deleteCard = newCardElement.querySelector('.element__trash');									//корзина удаления
	deleteCard.addEventListener('click', () => {														//функция удаления карточки
		newCardElement.remove();
	});

	elementCard.addEventListener('click', () => openPopupImage(cardLink, cardName))						//открыли поп с картинкой
	
	return newCardElement;
};

initialCards.forEach((item) => {
	const newCard = createCard(item.link, item.name);
	cardsContainer.append(newCard);
});

//функция подмены класса для лайка
function likeToggle(likeCard) {
	likeCard.classList.toggle('element__like_active_black');
};

