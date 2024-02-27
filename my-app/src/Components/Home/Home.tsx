import React from "react";
import { useState } from "react";
import vid1 from "@/assets/backVideo.mp4";
import bg1 from "@/assets/tuCLUBBG3.jpg";
import bg2 from "@/assets/tuBg.jpeg";
import "./animation.css";
import {
  HeroContent,
  HeroDescription,
  HeroMediaBackdrop,
  HeroTitle,
  HeroWrapper,
} from "../ui/hero";


export default function NewHome() {
  const [aboutVisible, setAboutVisible] = useState(false);

  const handleAboutClick = () => {
    setAboutVisible(!aboutVisible);
  };
  const sectionStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };

  return (
    <main>
      <HeroWrapper>
        <HeroMediaBackdrop>
          <video autoPlay muted loop className="w-full h-full object-cover">
            <source src={vid1} type="video/mp4" />
          </video>
        </HeroMediaBackdrop>
        <HeroContent>
          <HeroTitle className="font-extrabold">Towson Cyber Defense Club</HeroTitle>
          <HeroDescription className="font-bold">
            We are a diverse group of passionate students from Towson University
            dedicated to exploring and advancing cybersecurity. Join us in our
            mission to learn, collaborate and teach.
          </HeroDescription>
        </HeroContent>
      </HeroWrapper>

      <section className="relative bottom-40">
      <div className="container mx-auto px-4">
  <div className="flex flex-wrap">
    <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg h-full">
        <div className="px-4 py-5 flex-auto">
          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 "></div>
          <h6 className="text-xl font-semibold text-black">
            Join Us For Weekly Meetings
          </h6>
          <p className="mt-2 mb-4  text-black">
            We meet every Wednesday at 6:00 pm in the Cyber Center room 364
            for Cyber Defense Club. Our Competition Team meets every Friday at
            4:00 pm. Meetings are open to all students.
          </p>
        </div>
      </div>
    </div>

    <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg h-full">
        <div className="px-4 py-5 flex-auto">
          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5  ">
            <i className="fas fa-award"></i>
          </div>
          <h6 className="text-xl font-semibold text-black">
            Join Our Discord
          </h6>
          <p className="mt-2 mb-4  text-black">
            Discord is our main platform for communication. Our Discord server
            is where we post announcements, chat and share resources. Join
            here:{" "}
            <a
              style={{ color: "red", fontWeight: "bold" }}
              href="https://discord.gg/xyXHht3trw"
            >
              {" "}
              Discord Link
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      </section>
      <section
        style={{ ...sectionStyle, backgroundImage: `url(${bg1})` }}
        className={`relative h-screen flex items-center justify-center bg-blue-500 text-white ${
          aboutVisible ? "fade-in" : ""
        }`}
        id="about-section"
      >
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4 color ">About Us</h2>
          <p className="text-lg mb-8">
            Learn more about our Cyber Defense Club
          </p>
          <a
            href="about"
            onClick={handleAboutClick}
            className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 hover:text-white"
          >
            Explore
          </a>
        </div>
      </section>

      {/* About Us Section 2 */}
      <section
        style={{ ...sectionStyle, backgroundImage: `url(${bg2})` }}
        className={`relative h-screen flex items-center justify-center bg-blue-500 text-white ${
          aboutVisible ? "fade-in" : ""
        }`}
        id="about-section"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 font-extrabold">Towson</h2>
          <p className="text-lg mb-8">Learn more about Towson University</p>
          <a
            href="https://www.towson.edu/"
            onClick={handleAboutClick}
            className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 hover:bg-blue-700 hover:text-white"
          >
            Explore
          </a>
        </div>
      </section>
    </main>
  );
}
