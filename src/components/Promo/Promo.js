import './Promo.css';
import NavTab from '../NavTab/NavTab';

const Promo = () => {
  return (
    <div className='promo'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab/>
    </div>
  );
};

export default Promo;
