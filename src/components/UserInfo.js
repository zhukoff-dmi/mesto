class Userinfo {
    constructor({nameSelector, descriptionSelector}) {
        this._name = nameSelector;
        this._description = descriptionSelector;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        };
    }

    setUserInfo({name, description}) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}

export default Userinfo;