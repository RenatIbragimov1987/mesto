
export default class Section {
	constructor({items, renderer}, selectorContainer) {
		this._items = items;
		this._renderer = renderer;
		this._selectorContainer = selectorContainer;
	}

	addItem(element) {																//метод отрисовки всех элементов
		this._selectorContainer.append(element);
	}

	renderItems() {																	// проход по initial-card
		this._items.forEach(item =>	{
      		this.addItem(this._renderer(item));
    	});
	}

	prepend() {
		this._selectorContainer.prepend(element);
	}
}
