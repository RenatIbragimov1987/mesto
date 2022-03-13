export default class Popup {
	constructor( popupSelector ) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._iconClose = this._popup.querySelector('.popup__icon');
		this._saveButton = this._popup.querySelector('.popup__submit-button');

	}
	
	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	_handleEscClose(evt) {
		if(evt.key === 'Escape') {
			this.close();
		}
	}

	loadStatusButton(isLoading) {
		if (isLoading) {
			this._saveButton.textContent = 'Сохранение...'
		} else if (this._popupSelector === '.popup_form_add') {
			this._saveButton.textContent = 'Создать'
		} else {
			this._saveButton.textContent = 'Сохранить'
		}
	}

	setEventListeners() {
			this._iconClose.addEventListener('click', () => {
				this.close()
			});
		this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
			}
		});
	}
}		

