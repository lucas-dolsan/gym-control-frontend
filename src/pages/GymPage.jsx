import React, { useState } from 'react';
import GymController from '../controllers/gymController';

const GymPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newGym = {
      name,
      address,
      city,
      country,
    };

    console.log({ newGym });

    try {
      await GymController.createGym(newGym);
      console.log('Gym created successfully!');
    } catch (error) {
      console.error('Failed to create gym:', error);
    }
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
    </div>
  );
};

export default GymPage;
