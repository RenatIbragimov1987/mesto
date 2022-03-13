
export default class Card {
	constructor( data, userId, cardSelector, { handleCardClick, handleCardDelete, handleCardLike } ) {
		this._name = data.name;
    this._link = data.link;
		this._likes = data.likes ?? [];
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._userId = userId;
		this._handleCardClick = handleCardClick;
		this._handleCardDelete = handleCardDelete;
		this._handleLikeClick = handleCardLike;
		this._cardSelector = cardSelector;
		this._view = this._getTemplate();
		this._cardImage = this._view.querySelector('.element__card');
		this._cardText = this._view.querySelector('.element__title');
		this._deleteButton = this._view.querySelector('.element__trash');
		this._likeCounter = this._view.querySelector('.element__counter-likes');
		this._likeButton = this._view.querySelector('.element__like');
	}
	
	_getTemplate() {
		return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }

	renderCard() {
		this._cardImage.alt = this._name;
		this._cardText.textContent = this._name;
		this._cardImage.src = this._link;
		this._setEventListenersCard();
		this._deleteIfCardIsMine();
		this.likeCard()
		return this._view
	}


	_setEventListenersCard() {
		this._likeButton.addEventListener('click', () => { this._handleLikeClick(this) });
		this._cardImage.addEventListener('click', () => { this._handleCardClick() });
		this._deleteButton.addEventListener('click', () => { this._handleCardDelete(this) })
	}

	// проверяем есть ли лайки
	likeCheck() {
		return this._likes.some((like) => like._id === this._userId);
	}

	//если моя карточка добавляем класс лайка
	likeCard() {
			this._likeCounter.textContent = this._likes.length;
			if (this.likeCheck()) {
				this._likeButton.classList.add('element__like_active_black');
			}
			 else {
				this._likeButton.classList.remove('element__like_active_black');
			}
	}

		// метод установки лайков
	setLikesInfo(likes) {
		this._likes = likes;
		this.likeCard();
	}
	
	trashCard() {
			this._view.remove();
			this._view = null;
	}

	cardId() {
		return this._cardId;
	}

		//удолять если карточка моя
	_deleteIfCardIsMine() {
		if (this._ownerId === this._userId) {
			this._deleteButton.classList.add('element__trash_type_visible');
		} else {
			this._deleteButton.classList.remove('element__trash_type_visible');
		}
	}
	
}
