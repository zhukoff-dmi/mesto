class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderedItems(items) {
        items.forEach(item => this._renderer(item));
    };
};

export default Section;