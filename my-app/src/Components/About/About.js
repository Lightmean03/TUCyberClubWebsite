import React from "react";
import './About.css'
import image1 from '../Images/TUClubPic3.png'
import image2 from '../Images/TUClubPic2.png'
import image3 from '../Images/TUClubPic4.png';

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">About Our Cyber Club</h1>
      </header>

      <p className="text">Our goal is to expose our members to a wide range of topics in cyber security by discussing current events, hosting guest speakers and providing hands-on labs to enhance and develop our students’ skills. We participate in various cyber defense competitions, although students who join the club are not required to compete.</p>

      <section className="about-content">
        <p className="about-text">
          <img src={image1} loading="lazy" alt="Group" className="images"/>
          <h3 className="h3">Kaden Pirmonhamed (Club Leader)</h3>
        </p>
      
        <p className="about-text">
          <img src={image2} loading="lazy" alt="Group" className="images"/>
          <h3 className="h3">Competition Team</h3>
        </p>

        <p className="about-text">
          <img src={image3} loading="lazy" alt="Group" className="images"/>
          <h3 className="h3">Danny (Competition Team Leader)</h3>        
        </p>
      </section>

      <section className="about-info">
        <div className="layout">
        <h2  className="label">Members</h2>
          <p className="value">100</p>
        </div>

        <div className="layout">
        <h2 className="label">Locations</h2>
        <p className="value">Towson University</p>
        </div>

        {/* Add more boxes for values here */}
        <div className="layout">
        <h2 className="label">Founded</h2>
          <p className="value">2015</p>
        </div>

        <div className="layout">
        <h2  className="label">Events</h2>
          <p className="value">25+</p>
        </div>

      </section>
    </div>
  );
}
