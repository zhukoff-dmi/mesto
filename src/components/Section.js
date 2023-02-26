class Section {
    constructor({items, renderer}, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderedItems() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }
};

export default Section;