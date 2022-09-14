import { initialCards, Card } from './Card.js';
import { validationSettings, FormValidator, makeFormValidatorByPopup } from './FormValidator.js';

const selectors = {
  popupEdit: ".popup-edit",
  popupOpenEdit: ".profile__edit",
  popupCloseEdit: ".popup-edit__close",
  nameEdit: ".profile__title",
  jobEdit: ".profile__subtitle",
 
  formSelector: ".popup__information",
  popupAdd: ".popup-add",
  popupOpenAdd: ".profile__add",
  popupCloseAdd: ".popup-add__close",

  popupImage: ".popup-image",
  popupCloseImage: ".popup-image__close",
  titleImage: ".popup-image__title",
  pictureImage: ".popup-image__picture",
  
  popupVision: "popup_opened",
  userName: ".popup__input_type_name",
  userJob: ".popup__input_type_profession",
  userTitle: ".popup__input_type_title",
  userLink: ".popup__input_type_link",
  
  placesWrap: ".elements__grid",
  template: ".template__element",
  

  popupVisibleSelector: ".popup_opened"
};


// VARIABLE
// Popup-Edit

const popupEdit = document.querySelector(selectors.popupEdit);
const validatorEdit = makeFormValidatorByPopup(popupEdit);
const popupOpenEditButtonElement = document.querySelector(selectors.popupOpenEdit);
const popupCloseEditButtonElement = popupEdit.querySelector(selectors.popupCloseEdit);

const nameEditElement = document.querySelector(selectors.nameEdit);
const userNameEditElement = document.querySelector(selectors.userName);
const jobEditElement = document.querySelector(selectors.jobEdit);
const userJobEditElement = document.querySelector(selectors.userJob);

// Popup-Add

const popupAdd = document.querySelector(selectors.popupAdd);
const validatorAdd = makeFormValidatorByPopup(popupAdd);
const popupOpenAddButtonElement = document.querySelector(selectors.popupOpenAdd);
const popupCloseAddButtonElement = popupAdd.querySelector(selectors.popupCloseAdd);
const formAddElement = popupAdd.querySelector(selectors.formSelector);

const userTitleAddElement = document.querySelector(selectors.userTitle);
const userLinkAddElement = document.querySelector(selectors.userLink);

// Popup-Image

const popupImage = document.querySelector(selectors.popupImage);
const popupCloseImage = document.querySelector(selectors.popupCloseImage);

const popupImageTitle = document.querySelector(selectors.titleImage)
const popupImagePicture = document.querySelector(selectors.pictureImage)

// Template

const placesWrap = document.querySelector(selectors.placesWrap);


// FUNCTION
// General

function handleEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector(selectors.popupVisibleSelector);
    hidePopup(popupElement);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains(selectors.popupVision)) {
    hidePopup(evt.target);
  }
}

function showPopup(popup) {
  popup.classList.add(selectors.popupVision);
  popup.addEventListener('click', handleOverlayClick);

  document.addEventListener('keydown', handleEscapeButton);
}

function hidePopup(popup) {
  popup.classList.remove(selectors.popupVision);
  popup.removeEventListener('click', handleOverlayClick);

  document.removeEventListener('keydown', handleEscapeButton);
}

// Popup-Edit

const showPopupEdit = function () {
  userNameEditElement.value = nameEditElement.textContent;
  userJobEditElement.value = jobEditElement.textContent;

  validatorEdit.verifyPopupInputsState();
  validatorEdit.verifyPopupButtonState();
  showPopup(popupEdit);
};

const closePopupEdit = function () {
  hidePopup(popupEdit);
};

const applyPopupEdit = function () {
  nameEditElement.textContent = userNameEditElement.value;
  jobEditElement.textContent = userJobEditElement.value;
  closePopupEdit();
};

// Popup-Add

const showPopupAdd = function () {
  formAddElement.reset();

  validatorAdd.verifyPopupButtonState();
  showPopup(popupAdd);
};

const closePopupAdd = function () {
  hidePopup(popupAdd);
};

// Popup-Image

function showPopupImage(titleImage, imageSrc) {
  showPopup(popupImage);
  popupImageTitle.textContent = titleImage;
  popupImagePicture.src = imageSrc;
  popupImagePicture.alt = titleImage;
}

function closePopupImage() {
  hidePopup(popupImage);
}

// Template

function addCardToPage(card) {
  placesWrap.prepend(card);
}

function createIntialCards() {
  initialCards.forEach((cardDescription) => {
    const card = new Card(cardDescription.name, cardDescription.link, selectors.template, showPopupImage);
    const newCard = card.createCard();
    addCardToPage(newCard);
  });
}

// PROCESSING
// Popup-Edit

popupOpenEditButtonElement.addEventListener("click", showPopupEdit);
popupCloseEditButtonElement.addEventListener("click", closePopupEdit);
popupEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  applyPopupEdit();
});

// Popup-Add

popupOpenAddButtonElement.addEventListener("click", showPopupAdd);
popupCloseAddButtonElement.addEventListener("click", closePopupAdd);

// Popup-Image

popupCloseImage.addEventListener("click", () => {
  closePopupImage();
});

// Template

popupAdd.addEventListener("submit", function (event) {
  event.preventDefault();

  const card = new Card(userTitleAddElement.value, userLinkAddElement.value, selectors.template, showPopupImage);
  const newCard = card.createCard();
  addCardToPage(newCard);
  
  closePopupAdd();
});

createIntialCards();
validatorEdit.enableValidation();
validatorAdd.enableValidation();