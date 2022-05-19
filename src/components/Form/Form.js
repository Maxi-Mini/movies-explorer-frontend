import './Form.css';
import headerlogo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

const Form = (props) => {
  return (
    <div className='form'>
      <Link className='link' to='/'>
        <img className='form__logo' src={headerlogo} alt='логтип'></img>
      </Link>
      <h2 className='form__header'>{props.header}</h2>
      <form className='form__inputs'>
        {props.nameIsUsed && (
          <>
            <label className='form__label' htmlFor='name'>
              Имя
            </label>
            <input
              className='form__input'
              type='text'
              defaultValue='Максим'
              id='name'
              minLength='2'
              maxLength='30'
              required
            ></input>
          </>
        )}
        <label className='form__label' htmlFor='email'>
          E-mail
        </label>
        <input
          className='form__input'
          type='email'
          defaultValue='pochta@yandex.ru'
          id='email'
          required
        ></input>
        <label className='form__label' htmlFor='password'>
          Пароль
        </label>
        <input
          className='form__input form__input_password'
          type='password'
          defaultValue='••••••••••••••'
          id='password'
          minLength='8'
          required
        ></input>
        <span className='form__error'>Что-то пошло не так...</span>
        <button className='form__button link'>{props.button}</button>
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
