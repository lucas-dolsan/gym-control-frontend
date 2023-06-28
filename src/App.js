import React from 'react';
import Navbar from './components/Navbar';
import './styles/App.css';
import GymPage from './pages/GymPage';
import EquipmentPage from './pages/EquipmentPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <EquipmentPage />
    </div>
  );
}

export default App;
