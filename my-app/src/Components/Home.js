import React from 'react';
import './Home.css'
export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Towson CyberSecurity Club</h1>
      </header>
      <section className="home-content">
        <p className="home-text">
          This is the home page of our website. You can provide a brief introduction
          or overview of your website here.
        </p>
        <p className="home-text">
          You can include various sections, such as features, services, testimonials,
          or a call-to-action to encourage visitors to take a specific action.
        </p>
        <p className="home-text">
          Customize the content and design.
        </p>
      </section>
    </div>
  );
}
