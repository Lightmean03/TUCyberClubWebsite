import React from "react";
import { useState } from "react";
import image1 from "@/assets/TUClubPic3.png";
import image2 from "@/assets/loyala.jpg";
import image3 from "@/assets/ccdc.jpg";
import image4 from "@/assets/Mitch.png";
import vid1 from "@/assets/backVideo.mp4";
import Popup from "../Popup/Popup";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import {
  HeroContent,
  HeroDescription,
  HeroMediaBackdrop,
  HeroTitle,
  HeroWrapper,
} from "../ui/hero";

export default function About() {
  const [openCyberDefenseClub, setOpenCyberDefenseClub] = useState(false);
  const [openCompetitionTeam, setOpenCompetitionTeam] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [openLeadership, setOpenLeadership] = useState(false);

  return (
    <div className="h-full w-full overflow-auto">
      <HeroWrapper>
        <HeroMediaBackdrop>
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={vid1} type="video/mp4" />
          </video>
        </HeroMediaBackdrop>
        <HeroContent>
          <HeroTitle>About Our Cyber Club</HeroTitle>
          <HeroDescription>
            Our goal is to expose our members to a wide range of topics in cyber
            security by discussing current events, hosting guest speakers, and
            providing hands-on labs to enhance and develop our students' skills.
            We participate in various cyber defense competitions, although
            students who join the club are not required to compete.
          </HeroDescription>
        </HeroContent>
      </HeroWrapper>

      <div className="grid grid-flow-col grid-cols-3 space-x-3 px-12 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Brief History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Towson Cyber Defense Club has a rich history that dates back to
              2006. Under the leadership of Coach Mike O'Leary since then, the
              club has achieved significant milestones, including multiple
              successful participations in regional and national competitions.
              The club's commitment to cybersecurity education and hands-on
              experience has made it a prominent force in the cybersecurity
              community at Towson University.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leadership Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The club is led by Coach Mike O'Leary, who has been instrumental
              in guiding the team to success since 2006. In addition to Coach
              O'Leary, our leadership team includes dedicated members and
              contributors who play vital roles in organizing club activities,
              competitions, and training sessions. These individuals bring a
              wealth of knowledge and experience to the club, fostering a
              collaborative and learning-focused environment.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Club Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Towson Cyber Defense Club engages in a variety of activities,
              events, and projects to enhance members' skills and knowledge in
              cybersecurity. From weekly meetings and tryouts to participating
              in regional competitions like CCDC and CPTC, the club provides a
              platform for hands-on learning and skill development. Members also
              benefit from guest speakers, workshops, and collaborative projects
              that contribute to a dynamic learning environment.
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="flex flex-wrap justify-center gap-x-24 my-12">
        <div className="about-member text-center">
          <button onClick={() => setOpenCyberDefenseClub(true)}>
            <img
              src={image1}
              alt="Kaden Pirmonhamed"
              className="h-60 w-60 object-cover rounded-full"
            />
          </button>
          {openCyberDefenseClub ? (
            <Popup
              text="Our goal is to expose our members to a wide range of topics in cyber security by discussing current events, hosting guest speakers, and providing hands-on labs to enhance and develop our students’ skills. We participate in various cyber defense competitions, although students who join the club are not required to compete."
              title="Cyber Defense Club"
              closePopup={() => setOpenCyberDefenseClub(false)}
            />
          ) : null}
          <h3 className="font-semibold">Cyber Defense Club</h3>
        </div>

        <div className="about-member text-center ">
          <button onClick={() => setOpenCompetitionTeam(true)}>
            <img
              src={image2}
              alt="Competition Team"
              className="h-60 w-60 object-cover rounded-full"
            />
          </button>
          {openCompetitionTeam ? (
            <Popup
              text="Welcome to the heart of our Cyber Defense Club – the Competition Team! As the driving force behind our competitive edge, this team is dedicated to preparing students for a thrilling journey through various cybersecurity competitions. From beginners eager to dip their toes into the realm of cyber defense to seasoned veterans seeking advanced challenges, our competitions cater to all skill levels."
              title="Competition Team"
              closePopup={() => setOpenCompetitionTeam(false)}
            />
          ) : null}
          <h3 className="font-semibold">Competition Team</h3>
        </div>

        <div className="about-member text-center ">
          <button onClick={() => setOpenMembers(true)}>
            <img
              src={image3}
              alt="Danny"
              className="h-60 w-60 object-cover rounded-full"
            />
          </button>
          {openMembers ? (
            <Popup
              text="At the heart of our Cyber Defense Club is a vibrant and growing community of individuals who share a common passion for cybersecurity. Whether you're just stepping into the world of cyber or bringing years of experience, our club is a welcoming space where enthusiasts converge to learn, collaborate, and explore the ever-evolving landscape of cybersecurity."
              title="Members"
              closePopup={() => setOpenMembers(false)}
            />
          ) : null}
          <h3 className="font-semibold">Members</h3>
        </div>
        <div className="about-member text-center ">
          <button onClick={() => setOpenLeadership(true)}>
            <img
              src={image4}
              alt="Mitch Sneckenberger"
              className="h-60 w-60 object-cover rounded-full"
            />
          </button>
          {openLeadership ? (
            <Popup
              text="Our Cyber Defense Club is not just a collection of members; it's a collaborative community driven by passionate leaders dedicated to fostering growth and success. If you're someone who enjoys taking charge, planning events, and ensuring the smooth execution of club activities, our leadership team is the perfect place for you."
              title="Leadership"
              closePopup={() => setOpenLeadership(false)}
            />
          ) : null}
          <h3 className="font-semibold">Leadership</h3>
        </div>
      </section>

      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Achievements</h2>
        <p>
          Over the years, Towson Cyber Defense Club has achieved notable
          successes, including multiple third-place finishes in competitions
          such as the Mid-Atlantic Collegiate Cyber Defense Competition
          (MACCDC). The club's dedication to excellence and continuous
          improvement has earned it recognition in various Capture The Flag
          (CTF) events, penetration testing competitions, and more. These
          achievements showcase the club's commitment to fostering cybersecurity
          talent and expertise among its members.
        </p>
      </section>
      <section className="mb-8 text-center border p-4 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Club Activities</h2>
        <p>
          Towson Cyber Defense Club actively engages in a variety of activities
          and events to foster learning and collaboration: - Weekly Meetings:
          Join us every week for informative sessions, discussions, and updates.
          - Competitions: We participate in various competitions, including CPTC
          and NCL, to challenge and enhance our skills. - Workshops: The club
          conducts regular workshops to provide hands-on experience and share
          knowledge on cybersecurity tools and techniques. - Guest Speakers:
          Industry professionals and experts are invited to share insights and
          experiences with our members. - Community Engagement: We actively
          contribute to the cybersecurity community by organizing and
          participating in events.
          <br />
          Whether you are a beginner or an experienced cybersecurity enthusiast,
          our club offers a welcoming environment for all levels of expertise.
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
