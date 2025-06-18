
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Calendar, User } from 'lucide-react';
import { Expense, User as UserType } from '@/types';

interface ExpenseCardProps {
  expense: Expense;
  users: UserType[];
}

const ExpenseCard = ({ expense, users }: ExpenseCardProps) => {
  const paidByUser = users.find(user => user.id === expense.paidBy);
  
  return (
    <Card className="bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border-0 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">{expense.description}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1 bg-emerald-50 px-2 py-1 rounded-lg">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">₹{expense.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{expense.date.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-lg">
                <User className="w-4 h-4 text-purple-600" />
                <span>Paid by {paidByUser?.name}</span>
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                {expense.splitType}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl text-gray-900">₹{expense.amount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              Split {expense.splits.length} ways
            </div>
          </div>
        </div>
        
        {/* Split Details */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Split Details:</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expense.splits.map((split) => {
              const user = users.find(u => u.id === split.userId);
              return (
                <div key={split.userId} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-medium">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{split.amount.toLocaleString()}
                    {split.percentage && (
                      <span className="text-gray-500 ml-1 text-xs">({split.percentage}%)</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
