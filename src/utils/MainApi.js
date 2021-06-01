class MainApi {
  constructor() {
    // this._url = "https://api-v1.movies.nomoredomains.club";
    this._ImageUrl = "https://api.nomoreparties.co";
    this._url = "http://localhost:3001";
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

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "GET",
    }).then(this._checkResponse);
  }

  deleteSavedMovie(token, movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "DELETE",
    }).then(this._checkResponse);
  }

  updateUserProfile(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  saveMovie(movie, token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: this._ImageUrl + movie.image.url,
        trailer: movie.trailerLink,
        thumbnail: this._ImageUrl + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
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

  signUp(email, password, name) {
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

  signIn(email, password) {
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

  validateUser(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "GET",
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
