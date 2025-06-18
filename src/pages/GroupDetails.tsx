
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Users, DollarSign } from 'lucide-react';
import { Group, Expense, Balance } from '@/types';
import AddExpenseModal from '@/components/AddExpenseModal';
import ExpenseCard from '@/components/ExpenseCard';
import BalanceCard from '@/components/BalanceCard';
import { mockGroups } from '@/services/mockData';

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    // Find the actual group data based on the groupId parameter
    const foundGroup = mockGroups.find(g => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
    }
  }, [groupId]);

  // Calculate balances for the current group
  const calculateBalances = (group: Group): Balance[] => {
    const userBalances: { [userId: string]: number } = {};
    
    // Initialize balances
    group.users.forEach(user => {
      userBalances[user.id] = 0;
    });

    // Calculate what each user should pay vs what they paid
    group.expenses.forEach(expense => {
      // Add what the payer paid
      userBalances[expense.paidBy] += expense.amount;
      
      // Subtract what each user owes
      expense.splits.forEach(split => {
        userBalances[split.userId] -= split.amount;
      });
    });

    // Convert to balance format (who owes whom)
    const balances: Balance[] = [];
    const userIds = Object.keys(userBalances);
    
    for (let i = 0; i < userIds.length; i++) {
      for (let j = 0; j < userIds.length; j++) {
        if (i !== j) {
          const fromUserId = userIds[i];
          const toUserId = userIds[j];
          
          if (userBalances[fromUserId] < 0 && userBalances[toUserId] > 0) {
            const amount = Math.min(Math.abs(userBalances[fromUserId]), userBalances[toUserId]);
            if (amount > 0) {
              balances.push({
                fromUserId,
                toUserId,
                amount
              });
            }
          }
        }
      }
    }
    
    return balances;
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'date'>) => {
    if (!group) return;
    
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      date: new Date()
    };
    
    setGroup(prev => {
      if (!prev) return null;
      return {
        ...prev,
        expenses: [...prev.expenses, newExpense],
        totalExpenses: prev.totalExpenses + newExpense.amount
      };
    });
    
    setIsAddExpenseOpen(false);
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Group not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const balances = calculateBalances(group);
  const getGroupIcon = (name: string) => {
    if (name.includes('🏖️') || name.toLowerCase().includes('beach')) return '🏖️';
    if (name.includes('🏔️') || name.toLowerCase().includes('mountain')) return '🏔️';
    if (name.includes('🍕') || name.toLowerCase().includes('lunch')) return '🍕';
    return '👥';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Groups
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-2xl shadow-lg">
                  {getGroupIcon(group.name)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    {group.name.replace(/[🏖️🏔️🍕👥]/g, '').trim()}
                  </h1>
                  <p className="text-gray-600">{group.users.length} members • ₹{group.totalExpenses.toLocaleString()} total</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsAddExpenseOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Members & Summary */}
          <div className="space-y-6">
            {/* Members Card */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Members</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {group.users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white font-medium shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-blue-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-semibold text-gray-900">₹{group.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Per Person</span>
                  <span className="font-semibold text-gray-900">₹{(group.totalExpenses / group.users.length).toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Transactions</span>
                  <span className="font-semibold text-gray-900">{group.expenses.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Balances */}
            {balances.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader className="bg-gradient-to-br from-emerald-50 to-blue-50">
                  <CardTitle className="text-gray-900">Balances</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {balances.map((balance, index) => (
                    <BalanceCard key={index} balance={balance} users={group.users} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Expenses */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-blue-50">
                <CardTitle className="text-gray-900">Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {group.expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center mx-auto mb-6">
                      <DollarSign className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses yet</h3>
                    <p className="text-gray-600 mb-6">Add your first expense to get started tracking group spending</p>
                    <Button
                      onClick={() => setIsAddExpenseOpen(true)}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Expense
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {group.expenses.map((expense) => (
                      <ExpenseCard key={expense.id} expense={expense} users={group.users} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <AddExpenseModal
          open={isAddExpenseOpen}
          onOpenChange={setIsAddExpenseOpen}
          onAddExpense={handleAddExpense}
          users={group.users}
        />
      </div>
    </div>
  );
};

export default GroupDetails;
