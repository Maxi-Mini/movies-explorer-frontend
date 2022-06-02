class Api {
  constructor(config) {
    this._url = config.url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.login,
      }),
    }).then(this._getResponse);
  }

  saveMovie(card) {
    const urlTumbnail = `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;
    const urlImage = `https://api.nomoreparties.co${card.image.url}`;
    const nameEN = card.nameEN === "" ? card.nameRU : card.nameEN;
    const country = card.country === null ? "Undefined" : card.country;
    
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        nameRU: card.nameRU,
        nameEN: nameEN,
        trailerLink: card.trailerLink,
        thumbnail: urlTumbnail,
        image: urlImage,
        country: country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        movieId: card.id
      }),
    }).then(this._getResponse);
  }

  deleteMovie(cardID) {
    return fetch(`${this._url}/movies/${cardID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        movieId: cardID
      })
    }).then(this._getResponse);
  }
}

export const api = new Api({
  // url: 'https://diploma.backend.nomoredomains.xyz',
  url: 'http://localhost:3001',
});

export default api;
