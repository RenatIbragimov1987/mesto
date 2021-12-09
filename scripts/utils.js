
export const popupTypeImage = document.querySelector('.popup_type_image');

export function openPopup(popup) {																			//открытие поп
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', escapeClose);					//навесили обработчик закрытия Escape
	popup.addEventListener('click', overlayClosePopup);
};


//закрытие поп
export function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', escapeClose);																//сняли обработчик закрытия Escape
	popup.removeEventListener('click', overlayClosePopup);
};

//закрытие активного окна попапа через Escape
function escapeClose (evt)	{
	if(evt.key === 'Escape') {
		const activePopup = document.querySelector('.popup_opened');
		closePopup(activePopup);
  };
};


//закрытие кликом в пустом месте
function overlayClosePopup (evt) {
	if (!evt.target.closest('.popup__container')) {
		closePopup(evt.target.closest('.popup'));
	};
};