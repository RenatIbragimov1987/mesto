
export default class Section {
	constructor({items, renderer}, selectorContainer) {
		this._items = items;
		this._renderer = renderer;
		this._selectorContainer = selectorContainer;
	}

	addItem(element) {																//метод отрисовки всех элементов
		this._selectorContainer.append(element);
	}

	renderItems(items) {																	// проход по initial-card
		items.forEach(item =>	this._renderer(item));
		
	}

	addPreppend(element) {																//метод отрисовки всех элементов
		this._selectorContainer.prepend(element);
	}
}
