
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, Plus, TrendingUp } from 'lucide-react';
import { Group } from '@/types';
import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate(`/groups/${group.id}`);
  };

  const getGroupIcon = (name: string) => {
    if (name.includes('🏖️') || name.toLowerCase().includes('beach')) return '🏖️';
    if (name.includes('🏔️') || name.toLowerCase().includes('mountain')) return '🏔️';
    if (name.includes('🍕') || name.toLowerCase().includes('lunch')) return '🍕';
    return '👥';
  };

  const avgExpensePerPerson = group.totalExpenses / group.users.length;

  return (
    <Card 
      className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105 cursor-pointer group overflow-hidden"
      onClick={handleViewGroup}
    >
      <CardHeader className="pb-3 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-2xl shadow-lg">
              {getGroupIcon(group.name)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {group.name.replace(/[🏖️🏔️🍕👥]/g, '').trim()}
              </CardTitle>
              <p className="text-sm text-gray-500">{group.expenses.length} expenses</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Members</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{group.users.length}</span>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Total</span>
            </div>
            <span className="text-lg font-bold text-gray-900">₹{group.totalExpenses.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg per person:</span>
            <span className="font-semibold text-gray-900">₹{avgExpensePerPerson.toFixed(0)}</span>
          </div>
        </div>

        <div className="flex -space-x-2 mb-4">
          {group.users.slice(0, 4).map((user, index) => (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-md"
              style={{ zIndex: 4 - index }}
              title={user.name}
            >
              {user.name.charAt(0)}
            </div>
          ))}
          {group.users.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white shadow-md">
              +{group.users.length - 4}
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleViewGroup();
            }}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-sm font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            onClick={(e) => e.stopPropagation()}
            variant="outline"
            size="sm"
            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
