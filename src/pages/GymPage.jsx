import React, { useState, useEffect } from 'react';
import GymController from '../controllers/gymController';
import Modal from '../components/Modal';
import '../styles/ActivityPage.css';

const GymPage = () => {
  const [gyms, setGyms] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    try {
      const gymsData = await GymController.listGyms();
      setGyms(gymsData);
    } catch (error) {
      console.error('Failed to fetch gyms:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedGym) {
      // Update gym
      const updatedGym = {
        id: selectedGym.id,
        name,
        address,
        city,
        country,
      };

      try {
        await GymController.updateGym(selectedGym.id, updatedGym);
        console.log('Gym updated successfully!');
        fetchGyms();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to update gym:', error);
      }
    } else {
      // Create gym
      const newGym = {
        name,
        address,
        city,
        country,
      };

      try {
        await GymController.createGym(newGym);
        console.log('Gym created successfully!');
        fetchGyms();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to create gym:', error);
      }
    }
  };

  const handleEditGym = (gym) => {
    setSelectedGym(gym);
    setName(gym.name);
    setAddress(gym.address);
    setCity(gym.city);
    setCountry(gym.country);
    openModal();
  };

  const handleDeleteGym = async (gymId) => {
    try {
      await GymController.deleteGym(gymId);
      console.log('Gym deleted successfully!');
      fetchGyms();
    } catch (error) {
      console.error('Failed to delete gym:', error);
    }
  };

  const resetForm = () => {
    setSelectedGym(null);
    setName('');
    setAddress('');
    setCity('');
    setCountry('');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='activity-page'>
      <h1>Cadastro de Academia</h1>
      <button className='create-activity-button' onClick={openModal}>
        Cadastrar Nova Academia
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedGym ? 'Editar Academia' : 'Cadastrar Nova Academia'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Endereço:</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='activity-input'
            />
          </div>
          <div>
            <label>Cidade:</label>
            <input type='text' value={city} onChange={(e) => setCity(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>País:</label>
            <input
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className='activity-input'
            />
          </div>
          <button type='submit' className='activity-button'>
            {selectedGym ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </Modal>
      <h2>Lista de Academias</h2>
      <table className='activity-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gyms.length === 0 ? (
            <tr>
              <td colSpan='5' className='empty-message'>
                Nenhuma academia encontrada.
              </td>
            </tr>
          ) : (
            gyms.map((gym) => (
              <tr key={gym.id}>
                <td>{gym.name}</td>
                <td>{gym.address}</td>
                <td>{gym.city}</td>
                <td>{gym.country}</td>
                <td>
                  <button onClick={() => handleEditGym(gym)} className='activity-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteGym(gym.id)} className='activity-button'>
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

export default GymPage;
