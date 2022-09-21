export default class Card {
  constructor(name, link, cardSelectors, cardClasses, showPopupImage) {
    this.name = name;
    this.link = link;

    this.cardSelectors = cardSelectors;
    this.cardClasses = cardClasses;

    this.showPopupImage = showPopupImage;
  }

  _clickLike() {
    this.buttonLike.classList.toggle(this.cardClasses.buttonLikeActive);
  }

  _clickRemove() {
    this.newElement.remove();
    this.newElement = null;
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