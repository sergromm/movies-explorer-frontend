class MainApi {
  constructor() {
    this._url = "https://api-v1.movies.nomoredomains.club";
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.json());
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    }).then(this._checkResponse);
  }

  editUserProfile(username, description) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        name: username,
        about: description,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  addNewPost(name, link) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  likePost(isLiked, cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: isLiked ? "DELETE" : "PUT",
    }).then(this._checkResponse);
  }

  deletePost(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
    }).then(this._checkResponse);
  }

  register(email, password, name) {
    return fetch(`${this._url}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResponse);
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
      credentials: "include",
    });
  }

  validateUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
