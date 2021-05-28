class MoviesApi {
  constructor(url) {
    this._beatURL = "https://api.nomoreparties.co/beatfilm-movies";
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.json());
    }
  }

  getFilmsList() {
    return fetch(`${this._beatURL}`, {
      method: "GET",
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi();

export default moviesApi;
