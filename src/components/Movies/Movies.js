import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../utils/constants';

const Movies = () => {
  return (
    <div>
      <SearchForm />
      <Preloader />
      <MoviesCardList cards={movies} />
    </div>
  );
};

export default Movies;
