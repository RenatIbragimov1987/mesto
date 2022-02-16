
export default class Card {
	constructor( {data, handleCardClick }, cardSelector) {
		this._name = data.name;
    	this._link = data.link;
		this._handleCardClick = handleCardClick;
		this._cardSelector = cardSelector;
	}
	
	_getTemplate() {
		return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  } 
	
	_likeCard(evt) {
		evt.target.classList.toggle('element__like_active_black');
	}
	
	_trashCard() {
		this._view.remove();
		this._view = null;
	}

	renderCard() {
		this._view = this._getTemplate();
		this._view.querySelector('.element__card').alt = this._name;
		this._view.querySelector('.element__title').textContent = this._name;
		this._view.querySelector('.element__card').src = this._link;
		this._setEventListenersCard();
		return this._view
	}

	_setEventListenersCard() {
		this._view.querySelector('.element__like').addEventListener('click', this._likeCard);
		this._view.querySelector('.element__card').addEventListener('click', () => {
			this._handleCardClick();
		});
		this._view.querySelector('.element__trash').addEventListener('click', () => {
			this._trashCard();
		});	
	}
}
