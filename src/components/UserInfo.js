export default class UserInfo {
	constructor(profileTitle, profileParagraph, profileAvatar) { 
		this._profileTitle = profileTitle;
		this._profileParagraph = profileParagraph;
		this._profileAvatar = profileAvatar;
	}

	getUserInfo = () => {
		return {
			nameInfo: this._profileTitle.textContent,
			jobInfo: this._profileParagraph.textContent
		}
	}
	
	setUserInfo(item) {
		this._profileTitle.textContent = item.name;
		this._profileParagraph.textContent = item.about;
		this._profileAvatar.src = item.avatar;
	}

}
