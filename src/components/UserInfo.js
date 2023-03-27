class Userinfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._name = nameSelector;
        this._description = descriptionSelector;
        this._avatar = avatarSelector;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        };
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name.textContent = name;
        this._description.textContent = about;
        this._avatar.src = avatar;
        this._userId = _id;
    }

}

export default Userinfo;