import './Navigation.css';
import closeButton from '../../images/cclose-button.svg';
import { NavLink, useLocation } from 'react-router-dom';
import user from '../../images/header-user.svg';

const Navigation = (props) => {
  const location = useLocation();
  return (
    <nav className={`navigation ${props.isOpen ? 'navigation_opened' : ''}`}>
      <div className='navigation__overlay'></div>
      <button className='navigation__close' onClick={props.onClose}>
        <img src={closeButton} alt='закрыть'></img>
      </button>
      <NavLink
        to='/'
        className={`navigation__link ${
          location.pathname === '/' ? 'navigation__link_active' : ''
        }`}
        onClick={props.onClose}
      >
        Главная
      </NavLink>
      <NavLink
        to='/movies'
        className={`navigation__link ${location.pathname === '/movies' ? 'navigation__link_active' :''}`}
        onClick={props.onClose}
      >
        Фильмы
      </NavLink>
      <NavLink
        to='/saved-movies'
        className={`navigation__link ${location.pathname === '/saved-movies' ? 'navigation__link_active' :''}`}
        onClick={props.onClose}
      >
        Сохраненные фильмы
      </NavLink>
      <NavLink
        to='/profile'
        className={`navigation__link ${location.pathname === '/profile' ? 'navigation__link_active' :''}`}
        onClick={props.onClose}
      >
        Аккаунт
        <img
          className='navigation__link-user'
          src={user}
          alt='иконка юзер'
        ></img>
      </NavLink>
    </nav>
  );
};

export default Navigation;
