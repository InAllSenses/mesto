import Card from './Card.js';
import Section from './Section.js';

import UserInfo from './UserInfo.js';

import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';

import PopupWithImage from './PopupWithImage.js';

import { validationSettings, initialCards, selectors, classes } from './constants.js';

// GENERAL
function makeFormValidatorByPopup(popupElement) {
  const formElement = popupElement.querySelector(validationSettings.formSelector);
  const validator = new FormValidator(validationSettings, formElement);
  return validator;
}

function makeCard(cardTitle, cardLink) {
  const card = new Card(cardTitle, cardLink, selectors.cardTeplate, () => {
    popupImage.open(cardTitle, cardLink);
  });
  return card.createCard();
}



// USER INFO
const userInfo = new UserInfo({
  nameSelector: selectors.userName,
  infoSelector: selectors.userInfo
});

// validator
const popupEditUserElement = document.querySelector(selectors.popupEditUser);
const validatorUser = makeFormValidatorByPopup(popupEditUserElement);
validatorUser.enableValidation();

// popup
const popupEditUser = new PopupWithForm(
  {
    popupSelector: selectors.popupEditUser,
    closeSelector: selectors.closeEditUser,
    inputSelector: selectors.inputSelector,
    visibleClass: classes.popupVisible
  },
  (event) => {
    event.preventDefault();

    const formData = popupEditUser._getInputValues();
    userInfo.setUserInfo({
      name: formData['field-name'],
      info: formData['field-profession']
    });

    popupEditUser.close();
  }
);

popupEditUser.setEventListeners();
document.querySelector(selectors.showEditUser).addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  const formValues = {};

  formValues['field-name'] = userData.name;
  formValues['field-profession'] = userData.info;

  popupEditUser.open(formValues);
  validatorUser.resetValidation();
});



// CARDS
const cardsList = new Section({ items: initialCards, renderer: (item) => {
  const cardElement = makeCard(item.name, item.link);
  cardsList.addItem(cardElement);
}}, selectors.placesWrap);

cardsList.renderItems();

// validator
const popupMakeCardElement = document.querySelector(selectors.popupMakeCard);
const validatorMake = makeFormValidatorByPopup(popupMakeCardElement);
validatorMake.enableValidation();

// popup
const popupMakeCard = new PopupWithForm(
  {
    popupSelector: selectors.popupMakeCard,
    closeSelector: selectors.closeMakeCard,
    inputSelector: selectors.inputSelector,
    visibleClass: classes.popupVisible,
  },
  (event) => {
    event.preventDefault();

    const formValues = popupMakeCard._getInputValues();
    const cardTitle = formValues['field-title'];
    const cardLink = formValues['field-link'];

    const cardElement = makeCard(cardTitle, cardLink);
    cardsList.addItem(cardElement);

    popupMakeCard.close();
  }
);

popupMakeCard.setEventListeners();
document.querySelector(selectors.showMakeCard).addEventListener("click", () => {
  const formValues = {};
  formValues['field-title'] = "";
  formValues['field-link'] = "";

  popupMakeCard.open(formValues);
  validatorMake.resetValidation();
});



// IMAGE
// popup
const popupImage = new PopupWithImage(
  {
    popupSelector: selectors.popupImage,
    closeSelector: selectors.closeImage,
    visibleClass: classes.popupVisible,
  },
  selectors.popupImageTitle,
  selectors.popupImagePicture
);

popupImage.setEventListeners();