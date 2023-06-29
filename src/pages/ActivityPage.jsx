import React, { useState, useEffect } from 'react';
import ActivityController from '../controllers/activityController';
import Modal from '../components/Modal';
import '../styles/ActivityPage.css';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const activities = await ActivityController.getAllActivities();
      setActivities(activities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedActivity) {
      // Update activity
      const updatedActivity = {
        id: selectedActivity.id,
        name,
        duration,
        description,
      };

      try {
        await ActivityController.updateActivity(selectedActivity.id, updatedActivity);
        console.log('Activity updated successfully!');
        resetForm();
        fetchActivities();
        closeModal();
      } catch (error) {
        console.error('Failed to update activity:', error);
      }
    } else {
      // Create activity
      const newActivity = {
        name,
        duration,
        description,
      };

      try {
        await ActivityController.createActivity(newActivity);
        console.log('Activity created successfully!');
        resetForm();
        fetchActivities();
        closeModal();
      } catch (error) {
        console.error('Failed to create activity:', error);
      }
    }
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setName(activity.name);
    setDuration(activity.duration);
    setDescription(activity.description);
    openModal();
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await ActivityController.deleteActivity(activityId);
      console.log('Activity deleted successfully!');
      fetchActivities();
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  const resetForm = () => {
    setSelectedActivity(null);
    setName('');
    setDuration('');
    setDescription('');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='activity-page'>
      <h1>Atividades</h1>
      <button className='create-activity-button' onClick={openModal}>
        Criar Nova Atividade
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedActivity ? 'Editar Atividade' : 'Criar Nova Atividade'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Duração:</label>
            <input
              type='text'
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className='activity-input'
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='activity-textarea'
            />
          </div>
          <button type='submit' className='activity-button'>
            {selectedActivity ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
      <h2>Lista de Atividades</h2>
      <table className='activity-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Duração</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan='4' className='empty-message'>
                Nenhuma atividade encontrada.
              </td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.duration}</td>
                <td>{activity.description}</td>
                <td>
                  <button onClick={() => handleEditActivity(activity)} className='activity-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteActivity(activity.id)} className='activity-button'>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityPage;
