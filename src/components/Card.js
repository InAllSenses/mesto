export default class Card {
  constructor({id, name, link, likes, userId, ownerId}, cardSelectors, cardClasses, clickImageCallback, clickRemoveCallback, clickLikeCallback) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = userId;
    this._ownerId = ownerId;

    this._cardSelectors = cardSelectors;
    this._cardClasses = cardClasses;

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
  }

  _clickLink() {
    this._clickImageCallback(this._name, this._link);
  }

  _clickRemove() {
    this._clickRemoveCallback(this);
  }

  _refreshRemoveVisibility() {
    if (this._ownerId === this._userId) {
      this._buttonRemove.classList.add(this._cardClasses.buttonRemoveVisible);
    }
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._cardSelectors.template);
    const element = elementTemplate.content.querySelector(this._cardSelectors.item);

    return element.cloneNode(true);
  }

  _createCard() {
    this.newElement = this._getTemplate();

    const newElementName = this.newElement.querySelector(
      this._cardSelectors.name
    );
    this.newElementLink = this.newElement.querySelector(
      this._cardSelectors.link
    );
    this._likesCountElement = this.newElement.querySelector(
      this._cardSelectors.likesCount
    );

    // image
    newElementName.textContent = this._name;
    this.newElementLink.src = this._link;
    this.newElementLink.alt = this._name;

    // like
    this.buttonLike = this.newElement.querySelector(this._cardSelectors.buttonLike);
    this._refreshLikeState();

    // remove
    this._buttonRemove = this.newElement.querySelector(this._cardSelectors.buttonRemove);
    this._refreshRemoveVisibility();

    return this.newElement;
  }

  _addEventListeners() {
    this.buttonLike.addEventListener("click", () => { this._clickLike(); });
    this._buttonRemove.addEventListener("click", () => { this._clickRemove(); });

    this.newElementLink.addEventListener("click", () => { this._clickLink(); });
  }

  _refreshLikeState() {
    if (this._isLiked()) {
      this.buttonLike.classList.add(this._cardClasses.buttonLikeActive);
    }
    else {
      this.buttonLike.classList.remove(this._cardClasses.buttonLikeActive);
    }

    this._likesCountElement.textContent = this._likes.length;
  }

  setLikesList(likes) {
    this._likes = likes;
    this._refreshLikeState();
  }

  getId() {
    return this._id;
  }

  deleteCard() {
    this.newElement.remove();
    this.newElement = null;
  }

  createCard() {
    const newCard = this._createCard();
    this._refreshLikeState();
    this._addEventListeners();
    return newCard;
  }
}