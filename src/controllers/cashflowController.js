const REMOTE_ADDRESS = 'http://localhost:3001';

class CashFlowController {
  async createCashFlow(cashFlowData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/cashflows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashFlowData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const cashFlow = await response.json();
      return cashFlow;
    } catch (error) {
      console.error('Failed to create cash flow:', error);
      throw new Error('Failed to create cash flow');
    }
  }

  async getCashFlow(cashFlowId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/cashflows/${cashFlowId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const cashFlow = await response.json();
      return cashFlow;
    } catch (error) {
      console.error('Failed to get cash flow:', error);
      throw new Error('Failed to get cash flow');
    }
  }

  async updateCashFlow(cashFlowId, cashFlowData) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/cashflows/${cashFlowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashFlowData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const cashFlow = await response.json();
      return cashFlow;
    } catch (error) {
      console.error('Failed to update cash flow:', error);
      throw new Error('Failed to update cash flow');
    }
  }

  async deleteCashFlow(cashFlowId) {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/cashflows/${cashFlowId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Failed to delete cash flow:', error);
      throw new Error('Failed to delete cash flow');
    }
  }

  async listCashFlows() {
    try {
      const response = await fetch(`${REMOTE_ADDRESS}/cashflows`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const cashFlows = await response.json();
      return cashFlows;
    } catch (error) {
      console.error('Failed to list cash flows:', error);
      throw new Error('Failed to list cash flows');
    }
  }
}

export default new CashFlowController();
