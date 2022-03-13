import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__submit-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._handleSubmitCallback();
        });
    }

    setSubmitCallback(callback) {
        this._handleSubmitCallback = callback;
    }
}