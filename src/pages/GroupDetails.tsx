
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Group, Expense } from '@/types';
import AddExpenseModal from '@/components/AddExpenseModal';
import GroupHeader from '@/components/GroupHeader';
import GroupSummaryCard from '@/components/GroupSummaryCard';
import GroupMembersCard from '@/components/GroupMembersCard';
import GroupBalancesCard from '@/components/GroupBalancesCard';
import GroupExpensesCard from '@/components/GroupExpensesCard';
import { mockGroups } from '@/services/mockData';

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    console.log('Loading group with ID:', groupId);
    
    // First check mock data
    let foundGroup = mockGroups.find(g => g.id === groupId);
    
    // If not found in mock data, check localStorage
    if (!foundGroup) {
      const savedGroups = localStorage.getItem('userGroups');
      if (savedGroups) {
        const parsedGroups = JSON.parse(savedGroups);
        // Convert date strings back to Date objects
        const groupsWithDates = parsedGroups.map((group: Group) => ({
          ...group,
          expenses: group.expenses.map((expense: any) => ({
            ...expense,
            date: new Date(expense.date)
          }))
        }));
        foundGroup = groupsWithDates.find((g: Group) => g.id === groupId);
      }
    }
    
    console.log('Found group:', foundGroup);
    if (foundGroup) {
      setGroup(foundGroup);
    }
  }, [groupId]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'date'>) => {
    if (!group) return;
    
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      date: new Date()
    };
    
    const updatedGroup = {
      ...group,
      expenses: [...group.expenses, newExpense],
      totalExpenses: group.totalExpenses + newExpense.amount
    };
    
    setGroup(updatedGroup);
    
    // Update localStorage if this is a user-created group (not in mock data)
    if (!mockGroups.find(g => g.id === group.id)) {
      const savedGroups = localStorage.getItem('userGroups');
      if (savedGroups) {
        const parsedGroups = JSON.parse(savedGroups);
        const updatedGroups = parsedGroups.map((g: Group) => 
          g.id === group.id ? updatedGroup : g
        );
        localStorage.setItem('userGroups', JSON.stringify(updatedGroups));
      }
    }
    
    setIsAddExpenseOpen(false);
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Group not found</h2>
          <p className="text-gray-600 mb-4">The group you're looking for doesn't exist or may have been deleted.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
              <GroupHeader group={group} />
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
            <GroupMembersCard users={group.users} />
            <GroupSummaryCard group={group} />
            <GroupBalancesCard group={group} />
          </div>

          {/* Right Column - Expenses */}
          <div className="lg:col-span-2">
            <GroupExpensesCard 
              group={group} 
              onAddExpense={() => setIsAddExpenseOpen(true)} 
            />
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
