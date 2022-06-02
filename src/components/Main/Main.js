import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

const Main = () => {
  return (
    <div>
      <Promo />
      <AboutProject />
      <Techs/>
      <AboutMe/>
      
    </div>
  );
};

export default Main;
