import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
  const cards = props.cards;
  return (
    <div className='movies-cardlist__border'>
      <div className='movies-cardlist'>
        {cards.map((card) => (
          <MoviesCard card={card} key={card._id} />
        ))}
      </div>
      <button className='movies-cardlist__button'>Ещё</button>
    </div>
  );
};

export default MoviesCardList;
