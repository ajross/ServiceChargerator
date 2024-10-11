import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link><span className="separator">|</span>
      <Link to="/borough-analysis-2022-2023">Borough Analysis 2022-2023</Link><span className="separator">|</span>
      <Link to="/greenwich">Greenwich</Link><span className="separator">|</span>
      <Link to="/lambeth">Lambeth</Link><span className="separator">|</span>
      <Link to="/lewisham">Lewisham</Link><span className="separator">|</span>
      <Link to="/southwark">Southwark</Link><span className="separator">|</span>
      <Link to="/tower-hamlets">Tower Hamlets</Link><span className="separator">|</span>
      <Link to="/about">About</Link><br/>
    </nav>
  );
};

export default NavBar;
