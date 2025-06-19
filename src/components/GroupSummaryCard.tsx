
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Receipt } from 'lucide-react';
import { Group } from '@/types';

interface GroupSummaryCardProps {
  group: Group;
}

const GroupSummaryCard = ({ group }: GroupSummaryCardProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Receipt className="w-5 h-5 mr-2 text-emerald-600" />
          Group Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{group.totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-lg font-semibold text-blue-600">{group.expenses.length}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Per Person</p>
            <p className="text-lg font-semibold text-purple-600">₹{(group.totalExpenses / group.users.length).toFixed(0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupSummaryCard;
