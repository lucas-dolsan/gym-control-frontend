import React, { useState, useEffect } from 'react';
import GymController from '../controllers/gymController';

const GymPage = () => {
  const [gyms, setGyms] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    loadGyms();
  }, []);

  const loadGyms = async () => {
    try {
      const fetchedGyms = await GymController.listGyms();
      setGyms(fetchedGyms);
    } catch (error) {
      console.error('Failed to fetch gyms:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newGym = {
      name,
      address,
      city,
      country,
    };

    try {
      await GymController.createGym(newGym);
      console.log('Gym created successfully!');
      clearForm();
      loadGyms();
    } catch (error) {
      console.error('Failed to create gym:', error);
    }
  };

  const handleDeleteGym = async (gymId) => {
    try {
      await GymController.deleteGym(gymId);
      console.log('Gym deleted successfully!');
      loadGyms();
    } catch (error) {
      console.error('Failed to delete gym:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setAddress('');
    setCity('');
    setCountry('');
  };

  return (
    <div>
      <h1>Cadastro de Academia</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Endereço:</label>
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Cidade:</label>
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label>País:</label>
          <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>

      <h2>Lista de Academias</h2>
      {gyms.map((gym) => (
        <div key={gym.id}>
          <p>Nome: {gym.name}</p>
          <p>Endereço: {gym.address}</p>
          <p>Cidade: {gym.city}</p>
          <p>País: {gym.country}</p>
          <button onClick={() => handleDeleteGym(gym.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default GymPage;
