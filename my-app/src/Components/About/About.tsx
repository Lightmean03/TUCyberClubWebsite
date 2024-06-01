import React from "react";
import "./About.css";
import clubmeeting from "@/assets/clubmeeting2021.jpg";
import loyala from "@/assets/loyala.jpg";
import tuClub from "@/assets/tuCLUBBG3.jpg";


export default function About() {


  return (
    <div className="relative font-sans pt-16 min-h-[75vh] text-black flex flex-col items-center">
      <div className="relative group w-full flex justify-center">
        <img src={tuClub} alt="tuClub" className="h-[432px] w-[1224px] object-cover"/>
      </div>
  
      <div className="mt-6 w-[1224px] flex flex-col items-center">
        <div className="w-full">
          <h1 className="font-bold text-black text-5xl text-left">About Our Cyber Club</h1>
          <div className="flex justify-start mt-16">
          <p className="text-2xl font-sans font-normal leading-9 tracking-normal text-left">
            Our goal is to expose our members to a wide range of topics in cyber security 
            by discussing current events, hosting guest speakers, and providing hands-on labs to enhance and develop our students' skills. 
            <br/>
            <span/>We participate in various cyber defense competitions, although students who join the club are not required to compete.
          </p>
          </div>
        </div>
      </div>
  
      <div className="w-full flex justify-center">
        <div className="w-[1224px] px-12 mb-12 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2  pb-6 mb-6">
            <div className="relative group">
              <img src={clubmeeting} alt="clubmeeting" className="w-full h-auto block"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">Club Meeting 2021</span>
              </div>
            </div>
            <div className="relative group">
              <img src={loyala} alt="loyala" className="w-full h-auto block"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">Loyala Event</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#d29b04] py-72">
        <h1 className="text-4xl font-sans font-bold leading-9 tracking-normal text-center text-white">
          Join us for our weekly meetings to learn about cyber security and participate in hands-on labs. 
          <br/>
          <span/>We welcome students of all skill levels and backgrounds.

          </h1>
        </div>
  
      <div className="w-full flex justify-center">
        <div className="w-[1224px] px-12 mb-12 mt-8">
          <div className=" pb-6 mb-6">
          <p className="text-2xl font-sans font-normal leading-9 tracking-normal text-left mb-6">
              Towson Cyber Defense Club has a rich history that dates back to
              2006. Under the leadership of Coach Mike O'Leary since then, the
              club has achieved significant milestones, including multiple
              successful participations in regional and national competitions.
              The club's commitment to cybersecurity education and hands-on
              experience has made it a prominent force in the cybersecurity
              community at Towson University.
            </p>
          </div>
          <div className="pb-6 mb-6">
          <p className="text-2xl font-sans font-normal leading-9 tracking-normal text-left mb-6">
              The club is led by Coach Mike O'Leary, who has been instrumental
              in guiding the team to success since 2006. In addition to Coach
              O'Leary, our leadership team includes dedicated members and
              contributors who play vital roles in organizing club activities,
              competitions, and training sessions. These individuals bring a
              wealth of knowledge and experience to the club, fostering a
              collaborative and learning-focused environment.
            </p>
          </div>
    
          <div>
          <p className="text-2xl font-sans font-normal leading-9 tracking-normal text-left mb-6">
              Towson Cyber Defense Club engages in a variety of activities,
              events, and projects to enhance members' skills and knowledge in
              cybersecurity. From weekly meetings and tryouts to participating
              in regional competitions like CCDC and CPTC, the club provides a
              platform for hands-on learning and skill development. Members also
              benefit from guest speakers, workshops, and collaborative projects
              that contribute to a dynamic learning environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}