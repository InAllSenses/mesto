import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, closeSelector, submitSelector, visibleClass }, submitCallback) {
    super({
      popupSelector: popupSelector,
      closeSelector: closeSelector,
      visibleClass: visibleClass,
    });

    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector(submitSelector);

    this._buttonTextDefault = this._buttonSubmit.textContent;
    this._buttonTextProcess = "Удаление...";
  }

  setSubmitParameters(parameters) {
    this._submitParameters = parameters;
  }

  setPopupInProcess(inProcess) {
    if (inProcess) {
      this._buttonSubmit.textContent = this._buttonTextProcess;
    }
    else {
      this._buttonSubmit.textContent = this._buttonTextDefault;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonSubmit.addEventListener("click", (event) => {
      event.preventDefault();

      this._submitCallback(this._submitParameters);
    });
  }
}
