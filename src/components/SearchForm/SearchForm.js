import './SearchForm.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchForm = (props) => {
  const location = useLocation().pathname;
  const [query, setQuery] = React.useState(props.query);
  const [checkedState, setCheckedState] = React.useState(props.checkedState);

  function handleSubmit(e) {
    e.preventDefault();
    if (query === '') {
      props.setQueryError(true);
      props.onUpdateSearch(query, checkedState, location);
    } else {
      props.setQueryError(false);
      props.onUpdateSearch(query, checkedState, location);
    }
  }

  function handleSearchChange(e) {
    setQuery(e.target.value);
  }

  function handleSearchChangeShort(e) {
    if (!checkedState) {
      setCheckedState(true);
    } else {
      setCheckedState(false);
    }
  }

  return (
    <form className='searchform' onSubmit={handleSubmit}>
      <div className='searchform__search'>
        <input
          placeholder='Фильм'
          className='searchform__input'
          type='search'
          id='search'
          value={query || ''}
          required
          onChange={handleSearchChange}
        ></input>
        <button type="submit"  className='searchform__button'></button>
      </div>
      <div className='searchform__checkbox-container'>
        <label className='searchform__checkbox'>
          <input
            className='searchform__checkbox-input'
            checked={checkedState}
            onChange={handleSearchChangeShort}
            type='checkbox'
          />
          <span className='searchform__checkbox-span'>Короткометражки</span>
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
