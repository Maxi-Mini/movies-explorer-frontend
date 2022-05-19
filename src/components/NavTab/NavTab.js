import './NavTab.css';

const NavTab = () => {
  return (
    <div className='navtab'>
      <a className='navtab__link' href='#about-project'>
        О проекте
      </a>
      <a className='navtab__link' href='#tech'>
        Технологии
      </a>
      <a className='navtab__link' href='#student'>
        Студент
      </a>
    </div>
  );
};

export default NavTab;
