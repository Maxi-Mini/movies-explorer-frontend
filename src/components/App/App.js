import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import { shortFilmTiming } from '../../utils/constants';

const {
  badRequestError,
  conflictError,
  forbiddenError,
  notFoundError,
  unathorizedError,
  internalServerMessage,
  invalidFilmDataMessage,
  invalidIdMessage,
  invalidUpdateDataMessage,
  invalidCreateDataMessage,
  filmIdNotFoundMessage,
  userIdNotFoundMessage,
  deleteForeignFilmMessage,
  emailIsUsedMessage,
  wrongEmailOrPassword,
} = require('../../utils/errrors');

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [preloader, setPreloader] = useState(true);
  const [movies, setMovies] = useState([]);
  
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [errorTooltipPopup, setErrorTooltipPopup] = useState('');
  const [blockForm, setBlockForm] = useState(false);
  const [apiError, setApiError] = useState('');
  const [searchedMoviesError, setSearchedMoviesError] = useState(false);
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [apiSuccess, setApiSuccess] = useState(false);
  const [checkedState, setCheckedState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    setTimeout(() => {
      tokenCheck();
    }, 100);

    const checkedStateLocal = JSON.parse(
      localStorage.getItem('checkedState') || 'false'
    );
    setCheckedState(checkedStateLocal);
    const queryLocal = JSON.parse(localStorage.getItem('query'));
    setQuery(queryLocal);
    const moviesLocal = JSON.parse(localStorage.getItem('movies') || '[]');
    setMovies(moviesLocal);
    const savedMoviesLocal = JSON.parse(
      localStorage.getItem('savedMovies') || '[]'
    );
    setSavedMovies(savedMoviesLocal);
    const filteredMoviesLocal = JSON.parse(
      localStorage.getItem('filteredMovies') || '[]'
    );
    setFilteredMovies(filteredMoviesLocal);
    const profileDataLocal = JSON.parse(
      localStorage.getItem('profileData') || '[]'
    );
    setCurrentUser(profileDataLocal);
  }, []);

  useEffect(() => {
    const checkedStateLocal = JSON.parse(
      localStorage.getItem('checkedState') || 'false'
    );
    setCheckedState(checkedStateLocal);
    const queryLocal = JSON.parse(localStorage.getItem('query'));
    setQuery(queryLocal);
  }, [location]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((profileData) => {
          setErrorTooltipPopup('');
          setCurrentUser(profileData);
          localStorage.setItem('profileData', JSON.stringify(profileData));
        })
        .catch((err) => {
          if (err === notFoundError) {
            setErrorTooltipPopup(userIdNotFoundMessage);
          } else {
            setErrorTooltipPopup(internalServerMessage);
          }
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      moviesApi
        .getCards()
        .then((movies) => {
          setErrorTooltipPopup('');
          setPreloader(false);
          setMovies(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(`Ошибка инициализации фильмов: ${err}`);
          setErrorTooltipPopup(true);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setFilteredSavedMovies(filterSavedCards());
  }, [savedMovies]);

  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      api
        .getMovies()
        .then((movies) => {
          setErrorTooltipPopup('');
          setPreloader(false);
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setErrorTooltipPopup(internalServerMessage);
        });
    }
  }, [loggedIn, movies]);

  function handleRegister(data) {
    setBlockForm(true);
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setApiError('');
          handleLogin(data);
        }
      })
      .catch((err) => {
        if (err === conflictError) {
          setApiError(emailIsUsedMessage);
        } else if (err === badRequestError) {
          setApiError(invalidCreateDataMessage);
        } else {
          setApiError(internalServerMessage);
        }
      })
      .finally(() => setBlockForm(false));
  }

  function handleLogin(data) {
    setBlockForm(true);
    auth
      .authorize(data)
      .then((authData) => {
        if (authData.token) {
          setApiError('');
          localStorage.setItem('token', authData.token);
          setLoggedIn(true);
          setEmail(data.Login);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if (err === unathorizedError) {
          setApiError(wrongEmailOrPassword);
        } else {
          setApiError(internalServerMessage);
        }
      })
      .finally(() => setBlockForm(false));
  }

  function handleUpdateUser(user) {
    setBlockForm(true);
    api
      .setUserInfo(user)
      console.log('update')
      .then((user) => {
        setApiError('');
        setCurrentUser(user);
        setApiSuccess(true);
      })
      .catch((err) => {
        if (err === conflictError) {
          setApiError(emailIsUsedMessage);
        } else if (err === badRequestError) {
          setApiError(invalidUpdateDataMessage);
        } else if (err === notFoundError) {
          setApiError(userIdNotFoundMessage);
        } else {
          setApiError(internalServerMessage);
        }
      })
      .finally(() => setBlockForm(false));
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch(() => {
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }

  const closeAllPopups = () => {
    setErrorTooltipPopup('');
  };

  function handleUpdateSearch(search, checkedState, location) {
    setPreloader(true);
    setTimeout(() => {
      if (search !== '') {
        if (location === '/movies') {
          const searchMovies = movies.filter(
            (el) => el.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
          setPreloader(false);
          setFilteredMovies(searchMovies);
          localStorage.setItem('filteredMovies', JSON.stringify(searchMovies));
          localStorage.setItem('query', JSON.stringify(search));
          checkQueryShort(checkedState, searchMovies, location);
        } else if (location === '/saved-movies') {
          setPreloader(false);
          const cards = filterSavedCards();
          const searchMovies = cards.filter(
            (el) => el.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
          setFilteredSavedMovies(searchMovies);
          checkQueryShort(checkedState, searchMovies, location);
        }
      } else {
        if (location === '/movies') {
          setPreloader(false);
          setFilteredMovies([]);
          localStorage.setItem('filteredMovies', JSON.stringify([]));
          localStorage.setItem('query', JSON.stringify(search));
        } else if (location === '/saved-movies') {
          const cards = filterSavedCards();
          setPreloader(false);
          setFilteredSavedMovies(cards);
          checkQueryShort(checkedState, filteredSavedMovies, location);
        }
      }
    }, 500);
  }

  function filterSavedCards() {
    const cards = movies
      .map((c) => {
        const [cards_filtered] = savedMovies.filter(
          (m) => c.id === m.movieId && m.owner === currentUser._id
        );
        return cards_filtered;
      })
      .filter((card) => card !== undefined);
    return cards;
  }

  function checkQueryShort(checkedState, searchMovies, location) {
    if (checkedState) {
      const queryShort = searchMovies.filter(
        (el) => el.duration < shortFilmTiming
      );
      if (location === '/movies') {
        setFilteredMovies(queryShort);
        localStorage.setItem('filteredMovies', JSON.stringify(queryShort));
        localStorage.setItem('checkedState', JSON.stringify(true));
      } else if (location === '/saved-movies') {
        setFilteredSavedMovies(queryShort);
      }
    } else {
      localStorage.setItem('checkedState', JSON.stringify(false));
    }
  }

  function handleSaveCard(card) {
    const isSaved = savedMovies.some(
      (id) => id.movieId === card.id && id.owner === currentUser._id
    );
    const [savedMoviesId] = savedMovies.filter((id) => id.movieId === card.id);

    if (!isSaved) {
      api
        .saveMovie(card, !isSaved)
        .then((newMovie) => {
          setErrorTooltipPopup('');
          setSavedMovies([...savedMovies, newMovie]);
          localStorage.setItem(
            'savedMovies',
            JSON.stringify([...savedMovies, newMovie])
          );
        })
        .catch((err) => {
          if (err === badRequestError) {
            setErrorTooltipPopup(invalidFilmDataMessage);
          } else {
            setErrorTooltipPopup(internalServerMessage);
          }
        });
    } else {
      api
        .deleteMovie(savedMoviesId._id, isSaved)
        .then(() => {
          setErrorTooltipPopup('');
          setSavedMovies(savedMovies.filter((id) => id.movieId !== card.id));
          localStorage.setItem(
            'savedMovies',
            JSON.stringify(savedMovies.filter((id) => id.movieId !== card.id))
          );
        })
        .catch((err) => {
          if (err === badRequestError) {
            setErrorTooltipPopup(invalidIdMessage);
          } else if (err === notFoundError) {
            setErrorTooltipPopup(filmIdNotFoundMessage);
          } else if (err === forbiddenError) {
            setErrorTooltipPopup(deleteForeignFilmMessage);
          } else {
            setErrorTooltipPopup(internalServerMessage);
          }
        });
      console.log('err');
    }
  }

  function handleDeleteCard(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setErrorTooltipPopup('');
        setSavedMovies(savedMovies.filter((c) => c._id !== card._id));
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(savedMovies.filter((c) => c._id !== card._id))
        );
      })
      .catch((err) => {
        if (err === badRequestError) {
          setErrorTooltipPopup(invalidIdMessage);
        } else if (err === notFoundError) {
          setErrorTooltipPopup(filmIdNotFoundMessage);
        } else if (err === forbiddenError) {
          setErrorTooltipPopup(deleteForeignFilmMessage);
        } else {
          setErrorTooltipPopup(internalServerMessage);
        }
      });
  }

  function handleClickExit() {
    localStorage.clear();
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <>
                <Header />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Movies}
                  searchedMovies={filteredMovies}
                  searchedMoviesError={searchedMoviesError}
                  onUpdateSearch={handleUpdateSearch}
                  onSaveCard={handleSaveCard}
                  savedMovies={savedMovies}
                  preloader={preloader}
                  checkedState={checkedState}
                  query={query}
                />
                <Footer />
              </>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <>
                <Header />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={SavedMovies}
                  searchedMovies={filteredSavedMovies}
                  searchedMoviesError={searchedMoviesError}
                  onUpdateSearch={handleUpdateSearch}
                  onDeleteCard={handleDeleteCard}
                  savedMovies={savedMovies}
                  preloader={preloader}
                  checkedState={false}
                  query={''}
                />
                <Footer />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <Header />
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  email={email}
                  onClick={handleClickExit}
                  apiError={apiError}
                  apiSuccess={apiSuccess}
                  setApiError={setApiError}
                  setApiSuccess={setApiSuccess}
                  handleUpdateUser={handleUpdateUser}
                  blockForm={blockForm}
                />
              </>
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                handleRegister={handleRegister}
                registerError={apiError}
                setApiError={setApiError}
                blockForm={blockForm}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                handleLogin={handleLogin}
                registerError={apiError}
                setApiError={setApiError}
                blockForm={blockForm}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <InfoTooltip isOpen={errorTooltipPopup} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};

export default App;
