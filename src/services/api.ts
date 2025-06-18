
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Group endpoints
  async createGroup(groupData: { name: string; user_ids: string[] }) {
    return this.request('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  }

  async getGroup(groupId: string) {
    return this.request(`/groups/${groupId}`);
  }

  async getGroups() {
    return this.request('/groups');
  }

  // Expense endpoints
  async addExpense(groupId: string, expenseData: any) {
    return this.request(`/groups/${groupId}/expenses`, {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });
  }

  // Balance endpoints
  async getGroupBalances(groupId: string) {
    return this.request(`/groups/${groupId}/balances`);
  }

  async getUserBalances(userId: string) {
    return this.request(`/users/${userId}/balances`);
  }
}

export const apiService = new ApiService();
