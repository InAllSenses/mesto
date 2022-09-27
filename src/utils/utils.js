
const setSubmitButtonText = (buttonElement, inProcess, textDefault, textProcess) => {
    if (inProcess) {
        buttonElement.textContent = textProcess;
      }
      else {
        buttonElement.textContent = textDefault;
      }
};

export { setSubmitButtonText };