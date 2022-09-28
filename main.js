(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,s){var l=e.id,u=e.name,a=e.link,c=e.likes,f=e.userId,p=e.ownerId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._id=l,this._name=u,this._link=a,this._likes=c,this._userId=f,this._ownerId=p,this._cardSelectors=n,this._cardClasses=r,this._clickImageCallback=o,this._clickRemoveCallback=i,this._clickLikeCallback=s}var n,r;return n=t,(r=[{key:"_isLiked",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._userId}))}},{key:"_clickLike",value:function(){this._clickLikeCallback(this._id,this._isLiked())}},{key:"_clickLink",value:function(){this._clickImageCallback(this._name,this._link)}},{key:"_clickRemove",value:function(){this._clickRemoveCallback(this)}},{key:"_refreshRemoveVisibility",value:function(){this._ownerId===this._userId&&this._buttonRemove.classList.add(this._cardClasses.buttonRemoveVisible)}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelectors.template).content.querySelector(this._cardSelectors.item).cloneNode(!0)}},{key:"_createCard",value:function(){this.newElement=this._getTemplate();var e=this.newElement.querySelector(this._cardSelectors.name);return this.newElementLink=this.newElement.querySelector(this._cardSelectors.link),this._likesCountElement=this.newElement.querySelector(this._cardSelectors.likesCount),e.textContent=this._name,this.newElementLink.src=this._link,this.newElementLink.alt=this._name,this.buttonLike=this.newElement.querySelector(this._cardSelectors.buttonLike),this._refreshLikeState(),this._buttonRemove=this.newElement.querySelector(this._cardSelectors.buttonRemove),this._refreshRemoveVisibility(),this.newElement}},{key:"_addEventListeners",value:function(){var e=this;this.buttonLike.addEventListener("click",(function(){e._clickLike()})),this._buttonRemove.addEventListener("click",(function(){e._clickRemove()})),this.newElementLink.addEventListener("click",(function(){e._clickLink()}))}},{key:"_refreshLikeState",value:function(){this._isLiked()?this.buttonLike.classList.add(this._cardClasses.buttonLikeActive):this.buttonLike.classList.remove(this._cardClasses.buttonLikeActive),this._likesCountElement.textContent=this._likes.length}},{key:"setLikesList",value:function(e){this._likes=e,this._refreshLikeState()}},{key:"getId",value:function(){return this._id}},{key:"deleteCard",value:function(){this.newElement.remove(),this.newElement=null}},{key:"createCard",value:function(){var e=this._createCard();return this._refreshLikeState(),this._addEventListeners(),e}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,r;return t=e,(r=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){var n=t.nameSelector,r=t.infoSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._infoElement=document.querySelector(r),this._avatarElement=document.querySelector(o),this._id=null}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,info:this._infoElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.info;this._nameElement.textContent=t,this._infoElement.textContent=n}},{key:"getAvatar",value:function(){return this._avatarElement.src}},{key:"setAvatar",value:function(e){this._avatarElement.src=e}},{key:"getId",value:function(){return this._id}},{key:"setId",value:function(e){this._id=e}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._formElement=n,this.buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector),this.inputList=this._getFormInputs()}var t,n;return t=e,(n=[{key:"_findErrorElement",value:function(e){var t=".".concat(e.id,"-error");return this._formElement.querySelector(t)}},{key:"_showInputError",value:function(e){var t=this._findErrorElement(e);t.classList.add(this._settings.errorVisibleClass),t.textContent=e.validationMessage,e.classList.add(this._settings.inputErrorClass)}},{key:"_hideInputError",value:function(e){this._findErrorElement(e).classList.remove(this._settings.errorVisibleClass),e.classList.remove(this._settings.inputErrorClass)}},{key:"_verifyInputState",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_getFormInputs",value:function(){var e=this._formElement.querySelectorAll(this._settings.inputSelector);return Array.from(e)}},{key:"_verifyButtonState",value:function(){this.inputList.some((function(e){return!e.validity.valid}))?(this.buttonElement.classList.add(this._settings.buttonDisabledClass),this.buttonElement.setAttribute("disabled","disabled")):(this.buttonElement.classList.remove(this._settings.buttonDisabledClass),this.buttonElement.removeAttribute("disabled"))}},{key:"_getFormButton",value:function(){return this._formElement.querySelector(this._settings.submitButtonSelector)}},{key:"_setInputListeners",value:function(e){var t=this;e.addEventListener("input",(function(){t._verifyInputState(e),t._verifyButtonState()}))}},{key:"enableValidation",value:function(){var e=this;this.inputList.forEach((function(t){e._setInputListeners(t)}))}},{key:"resetValidation",value:function(){var e=this;this.inputList.forEach((function(t){e._hideInputError(t)})),this._verifyButtonState()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){var n=t.popupSelector,r=t.closeSelector,o=t.visibleClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(n),this._closeButton=this._popup.querySelector(r),this._visiblePopupClass=o,this._handleOverlayClickBind=this._handleOverlayClick.bind(this),this._handleEscCloseBind=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add(this._visiblePopupClass),this._popup.addEventListener("click",this._handleOverlayClickBind),document.addEventListener("keydown",this._handleEscCloseBind)}},{key:"close",value:function(){this._popup.classList.remove(this._visiblePopupClass),this._popup.removeEventListener("click",this._handleOverlayClickBind),document.removeEventListener("keydown",this._handleEscCloseBind)}},{key:"setEventListeners",value:function(){this._closeButton.addEventListener("click",this.close.bind(this))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClick",value:function(e){e.target.classList.contains(this._visiblePopupClass)&&this.close()}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=h(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},p.apply(this,arguments)}function h(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function _(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function b(e){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},b(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=b(r);if(o){var n=b(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function s(e,t,n){var r,o=e.popupSelector,l=e.closeSelector,u=e.inputSelector,a=e.submitSelector,c=e.visibleClass;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(r=i.call(this,{popupSelector:o,closeSelector:l,visibleClass:c}))._submitCallback=t,r._inputList=r._popup.querySelectorAll(u),r._buttonSubmit=r._popup.querySelector(a),r._buttonTextDefault=r._buttonSubmit.textContent,r._buttonTextProcess="Сохранение...",r._setButtonTextCallback=n,r}return t=s,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setPopupInProcess",value:function(e){this._setButtonTextCallback(this._buttonSubmit,e,this._buttonTextDefault,this._buttonTextProcess)}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"resetForm",value:function(){this._inputList.forEach((function(e){e.value=""}))}},{key:"setEventListeners",value:function(){var e=this;p(b(s.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault();var n=e._getInputValues();e._submitCallback(n)}))}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(a);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function E(e,t){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},E(e,t)}function w(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function s(e,t,n){var r,o=e.popupSelector,l=e.closeSelector,u=e.visibleClass;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(r=i.call(this,{popupSelector:o,closeSelector:l,visibleClass:u}))._titleElement=document.querySelector(t),r._imageElement=document.querySelector(n),r}return t=s,(n=[{key:"open",value:function(e,t){this._titleElement.textContent=e,this._imageElement.src=t,this._imageElement.alt=e,k(g(s.prototype),"open",this).call(this)}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(a);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},O.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=T(e)););return e}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function R(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function T(e){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},T(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(s,e);var t,n,r,o,i=(r=s,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=T(r);if(o){var n=T(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return R(this,e)});function s(e,t,n){var r,o=e.popupSelector,l=e.closeSelector,u=e.submitSelector,a=e.visibleClass;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(r=i.call(this,{popupSelector:o,closeSelector:l,visibleClass:a}))._submitCallback=t,r._buttonSubmit=r._popup.querySelector(u),r._buttonTextDefault=r._buttonSubmit.textContent,r._buttonTextProcess="Удаление...",r._setButtonTextCallback=n,r}return t=s,(n=[{key:"setSubmitParameters",value:function(e){this._submitParameters=e}},{key:"setPopupInProcess",value:function(e){this._setButtonTextCallback(this._buttonSubmit,e,this._buttonTextDefault,this._buttonTextProcess)}},{key:"setEventListeners",value:function(){var e=this;O(T(s.prototype),"setEventListeners",this).call(this),this._buttonSubmit.addEventListener("click",(function(t){t.preventDefault(),e._submitCallback(e._submitParameters)}))}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),s}(a);function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var B=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._token=t,this._baseUrl=n,this._headers={authorization:this._token,"Content-Type":"application/json"}}var t,n;return t=e,(n=[{key:"_handleFetchResult",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUserInfo",value:function(){return fetch(this._baseUrl+"/users/me",{method:"GET",headers:this._headers}).then(this._handleFetchResult)}},{key:"patchUserInfo",value:function(e){var t=e.name,n=e.info;return fetch(this._baseUrl+"/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:n})}).then(this._handleFetchResult)}},{key:"patchAvatar",value:function(e){var t=e.link;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then(this._handleFetchResult)}},{key:"getInitialCards",value:function(){return fetch(this._baseUrl+"/cards",{method:"GET",headers:this._headers}).then(this._handleFetchResult)}},{key:"postNewCard",value:function(e){var t=e.name,n=e.link;return fetch(this._baseUrl+"/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:n})}).then(this._handleFetchResult)}},{key:"deleteCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e,{method:"DELETE",headers:this._headers}).then(this._handleFetchResult)}},{key:"putLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._handleFetchResult)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._handleFetchResult)}}])&&x(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),V={formSelector:".popup__information",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_error",errorVisibleClass:"popup__input-error_visible",buttonDisabledClass:"popup__button_disabled"},U=".popup__input",A=".popup-edit",D=".popup-avatar",F=".popup-add",N=".popup__close",J="popup_opened",G={template:".template__element",item:".element",name:".element__title",link:".element__image",buttonRemove:".element__trashcan",buttonLike:".element__heart",likesCount:".element__like-count"},H={buttonLikeActive:"element__heart_active",buttonRemoveVisible:"element__trashcan_visible"},z=function(e,t,n,r){e.textContent=t?r:n};function M(e){var t=e.querySelector(V.formSelector);return new l(V,t)}function K(e){var n={id:e._id,name:e.name,link:e.link,likes:e.likes,userId:Q.getId(),ownerId:e.owner._id},r=new t(n,G,H,(function(){re.open(e.name,e.link)}),(function(e){ne.setSubmitParameters(e),ne.setPopupInProcess(!1),ne.open()}),(function(e,t){(function(e,t){return t?oe.deleteLike(e):oe.putLike(e)})(e,t).then((function(e){r.setLikesList(e.likes)})).catch((function(e){console.log(e)}))}));return r.createCard()}var Q=new i({nameSelector:".profile__title",infoSelector:".profile__subtitle",avatarSelector:".profile__image"}),W=M(document.querySelector(A));W.enableValidation();var X=new y({popupSelector:A,closeSelector:".popup-edit__close",inputSelector:U,submitSelector:V.submitButtonSelector,visibleClass:J},(function(e){X.setPopupInProcess(!0),oe.patchUserInfo({name:e["field-name"],info:e["field-profession"]}).then((function(e){Q.setUserInfo({name:e.name,info:e.about})})).catch((function(e){console.log(e)})).finally((function(){X.close()}))}),z);X.setEventListeners(),document.querySelector(".profile__edit").addEventListener("click",(function(){var e=Q.getUserInfo(),t={};t["field-name"]=e.name,t["field-profession"]=e.info,X.setInputValues(t),X.setPopupInProcess(!1),X.open(),W.resetValidation()}));var Y=M(document.querySelector(D));Y.enableValidation();var Z=new y({popupSelector:D,closeSelector:N,inputSelector:U,submitSelector:V.submitButtonSelector,visibleClass:J},(function(e){Z.setPopupInProcess(!0),oe.patchAvatar({link:e["field-avatar"]}).then((function(e){Q.setAvatar(e.avatar)})).catch((function(e){console.log(e)})).finally((function(){Z.close()}))}),z);Z.setEventListeners(),document.querySelector(".profile__avatar-edit").addEventListener("click",(function(e){var t={};t["field-avatar"]=Q.getAvatar(),Z.setInputValues(t),Z.setPopupInProcess(!1),Z.open(),Y.resetValidation()}));var $=new r((function(e){var t=K(e);$.appendItem(t)}),".elements__grid"),ee=M(document.querySelector(F));ee.enableValidation();var te=new y({popupSelector:F,closeSelector:".popup-add__close",inputSelector:U,submitSelector:V.submitButtonSelector,visibleClass:J},(function(e){te.setPopupInProcess(!0),oe.postNewCard({name:e["field-title"],link:e["field-link"]}).then((function(e){var t=K(e);$.prependItem(t)})).catch((function(e){console.log(e)})).finally((function(){te.close()}))}),z);te.setEventListeners();var ne=new q({popupSelector:".popup-delete",closeSelector:N,submitSelector:V.submitButtonSelector,visibleClass:J},(function(e){ne.setPopupInProcess(!0),oe.deleteCard(e.getId()).then((function(t){e.deleteCard()})).catch((function(e){console.log(e)})).finally((function(){ne.close()}))}),z);ne.setEventListeners(),document.querySelector(".profile__add").addEventListener("click",(function(){te.resetForm(),te.setPopupInProcess(!1),te.open(),ee.resetValidation()}));var re=new C({popupSelector:".popup-image",closeSelector:".popup-image__close",visibleClass:J},".popup-image__title",".popup-image__picture");re.setEventListeners();var oe=new B("1131d0bd-5b8f-45fb-8061-570667973a92","https://mesto.nomoreparties.co/v1/cohort-50");oe.getUserInfo().then((function(e){Q.setUserInfo({name:e.name,info:e.about}),Q.setAvatar(e.avatar),Q.setId(e._id)})).then((function(){return oe.getInitialCards()})).then((function(e){$.renderItems(e)})).catch((function(e){console.log(e)}))})();