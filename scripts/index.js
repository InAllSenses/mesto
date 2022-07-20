const selectors = {
  popupAdd: ".popup__add",
  popupEdit: ".popup__edit",
  openEdit: ".profile__edit",
  openAdd: ".profile__add",
  closeEdit: ".popup__close-edit",
  closeAdd: ".popup__close-add",
  nameEdit: ".profile__title",
  jobEdit: ".profile__subtitle",
  userName: ".popup__input_type_name",
  userJob: ".popup__input_type_profession",
  userTitle: ".popup__input_type_title",
  userLink: ".popup__input_type_link",
  popupVision: "popup_opened",

  form: ".popup__add",
  input: ".popup__input_type_title",
  ul: ".elements__grid",
  template: ".element-default-card",
  item: ".element",
  name: ".element__title",
  link: ".element__image",
  buttonRemove: ".element__trashcan",
  buttonLike: ".element__heart",
  buttonLikeActive: "element__heart_active",
  imageContain: ".popup-image__container",
  imageClose: ".popup-image__close",
  popupImage: ".popup-image",

  image_title: ".popup-image__title",
  image_image: ".popup-image__image"
};

const popupEdit = document.querySelector(selectors.popupEdit);
const popupAdd = document.querySelector(selectors.popupAdd);

const popupOpenEditButtonElement = document.querySelector(selectors.openEdit);
const popupCloseEditButtonElement = popupEdit.querySelector(
  selectors.closeEdit
);
const popupOpenAddButtonElement = document.querySelector(selectors.openAdd);
const popupCloseAddButtonElement = popupAdd.querySelector(selectors.closeAdd);

const nameEditElement = document.querySelector(selectors.nameEdit);
const userNameEditElement = document.querySelector(selectors.userName);

const jobEditElement = document.querySelector(selectors.jobEdit);
const userJobEditElement = document.querySelector(selectors.userJob);

const userTitleAddElement = document.querySelector(selectors.userTitle);
const userLinkAddElement = document.querySelector(selectors.userLink);

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

const showPopupAdd = function () {
  userTitleAddElement.getAttribute("");
  userLinkAddElement.getAttribute("");
  popupAdd.classList.add(selectors.popupVision);
};

const closePopupAdd = function () {
  popupAdd.classList.remove(selectors.popupVision);
};

popupOpenEditButtonElement.addEventListener("click", showPopupEdit);
popupCloseEditButtonElement.addEventListener("click", closePopupEdit);

popupOpenAddButtonElement.addEventListener("click", showPopupAdd);
popupCloseAddButtonElement.addEventListener("click", closePopupAdd);

// let formEditElement = document.querySelector(".popup__container-edit");

// function formSubmitHandler(evt) {
//   evt.preventDefault();

//   applyPopupEdit();
// }

// formEditElement.addEventListener("submit", formSubmitHandler);

// const deleteButton = document.querySelector(".element__trashcan");

// deleteButton.addEventListener("click", function () {
//   const deleteElement = deleteButton.closest(".element");
//   deleteElement.remove();
// });

const form = document.querySelector(selectors.form);
const input = form.querySelector(selectors.input);
const ul = document.querySelector(selectors.ul);

function createCard(name, link) {
  // make new element
  const element_template = document.querySelector(selectors.template);
  const element = element_template.content.querySelector(selectors.item);
  const new_element = element.cloneNode(true);

  const new_element_name = new_element.querySelector(selectors.name);
  const new_element_link = new_element.querySelector(selectors.link);

  // fill new element
  new_element_name.textContent = name;
  new_element_link.src = link;
  new_element_link.alt = name;

  // events
  // like
  let buttonLike = new_element.querySelector(selectors.buttonLike);
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle(selectors.buttonLikeActive);
  });

  // close
  let buttonRemove = new_element.querySelector(selectors.buttonRemove);
  buttonRemove.addEventListener("click", () => {
    new_element.remove();
  });

  // put element
  ul.prepend(new_element);

  // open image
  new_element_link.addEventListener("click", () => {
    showPopupImage(name, link);
  });
}

function addUserElements() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    createCard(userTitleAddElement.value, userLinkAddElement.value);
    closePopupAdd();
  });
}

// popop Image
const popupImage = document.querySelector(selectors.popupImage);
const imageContain = document.querySelector(selectors.imageContain);
const imageClose = document.querySelector(selectors.imageClose);
const link = document.querySelector(selectors.link);

const popupImageTitle = document.querySelector(selectors.image_title)
const popupImageImage = document.querySelector(selectors.image_image)

function showPopupImage(image_title, image_src) {
  popupImage.classList.add(selectors.popupVision);
  // title
  popupImageTitle.textContent = image_title;
  // source
  popupImageImage.src = image_src;
  popupImageImage.alt = image_title;
}

function closePopupImage() {
  popupImage.classList.remove(selectors.popupVision);
}

imageClose.addEventListener("click", () => {
  closePopupImage();
});


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
