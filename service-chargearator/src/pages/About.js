import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const About = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <h2>About</h2>
        {/* Add content specific to the home page */}
      </main>
    </div>
  );
};

export default About;
