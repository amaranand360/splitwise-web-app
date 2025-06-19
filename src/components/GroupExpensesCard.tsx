
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Plus } from 'lucide-react';
import { Group } from '@/types';
import ExpenseCard from './ExpenseCard';

interface GroupExpensesCardProps {
  group: Group;
  onAddExpense: () => void;
}

const GroupExpensesCard = ({ group, onAddExpense }: GroupExpensesCardProps) => {
  const sortedExpenses = [...group.expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-emerald-600" />
            Recent Expenses ({group.expenses.length})
          </CardTitle>
          <Button
            onClick={onAddExpense}
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {sortedExpenses.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} users={group.users} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first expense to this group</p>
            <Button
              onClick={onAddExpense}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Expense
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupExpensesCard;
