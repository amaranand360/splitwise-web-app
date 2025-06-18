
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, DollarSign, TrendingUp, TrendingDown, Receipt } from 'lucide-react';
import GroupCard from '@/components/GroupCard';
import CreateGroupModal from '@/components/CreateGroupModal';
import { Group, User } from '@/types';
import { mockGroups } from '@/services/mockData';

const Dashboard = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentUser] = useState<User>({ id: '1', name: 'Alice Johnson', email: 'alice@example.com' });

  const handleCreateGroup = (groupData: { name: string; users: User[] }) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupData.name,
      users: [...groupData.users, currentUser],
      totalExpenses: 0,
      expenses: []
    };
    setGroups(prev => [...prev, newGroup]);
    setIsCreateModalOpen(false);
  };

  // Calculate user's financial summary
  const totalExpenses = groups.reduce((sum, group) => sum + group.totalExpenses, 0);
  const userShare = groups.reduce((sum, group) => 
    sum + (group.totalExpenses / group.users.length), 0);
  const totalOwed = 1750; // Mock calculation - would come from backend
  const totalToReceive = 980; // Mock calculation - would come from backend

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Splitwise
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {currentUser.name}!</p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Group
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Financial Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Financial Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
                <Receipt className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-2">Across {groups.length} groups</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Your Share</CardTitle>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">₹{userShare.toFixed(0)}</div>
                <p className="text-xs text-gray-500 mt-2">Your portion of expenses</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">You Owe</CardTitle>
                <TrendingDown className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">₹{totalOwed}</div>
                <p className="text-xs text-gray-500 mt-2">Pay your friends</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">You're Owed</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">₹{totalToReceive}</div>
                <p className="text-xs text-gray-500 mt-2">Get money back</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Groups Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Groups</h2>
          <div className="text-sm text-gray-500">
            {groups.length} {groups.length === 1 ? 'group' : 'groups'}
          </div>
        </div>

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No groups yet</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Create your first group to start splitting expenses with friends and family
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Group
              </Button>
            </div>
          </div>
        )}

        <CreateGroupModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onCreateGroup={handleCreateGroup}
        />
      </div>
    </div>
  );
};

export default Dashboard;
