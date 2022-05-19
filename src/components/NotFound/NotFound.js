import { useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className='notfound'>
      <h1 className='notfound__header'>404</h1>
      <p className='notfound__caption'>Страница не найдена</p>
      <button className='notfound__button' onClick={() => history.goBack()}>Назад</button>
    </div>
  );
};

export default NotFound;
