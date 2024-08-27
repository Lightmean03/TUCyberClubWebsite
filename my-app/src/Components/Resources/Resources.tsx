import React from "react";
import Cyber1 from "../../assets/pico.png";
import Cyber2 from "../../assets/pwn.png";
import Cyber3 from "../../assets/Sql.png";
import Cyber4 from "../../assets/HackTheBox.png";
import Cyber5 from "../../assets/c+.png";
import { FaSearch, FaExternalLinkAlt } from "react-icons/fa";

export default function Resources() {
  const resources = [
    {
      img: Cyber1,
      title: "PicoCTF",
      description: "Learn the basics of cyber security through interactive challenges.",
      link: "https://picoctf.org/",
      category: "CTF",
    },
    {
      img: Cyber2,
      title: "Pwn College",
      description: "Hands-on cybersecurity education with a focus on exploitation techniques.",
      link: "https://pwn.college/",
      category: "Education",
    },
    {
      img: Cyber3,
      title: "Codecademy SQL",
      description: "Interactive SQL courses for beginners and intermediate learners.",
      link: "https://www.codecademy.com/learn/learn-sql",
      category: "Programming",
    },
    {
      img: Cyber4,
      title: "Hack The Box",
      description: "Penetration testing labs and challenges for cybersecurity enthusiasts.",
      link: "https://www.hackthebox.com/",
      category: "Practice",
    },
    {
      img: Cyber5,
      title: "Learn C++",
      description: "Comprehensive C++ tutorials for beginners to advanced programmers.",
      link: "https://www.learncpp.com/",
      category: "Programming",
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || resource.category === selectedCategory)
  );

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

  return (
    <div className="min-h-screen bg-white text-white pt-16 pb-32">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gold">Cybersecurity Resources</h1>
        </header>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full text-black border border-gold rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gold" />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-gold text-black"
                    : "bg-gold text-white hover:bg-gray-800"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105">
              <img src={resource.img} alt={resource.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gold">{resource.title}</h3>
                <p className="text-black mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium bg-gold text-black px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors duration-300 flex items-center"
                  >
                    Visit <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}