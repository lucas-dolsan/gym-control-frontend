import React from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';
import GymPage from './pages/GymPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <GymPage />
    </div>
  );
}

export default App;
