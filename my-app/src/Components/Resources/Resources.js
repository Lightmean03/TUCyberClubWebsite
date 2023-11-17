import React from 'react';
import Cyber1 from '../Images/pico.png';
import Cyber2 from '../Images/pwn.png';
import Cyber3 from '../Images/Sql.png';
import Cyber4 from '../Images/HackTheBox.png';
import Cyber5 from '../Images/c+.png';
import ResourceCard from './ResourceCard';

export default function Resources() {
  const resources = [
    {
      img: Cyber1,
      title: 'PicoCTF',
      description: 'Pico CTF is a great resource for beginners to learn the basics of cyber security. It is a free online competition that is held every year. The competition is designed to be accessible to everyone, regardless of their skill level. The challenges are divided into different categories, such as cryptography, forensics, web exploitation, and more. The challenges are designed to be fun and engaging, and they are a great way to learn about cyber security. The competition is open to anyone, and it is a great way to learn about the field.',
      link: 'https://picoctf.org/',
    },
    {
      img: Cyber2,
      title: 'Pwn College',
      description: 'Pwn College is a great resource for beginners to learn the basics of cyber security. It is a free online competition that is held every year. The competition is designed to be accessible to everyone, regardless of their skill level. The challenges are divided into different categories, such as cryptography, forensics, web exploitation, and more. The challenges are designed to be fun and engaging, and they are a great way to learn about cyber security. The competition is open to anyone, and it is a great way to learn about the field.',
      link: 'https://pwn.college/',
    },{
      img: Cyber3,
      title: 'Codecademy SQL',
      description: 'Codeacademy is a great resource for beginners to learn the basics of cyber security. It is a free online competition that is held every year. The competition is designed to be accessible to everyone, regardless of their skill level. The challenges are divided into different categories, such as cryptography, forensics, web exploitation, and more. The challenges are designed to be fun and engaging, and they are a great way to learn about cyber security. The competition is open to anyone, and it is a great way to learn about the field.',
      link: 'https://www.codecademy.com/learn/learn-sql',
    },{
      img: Cyber4,
      title: 'Hack The Box',
      description: 'Hack The Box is a great resource for beginners to learn the basics of cyber security. It is a free online competition that is held every year. The competition is designed to be accessible to everyone, regardless of their skill level. The challenges are divided into different categories, such as cryptography, forensics, web exploitation, and more. The challenges are designed to be fun and engaging, and they are a great way to learn about cyber security. The competition is open to anyone, and it is a great way to learn about the field.',
      link: 'https://www.hackthebox.com/',
    },{
      img: Cyber5,
      title: 'C++',
      description: 'C++ is a great resource for beginners to learn the basics of cyber security as it teaches you how to write scripts. This is a free online resource used to teach C++.',
      link: 'https://www.learncpp.com/',
    },
    
  ];

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "100vh" }}>
    <header className="">
        <h1 className="text-3xl font-semibold mb-4 absolute top-1 pl-4">Resources Page</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </header>
    </div>
  );
}

