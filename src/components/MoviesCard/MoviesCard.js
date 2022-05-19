import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


const MoviesCard = (props) => {
  const card = props.card;
  const location = useLocation();
  return (
    <div className='movie-card'>
      <img className='movie-card__image' src={card.src} alt={card.name} />
      <div className='movie-card__caption'>
        <p className='movie-card__name'>{card.name}</p>
        <p className='movie-card__duration'>{card.duration}</p>
      </div>
      {location.pathname === '/saved-movies' && (
        <button className='movie-card__button movie-card__button_delete'>
          
        </button>
      )}
      {location.pathname === '/movies' && (
        <button
         className={`movie-card__button ${card.liked ? 'movie-card__button_like' : 'movie-card__button_save'}`}>
        </button>
      )}
    </div>
  );
};

export default MoviesCard;
