import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Início</Link>
        </li>
        <li>
          <Link to='/gym'>Academia</Link>
        </li>
        <li>
          <Link to='/professionals'>Profissionais</Link>
        </li>
        <li>
          <Link to='/activities'>Atividades</Link>
        </li>
        <li>
          <Link to='/equipment'>Equipamentos</Link>
        </li>
        <li>
          <Link to='/students'>Estudantes</Link>
        </li>
        <li>
          <Link to='/cashflows'>Fluxo de caixa</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
