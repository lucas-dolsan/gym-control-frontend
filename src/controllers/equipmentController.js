const REMOTE_ADDRESS = 'http://localhost:3001';

class EquipmentController {
  async createEquipment(equipmentData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const equipment = await response.json();
      return equipment;
    } catch (error) {
      console.error('Failed to create equipment:', error);
      throw new Error('Failed to create equipment');
    }
  }

  async getAllEquipment() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/equipment`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const equipment = await response.json();
      return equipment;
    } catch (error) {
      console.error('Failed to get equipment:', error);
      throw new Error('Failed to get equipment');
    }
  }

  async getEquipmentById(equipmentId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/equipment/${equipmentId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const equipment = await response.json();
      return equipment;
    } catch (error) {
      console.error('Failed to get equipment:', error);
      throw new Error('Failed to get equipment');
    }
  }

  async updateEquipment(equipmentId, equipmentData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/equipment/${equipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const equipment = await response.json();
      return equipment;
    } catch (error) {
      console.error('Failed to update equipment:', error);
      throw new Error('Failed to update equipment');
    }
  }

  async deleteEquipment(equipmentId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/equipment/${equipmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete equipment:', error);
      throw new Error('Failed to delete equipment');
    }
  }
}

export default new EquipmentController();
