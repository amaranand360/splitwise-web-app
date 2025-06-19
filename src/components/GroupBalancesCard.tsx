
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { Group, Balance } from '@/types';
import BalanceCard from './BalanceCard';

interface GroupBalancesCardProps {
  group: Group;
}

const GroupBalancesCard = ({ group }: GroupBalancesCardProps) => {
  // Calculate balances between users
  const calculateBalances = (): Balance[] => {
    const userBalances: { [userId: string]: number } = {};
    
    // Initialize balances
    group.users.forEach(user => {
      userBalances[user.id] = 0;
    });
    
    // Calculate what each user owes/is owed
    group.expenses.forEach(expense => {
      expense.splits.forEach(split => {
        if (split.userId === expense.paidBy) {
          // User paid more than their share
          userBalances[split.userId] += expense.amount - split.amount;
        } else {
          // User owes money
          userBalances[split.userId] -= split.amount;
        }
      });
    });
    
    // Convert to balance objects
    const balances: Balance[] = [];
    const userIds = Object.keys(userBalances);
    
    for (let i = 0; i < userIds.length; i++) {
      for (let j = i + 1; j < userIds.length; j++) {
        const user1Id = userIds[i];
        const user2Id = userIds[j];
        const balance1 = userBalances[user1Id];
        const balance2 = userBalances[user2Id];
        
        if (balance1 > 0 && balance2 < 0) {
          const amount = Math.min(balance1, Math.abs(balance2));
          if (amount > 0) {
            balances.push({
              fromUserId: user2Id,
              toUserId: user1Id,
              amount
            });
          }
        } else if (balance2 > 0 && balance1 < 0) {
          const amount = Math.min(balance2, Math.abs(balance1));
          if (amount > 0) {
            balances.push({
              fromUserId: user1Id,
              toUserId: user2Id,
              amount
            });
          }
        }
      }
    }
    
    return balances;
  };

  const balances = calculateBalances();

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Scale className="w-5 h-5 mr-2 text-purple-600" />
          Balances
        </CardTitle>
      </CardHeader>
      <CardContent>
        {balances.length > 0 ? (
          <div className="space-y-3">
            {balances.map((balance, index) => (
              <BalanceCard key={index} balance={balance} users={group.users} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Scale className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">All settled up! 🎉</p>
            <p className="text-sm text-gray-500">No outstanding balances</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupBalancesCard;
