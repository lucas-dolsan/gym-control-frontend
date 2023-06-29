import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/gym'>Gym</Link>
        </li>
        <li>
          <Link to='/professionals'>Professionals</Link>
        </li>
        <li>
          <Link to='/activities'>Activities</Link>
        </li>
        <li>
          <Link to='/equipment'>Equipment</Link>
        </li>
        <li>
          <Link to='/students'>Students</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
