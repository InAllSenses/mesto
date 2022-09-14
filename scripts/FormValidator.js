const validationSettings = {
  formSelector: ".popup__information",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",

  inputErrorClass: "popup__input_error",
  errorVisibleClass: "popup__input-error_visible",
  buttonDisabledClass: "popup__button_disabled",
};


class FormValidator {
  constructor(validationSettings, formElement) {
    this.settings = validationSettings;
    this.formElement = formElement;
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
  
  _verifyButtonState(buttonElement, inputList) {
    const hasInvalid = inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  
    if (hasInvalid) {
      buttonElement.classList.add(this.settings.buttonDisabledClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this.settings.buttonDisabledClass);
      buttonElement.removeAttribute("disabled");
    }
  }
  
  _getFormButton() {
    return this.formElement.querySelector(this.settings.submitButtonSelector);
  }
  
  _setInputListeners(inputElement, inputList) {
    // найти кнопку
    const buttonElement = this._getFormButton();
  
    // назначаем обработчик изменений, который изменяет состояние инпата и состояние кнопки
    inputElement.addEventListener("input", () => {
      this._verifyInputState(inputElement);
      this._verifyButtonState(buttonElement, inputList);
    });
  }
  
  enableValidation() {
    // найти все инпаты
    const inputList = this._getFormInputs();
  
    // для каждого инпата
    inputList.forEach((inputElement) => {
      this._setInputListeners(inputElement, inputList);
    });
  }
  
  verifyPopupButtonState() {
    if (this.formElement) {
      const inputList = this._getFormInputs();
      const buttonElement = this.formElement.querySelector(
        this.settings.submitButtonSelector
      );
  
      this._verifyButtonState(buttonElement, inputList);
    }
  }
  
  verifyPopupInputsState() {
    const inputList = this._getFormInputs();
  
    inputList.forEach((inputElement) => {
      this._verifyInputState(inputElement);
    });
  }
};


function makeFormValidatorByPopup(popupElement) {
  const formElement = popupElement.querySelector(validationSettings.formSelector);
  const validator = new FormValidator(validationSettings, formElement);
  return validator;
}


export { validationSettings, FormValidator, makeFormValidatorByPopup };