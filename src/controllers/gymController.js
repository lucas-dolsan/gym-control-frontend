const REMOTE_ADDRESS = 'http://localhost:3001';

class GymController {
  async createGym(gymData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/gym`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const gym = await response.json();
      return gym;
    } catch (error) {
      console.error('Failed to create gym:', error);
      throw new Error('Failed to create gym');
    }
  }

  async getGym(gymId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/gym/${gymId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const gym = await response.json();
      return gym;
    } catch (error) {
      console.error('Failed to get gym:', error);
      throw new Error('Failed to get gym');
    }
  }

  async updateGym(gymId, gymData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/gym/${gymId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const gym = await response.json();
      return gym;
    } catch (error) {
      console.error('Failed to update gym:', error);
      throw new Error('Failed to update gym');
    }
  }

  async deleteGym(gymId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/gym/${gymId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete gym:', error);
      throw new Error('Failed to delete gym');
    }
  }

  async listGyms() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/gym`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const gyms = await response.json();
      return gyms;
    } catch (error) {
      console.error('Failed to list gyms:', error);
      throw new Error('Failed to list gyms');
    }
  }
}

export default new GymController();
