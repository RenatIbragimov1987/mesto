import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
    super( popupSelector );
		this.popupTitle = this._popup.querySelector('.popup__image-title');
		this.popupImg = this._popup.querySelector('.popup__img');
  }
	
	open(name, link) {
		super.open()
		this.popupTitle.textContent = name;
    this.popupImg.alt = name;
		this.popupImg.src = link;
    
	}
}