
export default class UserInfo {														//изменение данных профиля на странице
	constructor(name, job) { 
		this._profileTitle = name;
		this._profileParagraph = job;
		this._nameInput = document.querySelector('.popup__field_form_title');
		this._jobInput = document.querySelector('.popup__field_form_subtitle');
	}

	getUserInfo() {
		return {
			nameInfo: this._profileTitle.textContent,
			jobInfo: this._profileParagraph.textContent,
		};
	}

	setUserInfo(infoName, infoParagraph) {																	// вставляем новые данные на страниу
		this._profileTitle.textContent = infoName;
		this._profileParagraph.textContent = infoParagraph;
	}	
}
