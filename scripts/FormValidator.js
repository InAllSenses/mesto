class FormValidator {
  constructor(validationSettings, formElement) {
    this.settings = validationSettings;
    this.formElement = formElement;
    this.buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
    this.inputList = this._getFormInputs();
  }

  _findErrorElement(inputElement) {
    const errorSelector = `.${inputElement.id}-error`;
    return this.formElement.querySelector(errorSelector);
  }
  
  _showInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);
    errorElement.classList.add(this.settings.errorVisibleClass);
    errorElement.textContent = inputElement.validationMessage;
  
    inputElement.classList.add(this.settings.inputErrorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._findErrorElement(inputElement);
    errorElement.classList.remove(this.settings.errorVisibleClass);
  
    inputElement.classList.remove(this.settings.inputErrorClass);
  }
  
  _verifyInputState(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }
  
  _getFormInputs() {
    const inputs = this.formElement.querySelectorAll(this.settings.inputSelector);
    return Array.from(inputs);
  }
  
  _verifyButtonState() {
    const hasInvalid = this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  
    if (hasInvalid) {
      this.buttonElement.classList.add(this.settings.buttonDisabledClass);
      this.buttonElement.setAttribute("disabled", "disabled");
    } else {
      this.buttonElement.classList.remove(this.settings.buttonDisabledClass);
      this.buttonElement.removeAttribute("disabled");
    }
  }
  
  _getFormButton() {
    return this.formElement.querySelector(this.settings.submitButtonSelector);
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
  
  verifyPopupButtonState() {
    if (this.formElement) {
      this._verifyButtonState();
    }
  }
  
  verifyPopupInputsState() {
  
    this.inputList.forEach((inputElement) => {
      this._verifyInputState(inputElement);
    });
  }
};


export { FormValidator };