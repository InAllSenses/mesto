export default class Card {
  constructor({id, name, link, likesCount}, cardSelectors, cardClasses, clickImageCallback, clickRemoveCallback) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likesCount = likesCount

    this.cardSelectors = cardSelectors;
    this.cardClasses = cardClasses;

    this._clickImageCallback = clickImageCallback;
    this._clickRemoveCallback = clickRemoveCallback;
  }

  _clickLike() {
    this.buttonLike.classList.toggle(this.cardClasses.buttonLikeActive);
  }

  _clickRemove() {
    this.newElement.remove();
    this.newElement = null;
  }

  _clickLink() {
    this._clickImageCallback(this._name, this._link);
  }

  _clickRemove() {
    this._clickRemoveCallback(this._id);
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
    this._likesCountElement = this.newElement.querySelector(
      this.cardSelectors.likesCount
    );

    // image
    newElementName.textContent = this._name;
    this.newElementLink.src = this._link;
    this.newElementLink.alt = this._name;

    // like
    this._likesCountElement.textContent = this._likesCount;

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