import './Header.css';
import logo from '../../images/header-logo.svg';
import user from '../../images/header-user.svg';
import menu from '../../images/header-burger.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  return (
    <header className='header'>
      <Link to='/' className='header__homelink'>
        <img className='header__logo' src={logo} alt='логотип'></img>
      </Link>
      {location.pathname === '/' && (
        <nav className='header__signblock'>
          <Link className='header__register' to='/signup'>
            Регистрация
          </Link>
          <Link className='header__login' to='/signin'>
            Войти
          </Link>
        </nav>
      )}
      {location.pathname !== '/' && (
        <nav className='header__navblock'>
          <div className='header__navblock_films'>
            <Link className='header__films link' to='/movies'>
              Фильмы
            </Link>
            <Link className='header__saved-films link' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
          </div>
          <Link className='header__profile link' to='/profile'>
            Аккаунт
            <img className='header__user' src={user} alt='иконка юзер'></img>
          </Link>
          <button className='header__menu link' onClick={openMenu}>
            <img src={menu} alt='бургер меню'></img>
          </button>
        </nav>
      )}
      {<Navigation isOpen={isMenuOpen} onClose={closeMenu} />}
    </header>
  );
};

export default Header;
