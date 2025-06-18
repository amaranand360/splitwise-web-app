
import { Group, User, Expense } from '@/types';

// Mock data that simulates API responses
export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
  { id: '4', name: 'David Wilson', email: 'david@example.com' },
  { id: '5', name: 'Emma Davis', email: 'emma@example.com' }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Goa Beach Trip 🏖️',
    users: [mockUsers[0], mockUsers[1], mockUsers[2]],
    totalExpenses: 15750,
    expenses: [
      {
        id: '1',
        description: 'Beach Resort Booking',
        amount: 12000,
        paidBy: '1',
        splitType: 'equal',
        splits: [
          { userId: '1', amount: 4000 },
          { userId: '2', amount: 4000 },
          { userId: '3', amount: 4000 }
        ],
        date: new Date('2024-01-15')
      },
      {
        id: '2',
        description: 'Seafood Dinner at Tito\'s',
        amount: 2250,
        paidBy: '2',
        splitType: 'percentage',
        splits: [
          { userId: '1', amount: 900, percentage: 40 },
          { userId: '2', amount: 675, percentage: 30 },
          { userId: '3', amount: 675, percentage: 30 }
        ],
        date: new Date('2024-01-16')
      },
      {
        id: '3',
        description: 'Scuba Diving Adventure',
        amount: 1500,
        paidBy: '3',
        splitType: 'equal',
        splits: [
          { userId: '1', amount: 500 },
          { userId: '2', amount: 500 },
          { userId: '3', amount: 500 }
        ],
        date: new Date('2024-01-17')
      }
    ]
  },
  {
    id: '2', 
    name: 'Weekend Getaway 🏔️',
    users: [mockUsers[0], mockUsers[3]],
    totalExpenses: 4200,
    expenses: [
      {
        id: '4',
        description: 'Mountain Cabin Rental',
        amount: 3000,
        paidBy: '1',
        splitType: 'equal',
        splits: [
          { userId: '1', amount: 1500 },
          { userId: '4', amount: 1500 }
        ],
        date: new Date('2024-01-20')
      },
      {
        id: '5',
        description: 'Hiking Gear & Supplies',
        amount: 1200,
        paidBy: '4',
        splitType: 'equal',
        splits: [
          { userId: '1', amount: 600 },
          { userId: '4', amount: 600 }
        ],
        date: new Date('2024-01-21')
      }
    ]
  },
  {
    id: '3',
    name: 'Office Team Lunch 🍕',
    users: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4]],
    totalExpenses: 2800,
    expenses: [
      {
        id: '6',
        description: 'Pizza Party',
        amount: 2800,
        paidBy: '1',
        splitType: 'equal',
        splits: [
          { userId: '1', amount: 700 },
          { userId: '2', amount: 700 },
          { userId: '4', amount: 700 },
          { userId: '5', amount: 700 }
        ],
        date: new Date('2024-01-25')
      }
    ]
  }
];
