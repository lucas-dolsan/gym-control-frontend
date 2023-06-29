const REMOTE_ADDRESS = 'http://localhost:3001';

class StudentController {
  async createStudent(studentData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const student = await response.json();
      return student;
    } catch (error) {
      console.error('Failed to create student:', error);
      throw new Error('Failed to create student');
    }
  }

  async getStudents() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/students`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const students = await response.json();
      return students;
    } catch (error) {
      console.error('Failed to get students:', error);
      throw new Error('Failed to get students');
    }
  }

  async getStudentById(studentId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/students/${studentId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const student = await response.json();
      return student;
    } catch (error) {
      console.error('Failed to get student:', error);
      throw new Error('Failed to get student');
    }
  }

  async updateStudent(studentId, studentData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const student = await response.json();
      return student;
    } catch (error) {
      console.error('Failed to update student:', error);
      throw new Error('Failed to update student');
    }
  }

  async deleteStudent(studentId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/students/${studentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
      throw new Error('Failed to delete student');
    }
  }
}

export default new StudentController();
