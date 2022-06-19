import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='notfound'>
      <h1 className='notfound__header'>404</h1>
      <p className='notfound__caption'>Страница не найдена</p>
      <button className='notfound__button' onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default NotFound;
