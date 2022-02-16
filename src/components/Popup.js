import { popupIcon } from '../index.js';

export default class Popup {
	constructor( popupSelector ) {
		this._popupSelector = popupSelector;
	}
	
	open() {
		this._popupSelector.classList.add('popup_opened');
	}

	close() {
		this._popupSelector.classList.remove('popup_opened');
	}

	_handleEscClose(evt) {
		if(evt.key === 'Escape') {
			this.close();
		}
	}

	setEventListeners() {
		popupIcon.forEach(item => {
			item.addEventListener('click', () => {
				this.close()
			});
		});

		this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
			}
		});
		
		document.addEventListener('keydown', (evt) => {
			this._handleEscClose(evt);
			removeEventListener;
		});
	}
}		
