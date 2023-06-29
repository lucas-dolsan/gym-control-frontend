import React, { useState, useEffect } from 'react';
import EquipmentController from '../controllers/equipmentController';
import Modal from '../components/Modal';
import '../styles/ActivityPage.css';

const EquipmentPage = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  const fetchEquipmentList = async () => {
    try {
      const equipment = await EquipmentController.getAllEquipment();
      setEquipmentList(equipment);
    } catch (error) {
      console.error('Failed to fetch equipment list:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedEquipment) {
      // Update equipment
      const updatedEquipment = {
        id: selectedEquipment.id,
        name,
        type,
        description,
      };

      try {
        await EquipmentController.updateEquipment(selectedEquipment.id, updatedEquipment);
        console.log('Equipment updated successfully!');
        resetForm();
        fetchEquipmentList();
        closeModal();
      } catch (error) {
        console.error('Failed to update equipment:', error);
      }
    } else {
      // Create equipment
      const newEquipment = {
        name,
        type,
        description,
      };

      try {
        await EquipmentController.createEquipment(newEquipment);
        console.log('Equipment created successfully!');
        resetForm();
        fetchEquipmentList();
        closeModal();
      } catch (error) {
        console.error('Failed to create equipment:', error);
      }
    }
  };

  const handleEditEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setName(equipment.name);
    setType(equipment.type);
    setDescription(equipment.description);
    openModal();
  };

  const handleDeleteEquipment = async (equipmentId) => {
    try {
      await EquipmentController.deleteEquipment(equipmentId);
      console.log('Equipment deleted successfully!');
      fetchEquipmentList();
    } catch (error) {
      console.error('Failed to delete equipment:', error);
    }
  };

  const resetForm = () => {
    setSelectedEquipment(null);
    setName('');
    setType('');
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
      <h1>Equipamentos</h1>
      <button className='create-activity-button' onClick={openModal}>
        Criar Novo Equipamento
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedEquipment ? 'Editar Equipamento' : 'Criar Novo Equipamento'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Tipo:</label>
            <input type='text' value={type} onChange={(e) => setType(e.target.value)} className='activity-input' />
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
            {selectedEquipment ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
      <h2>Lista de Equipamentos</h2>
      <table className='activity-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.length === 0 ? (
            <tr>
              <td colSpan='4' className='empty-message'>
                Nenhum equipamento encontrado.
              </td>
            </tr>
          ) : (
            equipmentList.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.description}</td>
                <td>
                  <button onClick={() => handleEditEquipment(equipment)} className='activity-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteEquipment(equipment.id)} className='activity-button'>
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

export default EquipmentPage;
