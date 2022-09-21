export default class Api {
  constructor(token, baseUrl) {
    this._token = token;
    this._baseUrl = baseUrl
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/me", {
      method: "GET",
      headers: {
        authorization: this._token,
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);

    }).catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
  }
}
