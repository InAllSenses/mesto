import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, closeSelector, visibleClass }, submitCallback) {
    super({
      popupSelector: popupSelector,
      closeSelector: closeSelector,
      visibleClass: visibleClass,
    });

    this._submitCallback = submitCallback;
  }

  setSubmitParameters(parameters) {
    this._submitParameters = parameters;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("click", (event) => {
      event.preventDefault();

      this._submitCallback(this._submitParameters);
    });
  }
}
