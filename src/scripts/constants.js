const validationSettings = {
  formSelector: ".popup__information",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",

  inputErrorClass: "popup__input_error",
  errorVisibleClass: "popup__input-error_visible",
  buttonDisabledClass: "popup__button_disabled",
};

const selectors = {
  // popup
  popupVisible: ".popup_opened",
  inputSelector: ".popup__input",

  
  // edit user
  showEditUser: ".profile__edit",
  closeEditUser: ".popup-edit__close",
  popupEditUser: ".popup-edit",

  userName: ".profile__title",
  userInfo: ".profile__subtitle",


  // card
  popupMakeCard: ".popup-add",
  showMakeCard: ".profile__add",
  closeMakeCard: ".popup-add__close",

  cardTeplate: ".template__element",
  placesWrap: ".elements__grid",


  // image
  popupImage: ".popup-image",
  closeImage: ".popup-image__close",

  popupImageTitle: ".popup-image__title",
  popupImagePicture: ".popup-image__picture"
};

const classes = {
  popupVisible: "popup_opened"
}


const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

export { validationSettings,  initialCards, selectors, classes }