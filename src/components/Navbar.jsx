import React from 'react';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/users'>Users</a>
        </li>
        <li>
          <a href='/gym'>Gym</a>
        </li>
        <li>
          <a href='/professionals'>Professionals</a>
        </li>
        <li>
          <a href='/activities'>Activities</a>
        </li>
        <li>
          <a href='/equipment'>Equipment</a>
        </li>
        <li>
          <a href='/students'>Students</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
