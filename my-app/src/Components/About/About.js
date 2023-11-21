import React from "react";
import image1 from "../Images/TUClubPic3.png";
import image2 from "../Images/loyala.jpg";
import image3 from "../Images/loyala.jpg";
import image4 from "../Images/Mitch.png";

export default function About() {
  return (
    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
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

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "10%",
          alignContent: "space-between",
        }}
      >
        <div className="about-member text-center">
          <img
            src={image1}
            alt="Kaden Pirmonhamed"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Cyber Defense Club</h3>
          <p style={{ contain: "size" }}>
            Welcome to the Cyber Defense Club, where every Wednesday at 6 PM,
            cybersecurity enthusiasts gather to delve into the world of cyber
            defense. Our inclusive club welcomes members of all skill levels,
            offering a supportive environment for everyone interested in
            cybersecurity, regardless of their expertise. Focused on defensive
            topics, we go beyond theoretical discussions by organizing
            practical, hands-on labs that enhance and develop our students'
            skills
          </p>
        </div>

        <div className="about-member text-center ">
          <img
            src={image2}
            alt="Competition Team"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Competition Team</h3>
          <p style={{ contain: "size" }}>
            Welcome to the heart of our Cyber Defense Club – the Competition
            Team! As the driving force behind our competitive edge, this team is
            dedicated to preparing students for a thrilling journey through
            various cybersecurity competitions. From beginners eager to dip
            their toes into the realm of cyber defense to seasoned veterans
            seeking advanced challenges, our competitions cater to all skill
            levels.
          </p>
        </div>

        <div className="about-member text-center ">
          <img
            src={image3}
            alt="Danny"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">Members</h3>
          <p style={{ contain: "size" }}>
            At the heart of our Cyber Defense Club is a vibrant and growing
            community of individuals who share a common passion for
            cybersecurity. Whether you're just stepping into the world of cyber
            or bringing years of experience, our club is a welcoming space where
            enthusiasts converge to learn, collaborate, and explore the
            ever-evolving landscape of cybersecurity.
          </p>
        </div>

        <div className="about-member text-center ">
          <img
            src={image4}
            alt="Mitch Sneckenberger"
            className="h-80 w-80 object-cover rounded-full"
          />
          <h3 className="text-lg font-semibold">LeaderShip</h3>
          <p style={{ contain: "size" }}>
            Our Cyber Defense Club is not just a collection of members; it's a
            collaborative community driven by passionate leaders dedicated to
            fostering growth and success. If you're someone who enjoys taking
            charge, planning events, and ensuring the smooth execution of club
            activities, our leadership team is the perfect place for you.
          </p>
        </div>
      </section>

      <section
        style={{}}
        className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      >
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
