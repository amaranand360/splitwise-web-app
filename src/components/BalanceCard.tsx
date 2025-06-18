
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Balance, User } from '@/types';

interface BalanceCardProps {
  balance: Balance;
  users: User[];
}

const BalanceCard = ({ balance, users }: BalanceCardProps) => {
  const fromUser = users.find(user => user.id === balance.fromUserId);
  const toUser = users.find(user => user.id === balance.toUserId);

  if (!fromUser || !toUser) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-xl border border-gray-200/50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium shadow-lg">
          {fromUser.name.charAt(0)}
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white text-sm font-medium shadow-lg">
          {toUser.name.charAt(0)}
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600 font-medium">
          {fromUser.name} owes {toUser.name}
        </p>
        <p className="font-bold text-lg text-gray-900">₹{balance.amount.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BalanceCard;
