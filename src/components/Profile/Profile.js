import './Profile.css';

const Profile = () => {
  return (
    <div className='profile'>
      <h1 className='profile__header'>Привет, Максим!</h1>
      <form>
        <div className='profile__container'>
          <label className='profile__label' htmlFor='name'>
            Имя
          </label>
          <input
            className='profile__input'
            id='name'
            defaultValue='Максим'
            minLength='2'
            maxLength='30'
            required
          />
        </div>
        <div className='profile__container'>
          <label className='profile__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            id='email'
            defaultValue='pochta@yandex.ru'
            required
          />
        </div>
      </form>
      <div className='profile__buttons'>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button'>Выйти из аккаунта</button>
      </div>
    </div>
  );
};

export default Profile;
