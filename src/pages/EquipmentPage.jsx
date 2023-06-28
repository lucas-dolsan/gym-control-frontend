import React, { useState, useEffect } from 'react';
import EquipmentController from '../controllers/equipmentController';

const EquipmentPage = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setName('');
    setType('');
    setDescription('');
  };

  const fetchEquipmentList = async () => {
    try {
      const equipment = await EquipmentController.getAllEquipment();
      setEquipmentList(equipment);
    } catch (error) {
      console.error('Failed to fetch equipment list:', error);
    }
  };

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newEquipment = {
      name,
      type,
      description,
    };

    try {
      await EquipmentController.createEquipment(newEquipment);
      console.log('Equipment created successfully!');
      fetchEquipmentList();
      resetForm();
    } catch (error) {
      console.error('Failed to create equipment:', error);
    }
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

  return (
    <div>
      <h1>Equipment</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Type:</label>
          <input type='text' value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>

      <h2>Equipment List</h2>
      <ul>
        {equipmentList.map((equipment) => (
          <li key={equipment.id}>
            {equipment.name} - {equipment.type} - {equipment.description}
            <button onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentPage;
