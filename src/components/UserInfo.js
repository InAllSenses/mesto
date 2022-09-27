export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this._id = null;
  }

  getUserInfo() {
    return {
        name: this._nameElement.textContent,
        info: this._infoElement.textContent
    }
  }

  setUserInfo({name, info}) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
  }

  getAvatar() {
    return this._avatarElement.src;
  }

  setAvatar(src) {
    this._avatarElement.src = src;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }
}
