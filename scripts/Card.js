import { popupTypeImage, openPopupImage, closePopup, likeToggle, addCard, fieldTitle, fieldSubtitle } from './index.js';

export default class Card {
	static _elementsTemplate = document.querySelector('#card').content;

	constructor(data, cardSelector) {
		this._name = data.name;
    this._link = data.link;
		this._cardSelector = cardSelector;
	}

	renderCard = () => {
		this._view = Card._elementsTemplate.querySelector('.element').cloneNode(true);
		this._like = this._view.querySelector('.element__like');
		this._close = document.querySelector('.popup__close-icon_img');
		this._view.querySelector('.element__title').alt = this._name;
		this._view.querySelector('.element__title').textContent = this._name;
		this._view.querySelector('.element__card').src = this._link;
		this._view.querySelector('.element__trash').addEventListener('click', () => this._view.remove());
		this._view.querySelector('.element__card').addEventListener('click', () => openPopupImage(this._name, this._link));
		this._close.addEventListener('click', () => closePopup(popupTypeImage));
		this._like.addEventListener('click', () => likeToggle(this._like));
		
		return this._view
		
	}
}
