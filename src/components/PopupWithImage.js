import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
	constructor(data, popupSelector) {
    super( popupSelector );
    this._name = data.name;
    this._link = data.link;
  }
	
	open() {
		this._popupSelector.querySelector('.popup__image-title').textContent = this._name;
    this._popupSelector.querySelector('.popup__img').alt = this._name;
		this._popupSelector.querySelector('.popup__img').src = this._link;
    super.open()
	}
}