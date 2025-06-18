
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Expense } from '@/types';

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense: (expenseData: Omit<Expense, 'id' | 'date'>) => void;
  users: User[];
}

const AddExpenseModal = ({ open, onOpenChange, onAddExpense, users }: AddExpenseModalProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'percentage'>('equal');
  const [percentages, setPercentages] = useState<{ [userId: string]: number }>({});

  const handleSubmit = () => {
    if (!description.trim() || !amount || !paidBy) return;

    const expenseAmount = parseFloat(amount);
    let splits;

    if (splitType === 'equal') {
      const splitAmount = expenseAmount / users.length;
      splits = users.map(user => ({
        userId: user.id,
        amount: splitAmount
      }));
    } else {
      splits = users.map(user => ({
        userId: user.id,
        amount: (expenseAmount * (percentages[user.id] || 0)) / 100,
        percentage: percentages[user.id] || 0
      }));
    }

    onAddExpense({
      description: description.trim(),
      amount: expenseAmount,
      paidBy,
      splitType,
      splits
    });

    // Reset form
    setDescription('');
    setAmount('');
    setPaidBy('');
    setSplitType('equal');
    setPercentages({});
  };

  const handleClose = () => {
    setDescription('');
    setAmount('');
    setPaidBy('');
    setSplitType('equal');
    setPercentages({});
    onOpenChange(false);
  };

  const handlePercentageChange = (userId: string, percentage: number) => {
    setPercentages(prev => ({ ...prev, [userId]: percentage }));
  };

  const totalPercentage = Object.values(percentages).reduce((sum, p) => sum + p, 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Expense</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Dinner at restaurant"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paidBy" className="text-sm font-medium text-gray-700">
              Paid by
            </Label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select person</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Split Type</Label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="equal"
                  checked={splitType === 'equal'}
                  onChange={(e) => setSplitType(e.target.value as 'equal')}
                  className="mr-2"
                />
                Equal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="percentage"
                  checked={splitType === 'percentage'}
                  onChange={(e) => setSplitType(e.target.value as 'percentage')}
                  className="mr-2"
                />
                Percentage
              </label>
            </div>
          </div>

          {splitType === 'percentage' && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Split Percentages {totalPercentage > 0 && `(Total: ${totalPercentage}%)`}
              </Label>
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-2">
                  <span className="text-sm w-20">{user.name}</span>
                  <Input
                    type="number"
                    value={percentages[user.id] || ''}
                    onChange={(e) => handlePercentageChange(user.id, parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              ))}
              {totalPercentage !== 100 && totalPercentage > 0 && (
                <p className="text-xs text-red-500">Percentages must add up to 100%</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!description.trim() || !amount || !paidBy || (splitType === 'percentage' && totalPercentage !== 100)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Add Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
