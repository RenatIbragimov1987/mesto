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

const cardsContainer = document.querySelector('.elements');
////////////////////////добавление картинок
const popupTypeAdd = document.querySelector('.popup_form_add');
const popupForm = document.querySelector('.popup__form');
const fieldTitle = document.querySelector('.popup__field_title');
const fieldSubtitle = document.querySelector('.popup__field_subtitle');
const popupFormMesto = document.querySelector('.popup__form_mesto');

function addCard(evt) {
	evt.preventDefault();
	const data = {
		name: fieldTitle.value,
		link: fieldSubtitle.value
	};
	cardsContainer.prepend(addElement(data.link, data.name))
	evt.currentTarget.reset();
	closePopupAdd()
};
popupFormMesto.addEventListener('submit', addCard);

function addElement(dataLink, dataName) {
	const elementsTemplate = document.querySelector('#card').content;												//получили элемент id-card c содержимым
	const newCardElement = elementsTemplate.querySelector('.element').cloneNode(true);			//склонировали элементы закинули в newCardElrment
	const elementCard = newCardElement.querySelector('.element__card');
	
	newCardElement.querySelector('.element__title').alt = dataName;
	newCardElement.querySelector('.element__title').textContent = dataName;
	newCardElement.querySelector('.element__card').src = dataLink;

	const likeCard = newCardElement.querySelector('.element__like');									//лайк карточке
	likeCard.addEventListener('click', () => {																				//клик с ссылкой на функцию с подменой класса
		likeToggle(likeCard);
	});
	const deleteCard = newCardElement.querySelector('.element__trash');								//корзина удаления
	deleteCard.addEventListener('click', () => {																			//функция удаления карточки
		newCardElement.remove();
	});

	const popupTypeImage = document.querySelector('.popup_type_image');
	const popupCloseIconImg = document.querySelector('.popup__close-icon_img');
	function openPopupImage(data) {																										//открытие попапа с картинкой
		popupTypeImage.querySelector('.popup__img').src = dataLink;
		popupTypeImage.querySelector('.popup__image-title').textContent = dataName;
		popupTypeImage.classList.add('popup_opened');
	}

	elementCard.addEventListener('click', function() {																//открыли попап с картинкой
		openPopupImage();
	});
	
	function closePopupImage() {																											//закрытие попапа с картинкой
		popupTypeImage.classList.remove('popup_opened');
	};
	popupCloseIconImg.addEventListener('click', closePopupImage)											//закрыли попап с картинкой
	
	return newCardElement;
};
addElement()

initialCards.forEach((item) => {
	const newCard = addElement(item.link, item.name);
	cardsContainer.append(newCard);
});

function likeToggle(likeCard) {																											//функция подмены класса для лайка
	likeCard.classList.toggle('element__like_active_black');
};

