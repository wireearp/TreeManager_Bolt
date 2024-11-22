import React from 'react';
import { TreePine, Ruler, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, change }: {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-lg">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-emerald-100 rounded-lg">
        <Icon size={24} className="text-emerald-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {change && (
          <p className="text-sm text-emerald-600">+{change} this month</p>
        )}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={TreePine}
          label="Total Trees"
          value="1,234"
          change="12"
        />
        <StatCard
          icon={Ruler}
          label="Average DBH"
          value="24 in"
        />
        <StatCard
          icon={CalendarIcon}
          label="Inspections Due"
          value="28"
        />
        <StatCard
          icon={AlertTriangle}
          label="Health Concerns"
          value="15"
        />
      </div>
    </div>
  );
};

export default Dashboard;