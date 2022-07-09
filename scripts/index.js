const popupElement = document.querySelector(".popup");

const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit");

const nameElement = document.querySelector(".profile__title");
const popupNameElement = document.querySelector(".popup__input");

const jobElement = document.querySelector(".profile__subtitle");
const popupJobElement = document.querySelector(".popup__input_type_profession");

const showPopup = function () {
  popupNameElement.value = nameElement.textContent;


  popupJobElement.value = jobElement.textContent;
  popupElement.classList.add("popup_opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

const applyPopup = function () {
  nameElement.textContent = popupNameElement.value;

  jobElement.textContent = popupJobElement.value;
  closePopup();
};

popupOpenButtonElement.addEventListener("click", showPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container"); 

function formSubmitHandler(evt) {
  evt.preventDefault(); 

  applyPopup();
}

formElement.addEventListener("submit", formSubmitHandler);
