import avatar from '../../images/avatar.jpg';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <div className='aboutme'>
      <h2 className='aboutme__header'>Студент</h2>
      <div className='aboutme__description'>
        <img
          className='aboutme__description-photo'
          src={avatar}
          alt='avatar'
        ></img>
        <div className='aboutme__description-info'>
          <h3 className='aboutme__title'>Максим</h3>
          <p className='aboutme__subtitle'>Фронтенд-разработчик, 29 лет</p>
          <p className='aboutme__caption'>
            Я родился и живу в Энгельсе, закончил технологический факультет
            СГТУ. Я люблю путешествия и мотоциклы. Недавно начал кодить. С 2012
            года работал в компании ОАО« РЖД». Сейчас заканчиваю обучение на
            курсе веб-разработки Яндекс.Практикум.
          </p>
          <div className='aboutme__links'>
            <a
              className='aboutme__link'
              href='https://www.facebook.com'
              target='_blank'
              rel='noreferrer'
            >
              Facebook
            </a>
            <a
              className='aboutme__link'
              href='https://github.com/Maxi-Mini'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>
      </div>
      <Portfolio />
    </div>
  );
};

export default AboutMe;
