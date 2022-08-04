const selectors = {
  popupEdit: ".popup-edit",
  popupOpenEdit: ".profile__edit",
  popupCloseEdit: ".popup-edit__close",
  nameEdit: ".profile__title",
  jobEdit: ".profile__subtitle",
 
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
  item: ".element",
  name: ".element__title",
  link: ".element__image",
  buttonRemove: ".element__trashcan",
  buttonLike: ".element__heart",
  buttonLikeActive: "element__heart_active",

  popupVisibleSelector: ".popup_opened"
};


// VARIABLE
// Popup-Edit

const popupEdit = document.querySelector(selectors.popupEdit);
const popupOpenEditButtonElement = document.querySelector(selectors.popupOpenEdit);
const popupCloseEditButtonElement = popupEdit.querySelector(selectors.popupCloseEdit);

const nameEditElement = document.querySelector(selectors.nameEdit);
const userNameEditElement = document.querySelector(selectors.userName);
const jobEditElement = document.querySelector(selectors.jobEdit);
const userJobEditElement = document.querySelector(selectors.userJob);

// Popup-Add

const popupAdd = document.querySelector(selectors.popupAdd);
const popupOpenAddButtonElement = document.querySelector(selectors.popupOpenAdd);
const popupCloseAddButtonElement = popupAdd.querySelector(selectors.popupCloseAdd);

const userTitleAddElement = document.querySelector(selectors.userTitle);
const userLinkAddElement = document.querySelector(selectors.userLink);

// Popup-Image

const popupImage = document.querySelector(selectors.popupImage);
const popupCloseImage = document.querySelector(selectors.popupCloseImage);
const link = document.querySelector(selectors.link);

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
  userTitleAddElement.value = "";
  userLinkAddElement.value = "";
  showPopup(popupAdd);
};

const closePopupAdd = function () {
  hidePopup(popupAdd);
};

// Popup-Image

function showPopupImage(titleImage, image_src) {
  showPopup(popupImage);
  popupImageTitle.textContent = titleImage;
  popupImagePicture.src = image_src;
  popupImagePicture.alt = titleImage;
}

function closePopupImage() {
  hidePopup(popupImage);
}

// Template

function createCard(name, link) {
  const elementTemplate = document.querySelector(selectors.template);
  const element = elementTemplate.content.querySelector(selectors.item);
  const newElement = element.cloneNode(true);

  const newElementName = newElement.querySelector(selectors.name);
  const newElementLink = newElement.querySelector(selectors.link);

  newElementName.textContent = name;
  newElementLink.src = link;
  newElementLink.alt = name;

  const buttonLike = newElement.querySelector(selectors.buttonLike);
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle(selectors.buttonLikeActive);
  });

  const buttonRemove = newElement.querySelector(selectors.buttonRemove);
  buttonRemove.addEventListener("click", () => {
    newElement.remove();
  });

  newElementLink.addEventListener("click", () => {
    showPopupImage(name, link);
  });

  return newElement;
}

function addCardToPage(card) {
  placesWrap.prepend(card);
}

function createIntialCards() {
  initialCards.forEach((cardDescription) => {
    const newCard = createCard(cardDescription.name, cardDescription.link);
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
  const newCard = createCard(userTitleAddElement.value, userLinkAddElement.value)
  addCardToPage(newCard);
  closePopupAdd();
});

createIntialCards();