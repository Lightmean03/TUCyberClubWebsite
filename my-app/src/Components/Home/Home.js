import React from 'react';
import './Home.css'
import Spaceman from '../Images/SpaceMan.png';
export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Towson <br/>CyberSecurity<br/> Club<br/></h1>
      </header>
      
      <section className="home-content">
        <p className="home-text">
          <h3>Join Us</h3>
       We are a group of students who are interested in learning about cyber security and participating in cyber defense competitions. We are open to all majors and skill levels. We meet every Thursday at 5:00pm in Smith Hall room 356.
        </p>
        <p className="home-text">
          <h3>How much experience do I need to join the club?</h3>
          None! We cater to all skill levels and help you build your skills from beginner to expert.
        </p>
        <p className="home-text">
          <h3>Is there a time commitment?</h3>
          No! While we encourage participation in competitions, as they will help you improve your skills, it is not required.         
        </p>
        
        <p className="home-text">
          <h3>When and where are the meetings</h3>
          Meetings are on Saturday's at 1:00pm in YR 407.
        </p>
        <p className='home-text'>
          <h3>What do you do at the meetings?</h3>
          On most weekends, members of the club participate in jeopardy-style CTF competitions. Every year we compete in MACCDC, which is a collegiate attack-defense competition.
          </p>
      </section>
    </div>

  );
}
