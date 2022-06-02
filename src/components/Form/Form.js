import './Form.css';
import headerlogo from '../../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

const Form = (props) => {
  const location = useLocation().pathname;

  return (
    <div className='form'>
      <Link className='link' to='/'>
        <img className='form__logo' src={headerlogo} alt='логтип'></img>
      </Link>
      <h2 className='form__header'>{props.header}</h2>
      <form className='form__inputs' onSubmit={props.handleSubmit} noValidate>
        {props.nameIsUsed && (
          <>
            <label className='form__label' htmlFor='name'>
              Имя
            </label>
            <input
              className='form__input'
              type='text'
              placeholder='Имя'
              id='name'
              name='name'
              minLength='2'
              maxLength='30'
              required
              onChange={props.handleChange}
              disabled={props.blockForm}
            ></input>
            {props.errors.name ? (
              <span className='form__error'>{props.errors.name}</span>
            ) : (
              <></>
            )}
          </>
        )}
        <label className='form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className='form__input'
          type='email'
          placeholder='E-mail'
          id='login'
          name='login'
          required
          onChange={props.handleChange}
          disabled={props.blockForm}
        ></input>
        {props.errors.login ? (
          <span className='form__error'>{props.errors.login}</span>
        ) : (
          <></>
        )}
        <label className='form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='form__input'
          type='password'
          placeholder='Пароль'
          id='password'
          name='password'
          minLength='8'
          onChange={props.handleChange}
          disabled={props.blockForm}
          required
        ></input>
        {props.registerError !== '' ? (
          <span className='form__error'>{props.registerError}</span>
        ) : (
          <></>
        )}
        {location === '/register' ? (
          <button
            type='submit'
            className={`form__button link ${
              !props.isValid ||
              (props.errors.name !== (undefined || '') &&
                props.errors.login !== (undefined || ''))
                ? 'form__button_disabled'
                : 'form__button_active'
            }`}
            disabled={
              !props.isValid ||
              (props.errors.name !== (undefined || '') &&
                props.errors.login !== (undefined || ''))
            }
          >
            {props.button}
          </button>
        ) : (
          <button
            type='submit'
            className={`form__button link ${
              props.blockForm ||
              !props.isValid ||
              props.errors.login !== (undefined || '')
                ? 'form__button_disabled'
                : 'form__button_active'
            }`}
            // disabled={
            //   props.blockForm ||
            //   !props.isValid ||
            //   props.errors.login !== (undefined || '')
            // }
          >
            {props.button}
          </button>
        )}
      </form>
      <div className='form__bottom'>
        <p className='form__bottom_text'>{props.text}</p>
        <Link to={props.route} className='form__link link'>
          {props.link}
        </Link>
      </div>
    </div>
  );
};

export default Form;
