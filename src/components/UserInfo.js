
export default class UserInfo {														//изменение данных профиля на странице
	constructor({profileTitle, profileParagraph}) {
		this._profileTitle = profileTitle;
		this._profileParagraph = profileParagraph;
		this._nameInput = document.querySelector('.popup__field_form_title');
		this._jobInput = document.querySelector('.popup__field_form_subtitle');
	}

	getUserInfo() {
		this._nameInput.value = this._profileTitle.textContent;
		this._jobInput.value = this._profileParagraph.textContent;
	}

	setUserInfo() {																	// вставляем новые данные на страниу
		this._profileTitle.textContent = this._nameInput.value;
		this._profileParagraph.textContent = this._jobInput.value;
	}	
}
