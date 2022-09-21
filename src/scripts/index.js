import '../pages/index.css';

import Card from './Card.js';
import Section from './Section.js';

import UserInfo from './UserInfo.js';

import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';

import PopupWithImage from './PopupWithImage.js';

import { validationSettings, cardSelectors, cardClasses, selectors, classes, apiConstants } from './constants.js';

import Api from './Api.js';


// API
const api = new Api(apiConstants.token, apiConstants.baseUrl);


// GENERAL
function makeFormValidatorByPopup(popupElement) {
  const formElement = popupElement.querySelector(validationSettings.formSelector);
  const validator = new FormValidator(validationSettings, formElement);
  return validator;
}

function makeCard(cardTitle, cardLink) {
  const card = new Card(cardTitle, cardLink, cardSelectors, cardClasses, () => {
    popupImage.open(cardTitle, cardLink);
  });
  return card.createCard();
}



// USER INFO
const userInfo = new UserInfo({
  nameSelector: selectors.userName,
  infoSelector: selectors.userInfo,
  avatarSelector: selectors.userAvatar
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({
    name: data.name,
    info: data.about
  });

  userInfo.setAvatar(data.avatar);
  userInfo.setId(data._id);

}).catch((err) => {
  console.log(err);
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
  (formValues) => {
    userInfo.setUserInfo({
      name: formValues['field-name'],
      info: formValues['field-profession']
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

  popupEditUser.setInputValues(formValues);

  popupEditUser.open();
  validatorUser.resetValidation();
});



// CARDS

api.getInitialCards().then((data) => {
  const cardsList = new Section({ items: data, renderer: (item) => {
    const cardElement = makeCard(item.name, item.link);
    cardsList.addItem(cardElement);
  }}, selectors.placesWrap);
  
  cardsList.renderItems();
}).catch((err) => {
  console.log(err);
});



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
  (formValues) => {
    const cardTitle = formValues['field-title'];
    const cardLink = formValues['field-link'];

    const cardElement = makeCard(cardTitle, cardLink);
    cardsList.addItem(cardElement);

    popupMakeCard.close();
  }
);

popupMakeCard.setEventListeners();
document.querySelector(selectors.showMakeCard).addEventListener("click", () => {
  popupMakeCard.resetForm();
  popupMakeCard.open();
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