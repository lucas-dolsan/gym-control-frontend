import React, { useState, useEffect } from 'react';
import GymController from '../controllers/gymController';
import '../styles/HomePage.css';

function Dashboard() {
  const [gymCount, setGymCount] = useState(0);
  const [professionalCount, setProfessionalCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  const fetchGymCount = async () => {
    try {
      const gyms = await GymController.listGyms();
      setGymCount(gyms.length);
    } catch (error) {
      console.error('Failed to fetch gym count:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchGymCount();
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Gym Control</h1>
      <div className='dashboard'>
        <div className='counter'>
          <h2>Academias</h2>
          <p>{gymCount}</p>
        </div>
        {/* <div className='counter'>
          <h2>Profissionais</h2>
          <p>{professionalCount}</p>
        </div>
        <div className='counter'>
          <h2>Atividades</h2>
          <p>{activityCount}</p>
        </div>
        <div className='counter'>
          <h2>Equipamentos</h2>
          <p>{equipmentCount}</p>
        </div>
        <div className='counter'>
          <h2>Estudantes</h2>
          <p>{studentCount}</p>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
