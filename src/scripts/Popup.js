export default class Popup {
  constructor({popupSelector, closeSelector, visibleClass}) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = document.querySelector(closeSelector);
    
    this._visiblePopupClass = visibleClass;

    this._handleOverlayClickBind = this._handleOverlayClick.bind(this);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._visiblePopupClass);
    this._popup.addEventListener("click", this._handleOverlayClickBind);

    document.addEventListener("keydown", this._handleEscCloseBind);
  }

  close() {
    this._popup.classList.remove(this._visiblePopupClass);
    this._popup.removeEventListener("click", this._handleOverlayClickBind);

    document.removeEventListener("keydown", this._handleEscCloseBind);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains(this._visiblePopupClass)) {
      this.close();
    }
  }
}
