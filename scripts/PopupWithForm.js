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

  open(formValues) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = formValues[inputElement.name];
    });

    super.open()
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    console.log(this._formValues);
    return this._formValues;
  }

  _resetForm() {
    
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", this._submitCallback.bind(this));
  }

  close() {
    super.close();
    this._resetForm();
  }
}
