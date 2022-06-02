import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = (props) => {
  const [queryError, setQueryError] = React.useState(true);
  return (
    <div>
      <SearchForm
        onUpdateSearch={props.onUpdateSearch}
        setQueryError={setQueryError}
        checkedState={props.checkedState}
        query={props.query}
      />
      <MoviesCardList
        cards={props.searchedMovies}
        savedMovies={props.savedMovies}
        onSaveCard={props.onSaveCard}
        searchedMoviesError={props.searchedMoviesError}
        queryError={queryError}
        preloader={props.preloader}
      />
    </div>
  );
};

export default Movies;
