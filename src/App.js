import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/App.css';
import GymPage from './pages/GymPage';
import EquipmentPage from './pages/EquipmentPage';
import ProductPage from './pages/ProductPage';
import ProfessionalPage from './pages/ProfessionalPage';
import ActivityPage from './pages/ActivityPage';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import CashflowPage from './pages/CashflowPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/gym' element={<GymPage />} />
          <Route path='/professionals' element={<ProfessionalPage />} />
          <Route path='/activities' element={<ActivityPage />} />
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/students' element={<StudentPage />} />
          <Route path='/cashflows' element={<CashflowPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
