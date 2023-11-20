import React from "react";
import image1 from "../Images/TUClubPic3.png";
import image2 from "../Images/loyala.jpg";
import image3 from "../Images/loyala.jpg";
import image4 from "../Images/Mitch.png";

export default function About() {
  return (
    <div className="flex flex-col items-center top-8 justify-center content-center container mx-4 px-2 lg:mx-17 lg:px-14">
      <header className="mb-8 text-center">
        <h1 className="font-semibold text-2xl lg:text-4xl">
          About Our Cyber Club
        </h1>
      </header>

      <section className="mb-8 text-center">
        <p className="text-sm md:text-lg">
          Our goal is to expose our members to a wide range of topics in cyber
          security by discussing current events, hosting guest speakers, and
          providing hands-on labs to enhance and develop our students’ skills.
          We participate in various cyber defense competitions, although
          students who join the club are not required to compete.
        </p>
      </section>

      <section className="flex flex-row justify-center items-center gap-8">
        <div className="about-member text-center">
          <img
            src={image1}
            alt="Kaden Pirmonhamed"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Cyber Defense Club</h3>
          <p>Club Leader | Sophomore Computer Science Major</p>
        </div>

        <div className="about-member text-center ">
          <img
            src={image2}
            alt="Competition Team"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Competition Team</h3>
        </div>

        <div className="about-member text-center ">
          <img
            src={image3}
            alt="Danny"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Members</h3>
          <p>Competition Team Leade</p>
        </div>

        <div className="about-member text-center ">
          <img
            src={image4}
            alt="Mitch Sneckenberger"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">LeaderShip</h3>
          <p>Sophomore Computer Science Major | Treasurer</p>
        </div>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Club Mission and Goals</h2>
        <p>
          Clearly state the mission and goals of the club. (Replace this text
          with your mission and goals.)
        </p>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Brief History</h2>
        <p>
          Provide a brief history of the club, including when it was founded and
          any significant milestones. (Replace this text with your club's
          history.)
        </p>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Leadership Team</h2>
        <p>
          Introduce key members, leaders, and contributors to the club. (Replace
          this text with information about your leadership team.)
        </p>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Club Activities</h2>
        <p>
          Describe the types of activities, events, and projects the club is
          involved in. (Replace this text with details about your club's
          activities.)
        </p>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Achievements</h2>
        <p>
          Highlight any notable achievements or successes. (Replace this text
          with your club's achievements.)
        </p>
      </section>

      <section className="flex justify-around mb-8 gap-4">
        <div className="info-item border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h2 className="font-semibold">Members</h2>
          <p>100</p>
        </div>

        <div className="info-item border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h2 className="font-semibold">Locations</h2>
          <p>Towson University</p>
        </div>

        <div className="info-item border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h2 className="font-semibold">Founded</h2>
          <p>2015</p>
        </div>

        <div className="info-item border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h2 className="font-semibold">Events</h2>
          <p>25+</p>
        </div>
      </section>
    </div>
  );
}
