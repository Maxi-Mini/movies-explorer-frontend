import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <a
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
        href='https://maxi-mini.github.io/how-to-learn/'
      >
        Статичный сайт
      </a>
      <a
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
        href='https://maxi-mini.github.io/russian-travel/'
      >
        Адаптивный сайт
      </a>
      <a
        className='portfolio__link'
        target='_blank'
        rel='noreferrer'
        href='https://maxi.frontend.nomoredomains.work/'
      >
        Одностраничное приложение
      </a>
    </div>
  );
};

export default Portfolio;
