import "./Techs.css";

const Techs = () => {
  return (
    <div className='techs'>
      <h2 className='techs__header'>Технологии</h2>
      <div className='techs__description'>
        <h3 className='techs__description-title'>7 технологий</h3>
        <p className='techs__description-subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className='techs__content'>
        <div className='techs__content-item'>HTML</div>
        <div className='techs__content-item'>CSS</div>
        <div className='techs__content-item'>JS</div>
        <div className='techs__content-item'>React</div>
        <div className='techs__content-item'>Git</div>
        <div className='techs__content-item'>Express.js</div>
        <div className='techs__content-item'>mongoDB</div>
      </div>
    </div>
  );
};

export default Techs;
