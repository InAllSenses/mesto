const selectors = {
  popupEdit: ".popup-edit",
  openEdit: ".profile__edit",
  closeEdit: ".popup-edit__close",
  nameEdit: ".profile__title",
  jobEdit: ".profile__subtitle",
 
  popupAdd: ".popup-add",
  openAdd: ".profile__add",
  closeAdd: ".popup-add__close",
  createAdd: ".popup__button_create",

  popupImage: ".popup-image",
  closeImage: ".popup-image__close",
  titleImage: ".popup-image__title",
  pictureImage: ".popup-image__picture",
  
  popupVision: "popup_opened",
  userName: ".popup__input_type_name",
  userJob: ".popup__input_type_profession",
  userTitle: ".popup__input_type_title",
  userLink: ".popup__input_type_link",
  
  ul: ".elements__grid",
  template: ".template__element",
  item: ".element",
  name: ".element__title",
  link: ".element__image",
  buttonRemove: ".element__trashcan",
  buttonLike: ".element__heart",
  buttonLikeActive: "element__heart_active"
};


// Popup-Edit

const popupEdit = document.querySelector(selectors.popupEdit);
const popupOpenEditButtonElement = document.querySelector(selectors.openEdit);
const popupCloseEditButtonElement = popupEdit.querySelector(selectors.closeEdit);

const nameEditElement = document.querySelector(selectors.nameEdit);
const userNameEditElement = document.querySelector(selectors.userName);
const jobEditElement = document.querySelector(selectors.jobEdit);
const userJobEditElement = document.querySelector(selectors.userJob);

const showPopupEdit = function () {
  userNameEditElement.value = nameEditElement.textContent;
  userJobEditElement.value = jobEditElement.textContent;
  popupEdit.classList.add(selectors.popupVision);
};

const closePopupEdit = function () {
  popupEdit.classList.remove(selectors.popupVision);
};

const applyPopupEdit = function () {
  nameEditElement.textContent = userNameEditElement.value;
  jobEditElement.textContent = userJobEditElement.value;
  closePopupEdit();
};

popupEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  applyPopupEdit();
});

popupOpenEditButtonElement.addEventListener("click", showPopupEdit);
popupCloseEditButtonElement.addEventListener("click", closePopupEdit);

// Popup-Add

const popupAdd = document.querySelector(selectors.popupAdd);
const popupOpenAddButtonElement = document.querySelector(selectors.openAdd);
const popupCloseAddButtonElement = popupAdd.querySelector(selectors.closeAdd);

const userTitleAddElement = document.querySelector(selectors.userTitle);
const userLinkAddElement = document.querySelector(selectors.userLink);

const showPopupAdd = function () {
  userTitleAddElement.value = "";
  userLinkAddElement.value = "";
  
  popupAdd.classList.add(selectors.popupVision);
};

const closePopupAdd = function () {
  popupAdd.classList.remove(selectors.popupVision);
};

popupOpenAddButtonElement.addEventListener("click", showPopupAdd);
popupCloseAddButtonElement.addEventListener("click", closePopupAdd);


// Popup-Image

const popupImage = document.querySelector(selectors.popupImage);
const closeImage = document.querySelector(selectors.closeImage);
const link = document.querySelector(selectors.link);

const popupImageTitle = document.querySelector(selectors.titleImage)
const popupImagePicture = document.querySelector(selectors.pictureImage)

function showPopupImage(titleImage, image_src) {
  popupImage.classList.add(selectors.popupVision);
  // title
  popupImageTitle.textContent = titleImage;
  // source
  popupImagePicture.src = image_src;
  popupImagePicture.alt = titleImage;
}

function closePopupImage() {
  popupImage.classList.remove(selectors.popupVision);
}

closeImage.addEventListener("click", () => {
  closePopupImage();
});


// Template

const ul = document.querySelector(selectors.ul);

function createCard(name, link) {
  const elementTemplate = document.querySelector(selectors.template);
  const element = elementTemplate.content.querySelector(selectors.item);
  const newElement = element.cloneNode(true);

  const newElementName = newElement.querySelector(selectors.name);
  const newElementLink = newElement.querySelector(selectors.link);

  if (!name) {
    name = "Ошибка 404";
  }

  if (!link) {
    link = "images/default-image.png";
  }

  newElementName.textContent = name;
  newElementLink.src = link;
  newElementLink.alt = name;

  let buttonLike = newElement.querySelector(selectors.buttonLike);
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle(selectors.buttonLikeActive);
  });

  let buttonRemove = newElement.querySelector(selectors.buttonRemove);
  buttonRemove.addEventListener("click", () => {
    newElement.remove();
  });

  ul.prepend(newElement);

  newElementLink.addEventListener("click", () => {
    showPopupImage(name, link);
  });
}

function addUserElements() {
  popupAdd.addEventListener("submit", function (event) {
    event.preventDefault();
    createCard(userTitleAddElement.value, userLinkAddElement.value)
    closePopupAdd();
  });
}

function createIntialCards() {
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

  initialCards.forEach((card) => createCard(card.name, card.link));
}

addUserElements();
createIntialCards();
