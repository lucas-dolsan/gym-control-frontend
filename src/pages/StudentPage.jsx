import React, { useState, useEffect } from 'react';
import StudentController from '../controllers/studentController';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = async () => {
    try {
      const studentsData = await StudentController.getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      name,
      age,
      email,
    };

    try {
      await StudentController.createStudent(newStudent);
      console.log('Student created successfully!');
      fetchStudents();
      setName('');
      setAge('');
      setEmail('');
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await StudentController.deleteStudent(studentId);
      console.log('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type='text' value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type='submit'>Create Student</button>
      </form>

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPage;
