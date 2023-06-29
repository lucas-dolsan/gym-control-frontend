import React, { useState, useEffect } from 'react';
import ProfessionalController from '../controllers/professionalController';

const ProfessionalPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const professionals = await ProfessionalController.getProfessionals();
      setProfessionals(professionals);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newProfessional = {
      name,
      specialization,
      experience,
    };

    try {
      await ProfessionalController.createProfessional(newProfessional);
      console.log('Professional created successfully!');
      fetchProfessionals(); // Atualiza a lista de profissionais após a criação
      clearForm(); // Limpa os campos do formulário
    } catch (error) {
      console.error('Failed to create professional:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setSpecialization('');
    setExperience('');
  };

  return (
    <div>
      <h1>Cadastro de Profissional</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nome:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Especialização:</label>
          <input type='text' value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
        </div>
        <div>
          <label>Experiência:</label>
          <input type='text' value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
        <button type='submit'>Cadastrar</button>
      </form>

      <h2>Profissionais</h2>
      <ul>
        {professionals.map((professional) => (
          <li key={professional.id}>
            <span>{professional.name}</span>
            <span>{professional.specialization}</span>
            <span>{professional.experience}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionalPage;
