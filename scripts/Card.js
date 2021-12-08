import { openPopup, popupTypeImage } from './index.js';
export default class Card {
	static _elementsTemplate = document.querySelector('#card').content;

	constructor(data, cardSelector, openPopup) {
		this._name = data.name;
    this._link = data.link;
		this._openPopup = openPopup;
		this._cardSelector = cardSelector;
	}

	_likeCard(evt) {
		evt.target.classList.toggle('element__like_active_black');
	}
	_trashCard(evt) {
		evt.target.closest('.element').remove();
	}

	_openPopupImage() {
		popupTypeImage.querySelector('.popup__img').src = this._link;
    popupTypeImage.querySelector('.popup__img').alt = this._link;
    popupTypeImage.querySelector('.popup__image-title').textContent = this._name;
    openPopup(popupTypeImage);
	}

	renderCard = () => {
		this._view = Card._elementsTemplate.querySelector('.element').cloneNode(true);
		this._view.querySelector('.element__title').alt = this._link;
		this._view.querySelector('.element__title').textContent = this._name;
		this._view.querySelector('.element__card').src = this._link;
		this._setEventListenersCard();
		return this._view
	}

	_setEventListenersCard () {
		this._view.querySelector('.element__like').addEventListener('click', this._likeCard);
		this._view.querySelector('.element__trash').addEventListener('click', this._trashCard);
		this._view.querySelector('.element__card').addEventListener('click', () => {
			this._openPopupImage();
		});
	}
}