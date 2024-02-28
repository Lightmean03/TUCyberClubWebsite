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
    <div className="h-full w-full">
      <HeroWrapper>
       {/* <HeroMediaBackdrop>
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={vid1} type="video/mp4" />
          </video>
        </HeroMediaBackdrop>
        */}
        <HeroContent>
          <HeroTitle className="font-extrabold text-white">About Our Cyber Club</HeroTitle>
          <HeroDescription className="">
            Our goal is to expose our members to a wide range of topics in cyber
            security by discussing current events, hosting guest speakers, and
            providing hands-on labs to enhance and develop our students' skills.
            We participate in various cyber defense competitions, although
            students who join the club are not required to compete.
          </HeroDescription>
        </HeroContent>
      </HeroWrapper>
      {/*
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
          <HeroTitle className="font-semibold text-xl">Cyber Defense Club</HeroTitle>
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
          <HeroTitle className="font-semibold text-xl">Competition Team</HeroTitle>
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
          <HeroTitle className="font-semibold text-xl">Members</HeroTitle>
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
          <HeroTitle className="font-semibold text-xl">Leadership</HeroTitle>
        </div>
      </section>
          */}
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
     
      <section className="mb-8 text-center p-4 bg-white">
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="md:w-1/2">
        <img src={image1} alt="Kaden Pirmonhamed" className="w-full h-3/5 md:w-2/3 mx-auto"/>
      </div>
      <div className="md:w-1/2">
        <HeroTitle className="text-2xl mb-9 font-black">Club Leader</HeroTitle>
        <h3 className="text-black dark:text-gray-400 font-sans text-7xl font-extrabold mb-7">
           Kaden <br />
          Pirmonhamed
          </h3>
        <HeroContent>
          <p className="text-lg text-black-50 relaxed-tracking-wider">
            Hello, my name is Kaden Pirmonhamed and I am the President of the Towson Cyber Defense Club. I am a sophomore at Towson University majoring in Computer Science with a concentration in Cyber Security. I have been a member of the club since my freshman year and have been involved in various competitions and events. I am passionate about cyber security and enjoy learning and sharing knowledge with others. I am excited to lead the club and help members grow and succeed in the field of cyber security.
            </p>
        </HeroContent>
      </div>
    </div>
  </section>

  <section className="mb-8 text-center p-4 bg-white">
  <HeroTitle className="font-black text-2xl mb-4">Club Activities</HeroTitle>
  <div className="flex flex-col md:flex-row gap-4">
    <HeroContent>
      <p className="text-lg text-black relaxed-tracking-wider">
        Towson Cyber Defense Club actively engages in a variety of activities and events to foster learning and collaboration:
        <br />
        - Weekly Meetings: Join us every week for informative sessions, discussions, and updates.
        <br />
        - Competitions: We participate in various competitions, including CPTC and NCL, to challenge and enhance our skills.
        <br />
        - Workshops: The club conducts regular workshops to provide hands-on experience and share knowledge on cybersecurity tools and techniques.
        <br />
        - Guest Speakers: Industry professionals and experts are invited to share insights and experiences with our members.
        <br />
        - Community Engagement: We actively contribute to the cybersecurity community by organizing and participating in events.
        <br />
        Whether you are a beginner or an experienced cybersecurity enthusiast, our club offers a welcoming environment for all levels of expertise.
      </p>
    </HeroContent>
  </div>
</section>
  </div>        
          
  );
}
