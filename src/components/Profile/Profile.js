import './Profile.css';
import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validation';

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUser({
      name: values.name || currentUser.name,
      login: values.login || currentUser.email,
    });
  }

  useEffect(() => {
    resetForm();
    props.setApiSuccess(false);
    props.setApiError('');
  }, [props, resetForm]);

  return (
    <div className='profile'>
      <h1 className='profile__header'>{`Привет, ${currentUser.name}!`}</h1>
      <form  noValidate>
        <div className='profile__container'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='profile__input'
            id='name'
            name='name'
            placeholder='Имя'
            minLength='2'
            maxLength='30'
            onChange={handleChange}
            defaultValue={currentUser.name}
            required
            disabled={props.blockForm}
          />
          {errors.name ? (
            <span className='form__error'>{errors.name}</span>
          ) : (
            <></>
          )}
        </div>
        <div className='profile__container'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            id='email'
            name='login'
            placeholder='Почта'
            onChange={handleChange}
            defaultValue={currentUser.email}
            required
            disabled={props.blockForm}
          />
          {errors.login ? (
            <span className='form__error'>{errors.login}</span>
          ) : (
            <></>
          )}
          {props.apiError !== '' ? (
            <span className='form__error'>{props.apiError}</span>
          ) : (
            <></>
          )}
          {props.apiSuccess ? (
            <span className='profile__success'>Успешно изменено</span>
          ) : (
            <></>
          )}
        </div>
      </form>
      <div className='profile__buttons'>
        <button
          type='submit'
          onClick={handleSubmit}
          className={`profile__button ${
            props.blockForm ||
            !isValid ||
            (errors.name !== (undefined || '') &&
              errors.login !== (undefined || ''))
              ? 'profile__button_disabled'
              : ''
          }`}
          disabled={
            props.blockForm ||
            !isValid ||
            (errors.name !== (undefined || '') &&
              errors.login !== (undefined || ''))
          }
        >
          Редактировать
        </button>
        <NavLink
          to='/'
          className='profile__button_exit'
          onClick={props.onClick}
        >
          Выйти
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;