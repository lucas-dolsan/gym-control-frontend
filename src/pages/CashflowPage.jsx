import React, { useState, useEffect } from 'react';
import CashFlowController from '../controllers/cashflowController';
import Modal from '../components/Modal';
import '../styles/CashflowPage.css';

const CashflowPage = () => {
  const [cashflows, setCashflows] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [showModal, setShowModal] = useState(false);
  const [selectedCashflow, setSelectedCashflow] = useState(null);

  useEffect(() => {
    fetchCashflows();
  }, []);

  const fetchCashflows = async () => {
    try {
      const cashflowsData = await CashFlowController.listCashFlows();
      setCashflows(cashflowsData);
    } catch (error) {
      console.error('Failed to fetch cashflows:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedCashflow) {
      // Update cashflow
      const updatedCashflow = {
        id: selectedCashflow.id,
        amount,
        description,
        type,
      };

      try {
        await CashFlowController.updateCashFlow(selectedCashflow.id, updatedCashflow);
        console.log('Cashflow updated successfully!');
        fetchCashflows();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to update cashflow:', error);
      }
    } else {
      // Create cashflow
      const newCashflow = {
        amount,
        description,
        type,
      };

      try {
        await CashFlowController.createCashFlow(newCashflow);
        console.log('Cashflow created successfully!');
        fetchCashflows();
        resetForm();
        closeModal();
      } catch (error) {
        console.error('Failed to create cashflow:', error);
      }
    }
  };

  const handleEditCashflow = (cashflow) => {
    setSelectedCashflow(cashflow);
    setAmount(cashflow.amount);
    setDescription(cashflow.description);
    setType(cashflow.type);
    openModal();
  };

  const handleDeleteCashflow = async (cashflowId) => {
    try {
      await CashFlowController.deleteCashFlow(cashflowId);
      console.log('Cashflow deleted successfully!');
      fetchCashflows();
    } catch (error) {
      console.error('Failed to delete cashflow:', error);
    }
  };

  const resetForm = () => {
    setSelectedCashflow(null);
    setAmount('');
    setDescription('');
    setType('income');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='cashflow-page'>
      <h1>Fluxo de Caixa</h1>
      <button className='create-cashflow-button' onClick={openModal}>
        Criar Novo Fluxo de Caixa
      </button>
      <Modal show={showModal} onClose={closeModal}>
        <h2>{selectedCashflow ? 'Editar Fluxo de Caixa' : 'Criar Novo Fluxo de Caixa'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Valor:</label>
            <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)} className='cashflow-input' />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='cashflow-textarea'
            />
          </div>
          <div>
            <label>Tipo:</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className='cashflow-select'>
              <option value='income'>Receita</option>
              <option value='expense'>Despesa</option>
            </select>
          </div>
          <button type='submit' className='cashflow-button'>
            {selectedCashflow ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
      <h2>Lista de Fluxo de Caixa</h2>
      <table className='cashflow-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cashflows.length === 0 ? (
            <tr>
              <td colSpan='6' className='empty-message'>
                Nenhum fluxo de caixa encontrado.
              </td>
            </tr>
          ) : (
            cashflows.map((cashflow) => (
              <tr key={cashflow.id}>
                <td>{cashflow.id}</td>
                <td>{cashflow.amount}</td>
                <td>{cashflow.description}</td>
                <td>{cashflow.type === 'income' ? 'Receita' : 'Despesa'}</td>
                <td>{cashflow.balance}</td>
                <td>
                  <button onClick={() => handleEditCashflow(cashflow)} className='cashflow-button'>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCashflow(cashflow.id)} className='cashflow-button'>
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

export default CashflowPage;
