import React from "react";
import "./About.css";
import image1 from "../Images/TUClubPic3.png";
import image2 from "../Images/TUClubPic2.png";
import image3 from "../Images/TUClubPic4.png";
import image4 from "../Images/Mitch.png";

export default function About() {
  return (
    <div className="flex flex-col container mx-4 px-2 lg:mx-14 lg:px-16">
      <header>
        <h1 className="font-semibold text-2xl lg:text-4xl">About Our Cyber Club</h1>
      </header>

      <section>
        <p className="text-sm md:text-lg">
          Our goal is to expose our members to a wide range of topics in cyber
          security by discussing current events, hosting guest speakers and
          providing hands-on labs to enhance and develop our students’ skills.
          We participate in various cyber defense competitions, although
          students who join the club are not required to compete.
        </p>
        <div className="flex flex-col md:flex-row justify-start items-start w-auto max-w-screen-lg ">
          <div className="about-text">
            <img src={image1} loading="lazy" alt="Group"  className=" h-80 w-80" 
            style={{ maxWidth: 'none' }}
            />
            <h3 className="h3">Kaden Pirmonhamed</h3>
            Club Leader Sophomore Computer Science Major.
          </div>

          <p className="about-text">
            <img src={image2} loading="lazy" alt="Group"  className=" h-80 w-80" 
            style={{ maxWidth: 'none' }}
            />
            <h3 className="h3">Competition Team</h3>
          </p>

          <p className="about-text">
            <img src={image3} loading="lazy" alt="Group"  className=" h-80 w-80" 
            style={{ maxWidth: 'none' }}
            />
            <h3 className="h3">Danny</h3>
            Competition Team Leader.
          </p>
          <p className="about-text">
            <img src={image4} loading="lazy" alt="Group"  className="h-80 w-80" 
            style={{ maxWidth: 'none' }}
            />
            <h3 className="h3">Mitch Sneckenberger</h3>
            Sophomore Computer Science Major. The treasurer of our club.
          </p>
        </div>
      </section>

      <section className="about-info">
        <div className="layout">
          <h2 className="label">Members</h2>
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
          <h2 className="label">Events</h2>
          <p className="value">25+</p>
        </div>
      </section>
    </div>
  );
}
