import React from "react";
import './About.css'
export default function About() {
  return (
    <div className="about-container">
        <header className="about-header">
      <h1 className="about-title">About Our Cyber Club</h1>
      <p className="text">The start of our CyberSecurity Club</p>
      </header>

      <section className="about-info">
        <div className="Info-container">
        <div className="layout">
        <p className="value">100</p>
        <p className="label">Members</p>
        </div>
        <div className="layout">
        <p className="value">Towson University</p>
        <p className="label">Locations</p>
        </div>

        </div>
      </section>
      <section className="about-content">
      <p className="about-text">
        Welcome to the About Me page! This is where you can learn more about who we are.
        Feel free to explore and get to know us better.
      </p>
      <p className="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac ligula auctor, volutpat mi vel, feugiat mi.
        Curabitur tristique dapibus lacus, nec molestie lectus pellentesque a. Sed accumsan, sem vitae aliquet feugiat,
        purus dolor ultrices elit, a congue enim tortor vitae enim. Ut facilisis, nisl nec elementum lobortis,
        justo mauris laoreet ex, et ullamcorper mauris nisl in sem. 
        </p>
        <p className="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac ligula auctor, volutpat mi vel, feugiat mi.
        Curabitur tristique dapibus lacus, nec molestie lectus pellentesque a. Sed accumsan, sem vitae aliquet feugiat,
        purus dolor ultrices elit, a congue enim tortor vitae enim. Ut facilisis, nisl nec elementum lobortis,
        justo mauris laoreet ex, et ullamcorper mauris nisl in sem. 
        </p>
        <p className="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac ligula auctor, volutpat mi vel, feugiat mi.
        Curabitur tristique dapibus lacus, nec molestie lectus pellentesque a. Sed accumsan, sem vitae aliquet feugiat,
        purus dolor ultrices elit, a congue enim tortor vitae enim. Ut facilisis, nisl nec elementum lobortis,
        justo mauris laoreet ex, et ullamcorper mauris nisl in sem. 
        </p>
        </section>
    </div>
  );
}
