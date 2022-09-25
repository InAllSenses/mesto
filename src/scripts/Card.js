export default class Card {
  constructor({id, name, link, likes, userId}, cardSelectors, cardClasses, clickImageCallback, clickRemoveCallback, clickLikeCallback) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = userId;

    this.cardSelectors = cardSelectors;
    this.cardClasses = cardClasses;

    this._clickImageCallback = clickImageCallback;
    this._clickRemoveCallback = clickRemoveCallback;
    this._clickLikeCallback = clickLikeCallback;
  }

  _isLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  _clickLike() {
    this._clickLikeCallback(this._id, this._isLiked());
    // this.buttonLike.classList.toggle(this.cardClasses.buttonLikeActive);
  }

  _clickLink() {
    this._clickImageCallback(this._name, this._link);
  }

  _clickRemove() {
    this._clickRemoveCallback(this._id);
    // this.newElement.remove();
    // this.newElement = null;
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
    this._refreshLikeState();

    return this.newElement;
  }

  _addEventListeners() {
    this.buttonLike.addEventListener("click", () => { this._clickLike(); });

    const buttonRemove = this.newElement.querySelector(this.cardSelectors.buttonRemove);
    buttonRemove.addEventListener("click", () => { this._clickRemove(); });

    this.newElementLink.addEventListener("click", () => { this._clickLink(); });
  }

  _refreshLikeState() {
    if (this._isLiked()) {
      this.buttonLike.classList.add(this.cardClasses.buttonLikeActive);
    }
    else {
      this.buttonLike.classList.remove(this.cardClasses.buttonLikeActive);
    }

    this._likesCountElement.textContent = this._likes.length;
  }

  setLikesList(likes) {
    this._likes = likes;
    this._refreshLikeState();
  }

  createCard() {
    const newCard = this._createCard();
    this._refreshLikeState();
    this._addEventListeners();
    return newCard;
  }
}