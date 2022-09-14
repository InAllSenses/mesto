class Card {
  constructor(name, link, templSelector, showPopupImage) {
    this.name = name;
    this.link = link;
    this.templSelector = templSelector;
    this.showPopupImage = showPopupImage;

    this.cardSelectors = {
      template: templSelector,
      item: ".element",
      name: ".element__title",
      link: ".element__image",

      buttonRemove: ".element__trashcan",
      buttonLike: ".element__heart",
    };

    this.cardClasses = {
      buttonLikeActive: "element__heart_active",
    };
  }

  _clickLike() {
    this.buttonLike.classList.toggle(this.cardClasses.buttonLikeActive);
  }

  _clickRemove() {
    this.newElement.remove();
  }

  _clickLink() {
    this.showPopupImage(this.name, this.link);
  }

  _createCard() {
    const elementTemplate = document.querySelector(this.cardSelectors.template);
    const element = elementTemplate.content.querySelector(
      this.cardSelectors.item
    );
    this.newElement = element.cloneNode(true);

    this.buttonLike = this.newElement.querySelector(this.cardSelectors.buttonLike);

    const newElementName = this.newElement.querySelector(
      this.cardSelectors.name
    );
    this.newElementLink = this.newElement.querySelector(
      this.cardSelectors.link
    );

    newElementName.textContent = this.name;
    this.newElementLink.src = this.link;
    this.newElementLink.alt = this.name;

    return this.newElement;
  }

  _addEventListeners() {
    this.buttonLike.addEventListener("click", () => { this._clickLike(); });

    const buttonRemove = this.newElement.querySelector(this.cardSelectors.buttonRemove);
    buttonRemove.addEventListener("click", () => { this._clickRemove(); });

    this.newElementLink.addEventListener("click", () => { this._clickLink(); });
  }

  createCard() {
    const newCard = this._createCard();
    this._addEventListeners();
    return newCard;
  }
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

export { Card, initialCards };