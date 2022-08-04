
function getAllForms(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  return Array.from(forms);
}

function findErrorElement(inputElement, formElement) {
  errorSelector = `.${inputElement.id}-error`;
  return formElement.querySelector(errorSelector);
}

function showInputError(inputElement, formElement, settings) {
  const errorElement = findErrorElement(inputElement, formElement);
  errorElement.classList.add(settings.errorVisibleClass);
  errorElement.textContent = inputElement.validationMessage;

  inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(inputElement, formElement, settings) {
  const errorElement = findErrorElement(inputElement, formElement);
  errorElement.classList.remove(settings.errorVisibleClass);

  inputElement.classList.remove(settings.inputErrorClass);
};

function verifyInputState(inputElement, formElement, settings) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formElement, settings);
  }
  else {
    showInputError(inputElement, formElement, settings);
  }
}

function getFormInputs(formElement, settings) {
  const inputs = formElement.querySelectorAll(settings.inputSelector);
  return Array.from(inputs);
}


function verifyButtonState(buttonElement, inputList, settings) {
  const hasInvalid = inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });

  if (hasInvalid) {
    buttonElement.classList.add(settings.buttonDisabledClass);
  }
  else {
    buttonElement.classList.remove(settings.buttonDisabledClass);
  }
}

function getFormButton(formElement, settings) {
  return formElement.querySelector(settings.submitButtonSelector);
};

function setInputListeners(inputElement, inputList, formElement, settings) {
  // найти кнопку
  const buttonElement = getFormButton(formElement, settings);

  // назначаем обработчик изменений, который изменяет состояние инпата и состояние кнопки
  inputElement.addEventListener("input", function (inputEvent) {
    verifyInputState(inputElement, formElement, settings);
    verifyButtonState(buttonElement, inputList, settings);
  });
}

function enableFormValidation(formElement, settings) {
  // найти все инпаты
  const inputList = getFormInputs(formElement, settings);

  // для каждого инпата
  inputList.forEach(inputElement => {
    setInputListeners(inputElement, inputList, formElement, settings);
  });
}


function enableValidation(settings) {
  // найти все формы
  const formsList = getAllForms(settings);

  // включить для них валидацию
  formsList.forEach(formElement => {
    enableFormValidation(formElement, settings);
  });
}


enableValidation({
  formSelector: ".popup__information",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",

  inputErrorClass: "popup__input_error",
  errorVisibleClass: "popup__input-error_visible",
  buttonDisabledClass: "popup__button_disabled"
});