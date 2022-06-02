import './MoviesCardList.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
  maxWidth,
  lowWidth,
  maxWidthElements,
  mediumWidthElements,
  minWidthElements,
  maxWidthMore,
  minWidthMore,
} from '../../utils/constants';

const MoviesCardList = (props) => {
  const cards = props.cards;

  const location = useLocation().pathname;

  const [maxCards, setMaxCards] = useState(0);

  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  function useCurrentWidth() {
    let [width, setWidth] = useState(getWidth());
    useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWidth(getWidth()), 150);
      };
      window.addEventListener('resize', resizeListener);
      return () => {
        window.removeEventListener('resize', resizeListener);
      };
    }, []);

    return width;
  }

  let width = useCurrentWidth();

  useEffect(() => {
    if (width > maxWidth) {
      setMaxCards(maxWidthElements);
    } else if (width < maxWidth && width > lowWidth) {
      setMaxCards(mediumWidthElements);
    } else if (width < minWidthElements) {
      setMaxCards(minWidthElements);
    }
  }, [width]);

  function handleClickButton() {
    if (width > maxWidth) {
      setMaxCards(maxCards + maxWidthMore);
    } else if (width < maxWidth) {
      setMaxCards(maxCards + minWidthMore);
    }
  }

  const displayedMovies = cards.filter((card, index) => index < maxCards);

  return (
    <div className='movies-cardlist'>
      {props.preloader && !props.searchedMoviesError ? (
        <Preloader />
      ) : (
        <ul
          className={`movies-cardlist__elements ${
            location === '/saved-movies'
              ? 'movies-cardlist__elements_saved-movies'
              : ''
          } ${
            props.searchedMoviesError || cards.length === 0
              ? 'movies-cardlist__elements_error'
              : ''
          }`}
        >
          {props.searchedMoviesError ? (
            <p className='movies-cardlist__error-message'>
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз.
            </p>
          ) : (
            <></>
          )}
          {props.queryError &&
          cards.length === 0 &&
          !props.searchedMoviesError ? (
            <p className='movies-cardlist__error-message'>
              Нужно ввести ключевое слово
            </p>
          ) : (
            <></>
          )}
          {!props.queryError &&
          !props.searchedMoviesError &&
          cards.length === 0 ? (
            <p className='movies-cardlist__error-message'>Ничего не найдено</p>
          ) : !props.searchedMoviesError ? (
            displayedMovies.map((card) => (
              <MoviesCard
                key={card.id || card._id}
                card={card}
                savedMovies={props.savedMovies}
                onSaveCard={props.onSaveCard}
                onDeleteCard={props.onDeleteCard}
              />
            ))
          ) : (
            <></>
          )}
        </ul>
      )}
      {cards.length > 0 &&
      cards.length > maxCards &&
      !props.searchedMoviesError &&
      !props.preloader ? (
        <button className='movies-cardlist__button' onClick={handleClickButton}>
          Еще
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MoviesCardList;
