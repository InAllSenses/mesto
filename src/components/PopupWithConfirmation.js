import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, closeSelector, submitSelector, visibleClass }, submitCallback, setButtonTextCallback) {
    super({
      popupSelector: popupSelector,
      closeSelector: closeSelector,
      visibleClass: visibleClass,
    });

    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector(submitSelector);

    this._buttonTextDefault = this._buttonSubmit.textContent;
    this._buttonTextProcess = "Удаление...";

    this._setButtonTextCallback = setButtonTextCallback;
  }

  setSubmitParameters(parameters) {
    this._submitParameters = parameters;
  }

  setPopupInProcess(inProcess) {
    this._setButtonTextCallback(this._buttonSubmit, inProcess, this._buttonTextDefault, this._buttonTextProcess);
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonSubmit.addEventListener("click", (event) => {
      event.preventDefault();

      this._submitCallback(this._submitParameters);
    });
  }
}
