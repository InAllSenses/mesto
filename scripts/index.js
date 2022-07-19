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
  buttonLikeActive: "element__heart_active"


};

const popupEdit = document.querySelector(selectors.popupEdit);
const popupAdd = document.querySelector(selectors.popupAdd);

const popupOpenEditButtonElement = document.querySelector(selectors.openEdit);
const popupCloseEditButtonElement =
  popupEdit.querySelector(selectors.closeEdit);
const popupOpenAddButtonElement = document.querySelector(selectors.openAdd);
const popupCloseAddButtonElement =
  popupAdd.querySelector(selectors.closeAdd);

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
  const template = document
    .querySelector(selectors.template)
    .content.querySelector(selectors.item)
    .cloneNode(true);
  template.querySelector(selectors.name).textContent = name;
  template.querySelector(selectors.link).src = link;

  let buttonLike = template.querySelector(selectors.buttonLike);

  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle(selectors.buttonLikeActive);
  });

  template
    .querySelector(selectors.buttonRemove)
    .addEventListener("click", () => {
      template.remove();
    });

  ul.appendChild(template);  
}

function addUserElements() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    createCard(input.value, userLinkAddElement.value);
    closePopupAdd();
  });
}



function createIntialCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach((card) => createCard(card.name, card.link));
}


addUserElements();
createIntialCards();
