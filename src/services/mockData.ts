import { Group, User, Expense } from '@/types';

// Mock users with realistic UUIDs
export const mockUsers: User[] = [
  { id: 'a1f4d2e8-3c9a-4c1a-bf74-0a4d9271a11f', name: 'Amar Kumar', email: 'amar.kumar@example.com' },
  { id: 'b3d1c6f2-62a5-4d0f-bf1b-3a9cb370a84e', name: 'Namit Jain', email: 'namit.jain@example.com' },
  { id: 'c7f8b3e1-5c42-464e-b8c3-4ddc9e7c2a75', name: 'Priya Sharma', email: 'priya.sharma@example.com' },
  { id: 'd2a5f1c4-b41a-4d2e-bf52-7d4d8a27c648', name: 'Ravi Mehta', email: 'ravi.mehta@example.com' },
  { id: 'e6b3a9d5-2f10-43f3-a659-b7d524f907b1', name: 'Sneha Reddy', email: 'sneha.reddy@example.com' }
];

export const mockGroups: Group[] = [
  {
    id: 'c1f4d2e8-3c9a-4c1a-bf74-0a4d9271a11f',
    name: 'Goa Beach Trip 🏖️',
    users: [mockUsers[0], mockUsers[1], mockUsers[2]],
    totalExpenses: 15750,
    expenses: [
      {
        id: '1',
        description: 'Beach Resort Booking',
        amount: 12000,
        paidBy: mockUsers[0].id,
        splitType: 'equal',
        splits: [
          { userId: mockUsers[0].id, amount: 4000 },
          { userId: mockUsers[1].id, amount: 4000 },
          { userId: mockUsers[2].id, amount: 4000 }
        ],
        date: new Date('2025-05-15')
      },
      {
        id: '2',
        description: 'Seafood Dinner at Tito\'s',
        amount: 2250,
        paidBy: mockUsers[1].id,
        splitType: 'percentage',
        splits: [
          { userId: mockUsers[0].id, amount: 900, percentage: 40 },
          { userId: mockUsers[1].id, amount: 675, percentage: 30 },
          { userId: mockUsers[2].id, amount: 675, percentage: 30 }
        ],
        date: new Date('2025-05-16')
      },
      {
        id: '3',
        description: 'Scuba Diving Adventure',
        amount: 1500,
        paidBy: mockUsers[2].id,
        splitType: 'equal',
        splits: [
          { userId: mockUsers[0].id, amount: 500 },
          { userId: mockUsers[1].id, amount: 500 },
          { userId: mockUsers[2].id, amount: 500 }
        ],
        date: new Date('2025-05-17')
      }
    ]
  },
  {
    id: 'a2f4d2e8-3c9a-4c1a-bf74-0a4d9271a11f', 
    name: 'Weekend Getaway 🏔️',
    users: [mockUsers[0], mockUsers[3]],
    totalExpenses: 4200,
    expenses: [
      {
        id: '4',
        description: 'Mountain Cabin Rental',
        amount: 3000,
        paidBy: mockUsers[0].id,
        splitType: 'equal',
        splits: [
          { userId: mockUsers[0].id, amount: 1500 },
          { userId: mockUsers[3].id, amount: 1500 }
        ],
        date: new Date('2025-05-20')
      },
      {
        id: '5',
        description: 'Hiking Gear & Supplies',
        amount: 1200,
        paidBy: mockUsers[3].id,
        splitType: 'equal',
        splits: [
          { userId: mockUsers[0].id, amount: 600 },
          { userId: mockUsers[3].id, amount: 600 }
        ],
        date: new Date('2025-05-21')
      }
    ]
  },
  {
    id: 'bf4d2e8-3c9a-4c1a-bf74-0a4d9271a11f',
    name: 'Office Team Lunch 🍕',
    users: [mockUsers[0], mockUsers[1], mockUsers[3], mockUsers[4]],
    totalExpenses: 2800,
    expenses: [
      {
        id: '6',
        description: 'Pizza Party',
        amount: 2800,
        paidBy: mockUsers[0].id,
        splitType: 'equal',
        splits: [
          { userId: mockUsers[0].id, amount: 700 },
          { userId: mockUsers[1].id, amount: 700 },
          { userId: mockUsers[3].id, amount: 700 },
          { userId: mockUsers[4].id, amount: 700 }
        ],
        date: new Date('2025-05-25')
      }
    ]
  }
];
