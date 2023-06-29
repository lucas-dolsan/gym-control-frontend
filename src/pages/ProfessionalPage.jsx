import React, { useState, useEffect } from 'react';
import ProfessionalController from '../controllers/professionalController';
import Modal from '../components/Modal';
import '../styles/ActivityPage.css';

const ProfessionalPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const professionalsData = await ProfessionalController.getProfessionals();
      setProfessionals(professionalsData);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedProfessional) {
      // Update professional
      const updatedProfessional = {
        id: selectedProfessional.id,
        name,
        specialization,
        experience,
      };

      try {
        await ProfessionalController.updateProfessional(selectedProfessional.id, updatedProfessional);
        console.log('Professional updated successfully!');
        fetchProfessionals();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to update professional:', error);
      }
    } else {
      // Create professional
      const newProfessional = {
        name,
        specialization,
        experience,
      };

      try {
        await ProfessionalController.createProfessional(newProfessional);
        console.log('Professional created successfully!');
        fetchProfessionals();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to create professional:', error);
      }
    }
  };

  const handleDeleteProfessional = async (ProfessionalId) => {
    try {
      await ProfessionalController.deleteProfessional(ProfessionalId);
      console.log('Professional deleted successfully!');
      fetchProfessionals();
    } catch (error) {
      console.error('Failed to delete equipment:', error);
    }
  };

  const handleEditProfessional = (professional) => {
    setSelectedProfessional(professional);
    setName(professional.name);
    setSpecialization(professional.specialization);
    setExperience(professional.experience);
    openModal();
  };

  const resetForm = () => {
    setSelectedProfessional(null);
    setName('');
    setSpecialization('');
    setExperience('');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='activity-page'>
      <h1>Cadastro de Profissional</h1>
      <button className='create-activity-button' onClick={openModal}>
        Cadastrar Novo Profissional
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedProfessional ? 'Editar Profissional' : 'Cadastrar Novo Profissional'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Especialização:</label>
            <input
              type='text'
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className='activity-input'
            />
          </div>
          <div>
            <label>Experiência:</label>
            <input
              type='text'
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className='activity-input'
            />
          </div>
          <button type='submit' className='activity-button'>
            {selectedProfessional ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </Modal>
      <h2>Profissionais</h2>
      <table className='activity-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Especialização</th>
            <th>Experiência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professionals.length === 0 ? (
            <tr>
              <td colSpan='4' className='empty-message'>
                Nenhum profissional encontrado.
              </td>
            </tr>
          ) : (
            professionals.map((professional) => (
              <tr key={professional.id}>
                <td>{professional.name}</td>
                <td>{professional.specialization}</td>
                <td>{professional.experience}</td>
                <td>
                  <button onClick={() => handleEditProfessional(professional)} className='activity-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProfessional(professional.id)} className='activity-button'>
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

export default ProfessionalPage;
