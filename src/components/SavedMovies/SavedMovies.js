import './SavedMovies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = (props) => {
  const [queryError, setQueryError] = React.useState(false);
  return (
    <div>
      <SearchForm
        onUpdateSearch={props.onUpdateSearch}
        setQueryError={setQueryError}
        checkedState={props.checkedState}
        query={props.query}
      />
      <MoviesCardList
        cards={props.savedMovies}
        searchedMoviesError={props.searchedMoviesError}
        savedMovies={props.savedMovies}
        queryError={queryError}
        onDeleteCard={props.onDeleteCard}
        preloader={props.preloader}
      />
    </div>
  );
};

export default SavedMovies;
