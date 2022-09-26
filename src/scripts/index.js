import '../pages/index.css';

import Card from './Card.js';
import Section from './Section.js';

import UserInfo from './UserInfo.js';

import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';

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


// popup delete card
const popupDeleteCard = new PopupWithConfirmation(
  {
    popupSelector: selectors.popupDeleteCard,
    closeSelector: selectors.closePopupButton,
    visibleClass: classes.popupVisible,
  },
  (card) => {
    api.deleteCard(card.getId())
    .then((data) => {
      card.deleteCard();
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      popupDeleteCard.close();
    });

  }
);
popupDeleteCard.setEventListeners();

function toggleCardLike(cardId, isLiked) {
  if (isLiked) {
    return api.deleteLike(cardId);
  }
  else {
    return api.putLike(cardId);
  }
}

function makeCard(cardData) {
  const cardParams = {
    id: cardData._id,
    name: cardData.name,
    link: cardData.link,
    likes: cardData.likes,
    userId: userInfo.getId(),
    ownerId: cardData.owner._id,
  }

  const card = new Card(cardParams, cardSelectors, cardClasses, () => {
    popupImage.open(cardData.name, cardData.link);
  },
  (cardObj) => {
    popupDeleteCard.setSubmitParameters(cardObj);
    popupDeleteCard.open();
  },
  (cardId, isLiked) => {
    toggleCardLike(cardId, isLiked)
    .then((res) => {
      card.setLikesList(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
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

})
.catch((err) => {
  console.log(err);
});



// validator
const popupEditUserElement = document.querySelector(selectors.popupEditUser);
const validatorUser = makeFormValidatorByPopup(popupEditUserElement);
validatorUser.enableValidation();

// popup info
const popupEditUser = new PopupWithForm(
  {
    popupSelector: selectors.popupEditUser,
    closeSelector: selectors.closeEditUser,
    inputSelector: selectors.inputSelector,
    visibleClass: classes.popupVisible
  },
  (formValues) => {
    api.patchUserInfo({
      name: formValues['field-name'],
      info: formValues['field-profession']
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        info: data.about
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditUser.close();
    });
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



// AVATAR
// validator
const popupAvatarElement = document.querySelector(selectors.popupEditAvatar);
const validatorAvatar = makeFormValidatorByPopup(popupAvatarElement);
validatorAvatar.enableValidation();

// popup
const popupEditAvatar = new PopupWithForm(
  {
    popupSelector: selectors.popupEditAvatar,
    closeSelector: selectors.closePopupButton,
    inputSelector: selectors.inputSelector,
    visibleClass: classes.popupVisible,
  },
  (formValues) => {
    api
      .patchAvatar({
        link: formValues["field-avatar"],
      })
      .then((data) => {
        userInfo.setAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.close();
      });
  }
);
popupEditAvatar.setEventListeners();

// button
const buttonEditAvatar = document.querySelector(selectors.buttonEditAvatar);
buttonEditAvatar.addEventListener("click", (event) => {
  const formValues = {};
  formValues["field-avatar"] = userInfo.getAvatar();

  popupEditAvatar.setInputValues(formValues);
  popupEditAvatar.open();

  validatorAvatar.resetValidation();
});


// CARDS

let cardsList = null;

api.getInitialCards().then((data) => {
  cardsList = new Section({ items: data, renderer: (item) => {
    const cardElement = makeCard(item);
    cardsList.appendItem(cardElement);
  }}, selectors.placesWrap);
  
  cardsList.renderItems();
}).catch((err) => {
  console.log(err);
});



// validator
const popupMakeCardElement = document.querySelector(selectors.popupMakeCard);
const validatorMake = makeFormValidatorByPopup(popupMakeCardElement);
validatorMake.enableValidation();

// popup make
const popupMakeCard = new PopupWithForm(
  {
    popupSelector: selectors.popupMakeCard,
    closeSelector: selectors.closeMakeCard,
    inputSelector: selectors.inputSelector,
    visibleClass: classes.popupVisible,
  },
  (formValues) => {
    api.postNewCard({
      name: formValues['field-title'],
      link: formValues['field-link']
    })
    .then((data) => {
      const cardElement = makeCard(data);
      cardsList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupMakeCard.close();
    });
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