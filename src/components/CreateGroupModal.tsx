
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, UserPlus, Users } from 'lucide-react';
import { User } from '@/types';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (groupData: { name: string; users: User[] }) => void;
}

const CreateGroupModal = ({ open, onOpenChange, onCreateGroup }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState({ name: '', email: '' });

  const handleAddUser = () => {
    if (userInput.name.trim() && userInput.email.trim()) {
      const newUser: User = {
        id: Date.now().toString(),
        name: userInput.name.trim(),
        email: userInput.email.trim()
      };
      setUsers(prev => [...prev, newUser]);
      setUserInput({ name: '', email: '' });
    }
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleSubmit = () => {
    if (groupName.trim() && users.length > 0) {
      onCreateGroup({ name: groupName.trim(), users });
      setGroupName('');
      setUsers([]);
      setUserInput({ name: '', email: '' });
    }
  };

  const handleClose = () => {
    setGroupName('');
    setUsers([]);
    setUserInput({ name: '', email: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Create New Group
          </DialogTitle>
          <p className="text-gray-600">Start splitting expenses with your friends</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="groupName" className="text-sm font-semibold text-gray-700">
              Group Name
            </Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Weekend Trip, Office Lunch, Goa Adventure"
              className="w-full h-12 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700 flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Members
            </Label>
            
            <div className="grid grid-cols-1 gap-3">
              <Input
                value={userInput.name}
                onChange={(e) => setUserInput(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Friend's name"
                className="h-11 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg"
              />
              <div className="flex space-x-2">
                <Input
                  value={userInput.email}
                  onChange={(e) => setUserInput(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="friend@example.com"
                  className="flex-1 h-11 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg"
                />
                <Button 
                  onClick={handleAddUser}
                  type="button"
                  disabled={!userInput.name.trim() || !userInput.email.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 rounded-lg"
                >
                  Add
                </Button>
              </div>
            </div>

            {users.length > 0 && (
              <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Group Members ({users.length})</h4>
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center text-white text-sm font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveUser(user.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex space-x-3 pt-6">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1 h-11 border-gray-200 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!groupName.trim() || users.length === 0}
            className="flex-1 h-11 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
