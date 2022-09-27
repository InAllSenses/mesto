import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({popupSelector, closeSelector, visibleClass}, titleSelector, linkSelector) {
    super({
      popupSelector: popupSelector,
      closeSelector: closeSelector,
      visibleClass: visibleClass
    });

    this._titleElement = document.querySelector(titleSelector);
    this._imageElement = document.querySelector(linkSelector);
  }

  open(imageTitle, imageSrc) {
    this._titleElement.textContent = imageTitle;
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageTitle;

    super.open();
  }
}
