const REMOTE_ADDRESS = 'http://localhost:3001';

class ProfessionalController {
  // TODO: create delete button

  async createProfessional(professionalData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/professional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professionalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const professional = await response.json();
      return professional;
    } catch (error) {
      console.error('Failed to create professional:', error);
      throw new Error('Failed to create professional');
    }
  }

  async getProfessionals() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/professional`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const professionals = await response.json();
      return professionals;
    } catch (error) {
      console.error('Failed to get professionals:', error);
      throw new Error('Failed to get professionals');
    }
  }

  async getProfessionalById(professionalId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/professional/${professionalId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const professional = await response.json();
      return professional;
    } catch (error) {
      console.error('Failed to get professional:', error);
      throw new Error('Failed to get professional');
    }
  }

  async updateProfessional(professionalId, professionalData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/professional/${professionalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professionalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const professional = await response.json();
      return professional;
    } catch (error) {
      console.error('Failed to update professional:', error);
      throw new Error('Failed to update professional');
    }
  }

  async deleteProfessional(professionalId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/professional/${professionalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete professional:', error);
      throw new Error('Failed to delete professional');
    }
  }
}

export default new ProfessionalController();
