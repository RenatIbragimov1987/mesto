import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
	constructor(data, popupSelector) {
    super( popupSelector );
    this._name = data.name;
    this._link = data.link;
		this.popupTitle = this._popup.querySelector('.popup__image-title');
		this.popupImg = this._popup.querySelector('.popup__img');
  }
	
	open(data) {
		this.popupTitle.textContent = this._name;
    this.popupImg.alt = this._name;
		this.popupImg.src = this._link;
    super.open()
	}
}