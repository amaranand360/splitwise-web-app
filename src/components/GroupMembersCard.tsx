
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { User } from '@/types';

interface GroupMembersCardProps {
  users: User[];
}

const GroupMembersCard = ({ users }: GroupMembersCardProps) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Members ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-lg font-medium shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupMembersCard;
