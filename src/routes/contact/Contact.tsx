import * as React from 'react';
import { Link } from 'react-router-dom';
import { getRandomNumberBetween, todayStart } from './util';

const Contact = () => (
  <div className="w-100 ba light-green flex flex-column justify-center items-center">
    <h2>This is the contact page.</h2>
    <p>
      Here is a random number between 0 and 100:{' '}
      {getRandomNumberBetween(0, 100)}
    </p>

    <p>
      Here is today's start, whatever that means: {todayStart}
      {}
    </p>
    <Link className="tc near-white" to="/about">
      About
    </Link>
  </div>
);

export default Contact;
