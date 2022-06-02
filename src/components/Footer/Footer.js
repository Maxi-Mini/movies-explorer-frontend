import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__caption'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2022</p>
        <div className='footer__links'>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://practicum.yandex.ru/'>
            Яндекс.Практикум
          </a>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://github.com/Maxi-Mini'>
            Github
          </a>
          <a className='footer__link' target='_blank' rel='noreferrer' href='https://www.facebook.com'>
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
