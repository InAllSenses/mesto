export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._formElement = formElement;
    this.buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this.inputList = this._getFormInputs();
  }

  _findErrorElement(inputElement) {
    const errorSelector = `.${inputElement.id}-error`;
    return this._formElement.querySelector(errorSelector);
  }
  
  _showInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);
    errorElement.classList.add(this._settings.errorVisibleClass);
    errorElement.textContent = inputElement.validationMessage;
  
    inputElement.classList.add(this._settings.inputErrorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);
    errorElement.classList.remove(this._settings.errorVisibleClass);
  
    inputElement.classList.remove(this._settings.inputErrorClass);
  }
  
  _verifyInputState(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }
  
  _getFormInputs() {
    const inputs = this._formElement.querySelectorAll(this._settings.inputSelector);
    return Array.from(inputs);
  }
  
  _verifyButtonState() {
    const hasInvalid = this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  
    if (hasInvalid) {
      this.buttonElement.classList.add(this._settings.buttonDisabledClass);
      this.buttonElement.setAttribute("disabled", "disabled");
    } else {
      this.buttonElement.classList.remove(this._settings.buttonDisabledClass);
      this.buttonElement.removeAttribute("disabled");
    }
  }
  
  _getFormButton() {
    return this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  
  _setInputListeners(inputElement) {
    // назначаем обработчик изменений, который изменяет состояние инпата и состояние кнопки
    inputElement.addEventListener("input", () => {
      this._verifyInputState(inputElement);
      this._verifyButtonState();
    });
  }

  enableValidation() {
  
    // для каждого инпата
    this.inputList.forEach((inputElement) => {
      this._setInputListeners(inputElement);
    });
  }

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._verifyButtonState();
  }
};