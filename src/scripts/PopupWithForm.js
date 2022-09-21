import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, closeSelector, inputSelector, visibleClass}, submitCallback) {
    super({
      popupSelector: popupSelector,
      closeSelector: closeSelector,
      visibleClass: visibleClass
    });

    this._submitCallback = submitCallback;
    this._inputList = this._popup.querySelectorAll(inputSelector);
  }

  setInputValues(formValues) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = formValues[inputElement.name];
    });
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  resetForm() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();

      const formValues = this._getInputValues();
      this._submitCallback(formValues);
    });
  }
}