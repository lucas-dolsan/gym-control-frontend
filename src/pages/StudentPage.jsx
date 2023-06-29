import React, { useState, useEffect } from 'react';
import StudentController from '../controllers/studentController';
import Modal from '../components/Modal';
import '../styles/ActivityPage.css';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const studentsData = await StudentController.getStudents();
      setStudents(studentsData);
    } catch (error) {
      console.error('Falha ao buscar os estudantes:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedStudent) {
      // Atualizar estudante
      const updatedStudent = {
        id: selectedStudent.id,
        name,
        age,
        email,
      };

      try {
        await StudentController.updateStudent(selectedStudent.id, updatedStudent);
        console.log('Estudante atualizado com sucesso!');
        fetchStudents();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Falha ao atualizar o estudante:', error);
      }
    } else {
      // Criar estudante
      const newStudent = {
        name,
        age,
        email,
      };

      try {
        await StudentController.createStudent(newStudent);
        console.log('Estudante criado com sucesso!');
        fetchStudents();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Falha ao criar o estudante:', error);
      }
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    openModal();
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await StudentController.deleteStudent(studentId);
      console.log('Estudante excluído com sucesso!');
      fetchStudents();
    } catch (error) {
      console.error('Falha ao excluir o estudante:', error);
    }
  };

  const resetForm = () => {
    setSelectedStudent(null);
    setName('');
    setAge('');
    setEmail('');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='activity-page'>
      <h1>Estudantes</h1>
      <button className='create-activity-button' onClick={openModal}>
        Criar Novo Estudante
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedStudent ? 'Editar Estudante' : 'Criar Novo Estudante'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Idade:</label>
            <input type='text' value={age} onChange={(e) => setAge(e.target.value)} className='activity-input' />
          </div>
          <div>
            <label>Email:</label>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='activity-input' />
          </div>
          <button type='submit' className='activity-button'>
            {selectedStudent ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
      <h2>Lista de Estudantes</h2>
      <table className='activity-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan='5' className='empty-message'>
                Nenhum estudante encontrado.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => handleEditStudent(student)} className='activity-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteStudent(student.id)} className='activity-button'>
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

export default StudentPage;
