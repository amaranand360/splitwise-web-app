
import React from 'react';
import { Group } from '@/types';

interface GroupHeaderProps {
  group: Group;
}

const GroupHeader = ({ group }: GroupHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
      <p className="text-gray-600">{group.users.length} members</p>
    </div>
  );
};

export default GroupHeader;
