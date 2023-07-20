import React from 'react';
import './Home.css'
import Spaceman from '../Images/SpaceMan.png';
export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Towson <br/>CyberSecurity<br/> Club<br/></h1>
      </header>
      <img src={Spaceman} alt="Welcome"/>
      
      <section className="home-content">
        <p className="home-text">
       We are a group of students who are interested in learning about cyber security and participating in cyber defense competitions. We are open to all majors and skill levels. We meet every Thursday at 5:00pm in Smith Hall room 356.
        </p>
        <p className="home-text">
          You can include various sections, such as features, services, testimonials,
         
        </p>
        <p className="home-text">
          You can include various sections, such as features, services, testimonials,
         
        </p>
        
        <p className="home-text">
          Customize the content and design.
        </p>
      </section>
    </div>

  );
}
