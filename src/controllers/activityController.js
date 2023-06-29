class ActivityController {
  async createActivity(activityData) {
    try {
      const response = await fetch('http://localhost:3001/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const newActivity = await response.json();
      return newActivity;
    } catch (error) {
      console.error('Failed to create activity:', error);
      throw new Error('Failed to create activity');
    }
  }

  async getAllActivities() {
    try {
      const response = await fetch('http://localhost:3001/activity');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const activities = await response.json();
      return activities;
    } catch (error) {
      console.error('Failed to get activities:', error);
      throw new Error('Failed to get activities');
    }
  }

  async getActivityById(activityId) {
    try {
      const response = await fetch(`http://localhost:3001/activity/${activityId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const activity = await response.json();
      return activity;
    } catch (error) {
      console.error('Failed to get activity:', error);
      throw new Error('Failed to get activity');
    }
  }

  async updateActivity(activityId, activityData) {
    try {
      const response = await fetch(`http://localhost:3001/activity/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const updatedActivity = await response.json();
      return updatedActivity;
    } catch (error) {
      console.error('Failed to update activity:', error);
      throw new Error('Failed to update activity');
    }
  }

  async deleteActivity(activityId) {
    try {
      const response = await fetch(`http://localhost:3001/activity/${activityId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete activity:', error);
      throw new Error('Failed to delete activity');
    }
  }
}

export default new ActivityController();
