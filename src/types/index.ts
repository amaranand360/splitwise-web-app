
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Split {
  userId: string;
  amount: number;
  percentage?: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'equal' | 'percentage';
  splits: Split[];
  date: Date;
}

export interface Group {
  id: string;
  name: string;
  users: User[];
  totalExpenses: number;
  expenses: Expense[];
}

export interface Balance {
  fromUserId: string;
  toUserId: string;
  amount: number;
}
