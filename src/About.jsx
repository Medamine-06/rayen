// src/components/About.jsx
import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>Axia Calendar is a Minimal Weekly Planner & To-Do List App.</h2>
        <p>Plan for yourself, your family and team.</p>
        <hr />
        <p>
          To enhance your productivity, Tweek is built around a week calendar view without any hourly scheduling. We’d say it’s the best view to organize your life and work without stress.
        </p>
        <div className="about-buttons">
          <button className="start-now">Start now</button>
          <button className="log-in">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default About;
