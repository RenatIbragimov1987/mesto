import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
	constructor({popupSelector, colbackSubmitForm}) {
		super( popupSelector );
		this._colback = colbackSubmitForm;
		this._popupInput = Array.from(this._popupSelector.querySelectorAll('.popup__field'));	
}

	_getInputValues() {                         												//возвращает данные полей формы
		this._popupInput.forEach((inputs) => {
			return inputs.value
		  });
	}

	setEventListeners() {
		super.setEventListeners()
		this._popupSelector.addEventListener('submit', (evt) =>{
			evt.preventDefault();
			this._colback(this._getInputValues());
			super.close()
		});
	}
	
	close() {
		super.close()
		this._popupInput.forEach(item =>	{
			item.value = '';
		  });
	}
}