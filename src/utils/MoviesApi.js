class MoviesApi {
  constructor(config) {
    this._url = config.url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}/beatfilm-movies`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._getResponse);
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co'
});

export default moviesApi;