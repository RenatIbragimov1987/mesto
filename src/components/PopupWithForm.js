import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
	constructor({popupSelector, colbackSubmitForm}) {
		super( popupSelector );
		this._colback = colbackSubmitForm;
		this._form = this._popup.querySelector('.popup__form');
		this._popupInput = Array.from(this._popup.querySelectorAll('.popup__field'));
}

	_getInputValues() {                         												//возвращает данные полей формы
		this._formValues = {};
		this._popupInput.forEach(input => this._formValues[input.name] = input.value);
		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners()
		this._popup.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._colback(this._getInputValues());
			this.close() 
		});
	}

	close() {
		super.close()
		this._form.reset();
	}

}