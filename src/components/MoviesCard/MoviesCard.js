import React from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import getTimeFromMins from '../../utils/conversionTime';
import './MoviesCard.css';

const MoviesCard = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const card = props.card;
  const savedMovies = props.savedMovies;
  const isSaved = savedMovies.some(
    (id) => id.movieId === card.id && id.owner === currentUser._id
  );

  const location = useLocation().pathname;

  function handleClick() {
    props.onSaveCard(card);
  }

  function handleDeleteCard() {
    props.onDeleteCard(card);
  }

  return (
    <div className='movie-card'>
      <a target='_blank' rel='noreferrer' href={card.trailerLink}>
        <img
          className='movie-card__image'
          src={`${
            card.image.url === undefined
              ? card.image
              : 'https://api.nomoreparties.co' + card.image.url
          }`}
          alt={card.image.name === undefined ? card.nameRU : card.image.name}
        />
      </a>

      <div className='movie-card__caption'>
        <p className='movie-card__name'>{card.nameRU}</p>
        <p className='movie-card__duration'>{getTimeFromMins(card.duration)}</p>
      </div>
      {location === '/saved-movies' && (
        <button
          className='movie-card__button movie-card__button_delete'
          onClick={handleDeleteCard}
        ></button>
      )}
      {location === '/movies' && (
        <button
          onClick={handleClick}
          className={`movie-card__button ${
            isSaved ? 'movie-card__button_save' : 'movie-card__button_like'
          }`}
        ></button>
      )}
    </div>
  );
};

export default MoviesCard;
