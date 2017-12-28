import * as React from 'react';
import { Link } from 'react-router-dom';

import CustomerChart from './CustomerChart';

const About = () => {
  return (
    <div className=" ba near-white flex flex-column justify-center items-center">
      <h2>This is the about page.</h2>
      <Link className="tc near-white" to="/contact">
        <CustomerChart />
      </Link>
    </div>
  );
};

export default About;
