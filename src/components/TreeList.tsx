import React from 'react';
import { Leaf, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const trees = [
  {
    id: 1,
    species: 'Norway Maple',
    location: '40.7128° N, 74.0060° W',
    health: 'Good',
    lastInspection: new Date(2024, 1, 15),
    dbh: 24, // diameter at breast height
    height: 45,
  },
  {
    id: 2,
    species: 'Red Oak',
    location: '40.7129° N, 74.0061° W',
    health: 'Needs Attention',
    lastInspection: new Date(2024, 1, 10),
    dbh: 36,
    height: 60,
  },
  {
    id: 3,
    species: 'American Elm',
    location: '40.7130° N, 74.0062° W',
    health: 'Good',
    lastInspection: new Date(2024, 1, 5),
    dbh: 30,
    height: 55,
  },
];

const TreeList = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Tree Inventory</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Leaf size={18} />
          Add Tree
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600">Species</th>
              <th className="text-left py-3 px-4 text-gray-600">Location</th>
              <th className="text-left py-3 px-4 text-gray-600">Health</th>
              <th className="text-left py-3 px-4 text-gray-600">Last Inspection</th>
              <th className="text-left py-3 px-4 text-gray-600">DBH (in)</th>
              <th className="text-left py-3 px-4 text-gray-600">Height (ft)</th>
            </tr>
          </thead>
          <tbody>
            {trees.map((tree) => (
              <tr key={tree.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{tree.species}</td>
                <td className="py-3 px-4">{tree.location}</td>
                <td className="py-3 px-4">
                  <span className={`flex items-center gap-2 ${
                    tree.health === 'Good' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {tree.health === 'Good' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {tree.health}
                  </span>
                </td>
                <td className="py-3 px-4">{format(tree.lastInspection, 'MMM d, yyyy')}</td>
                <td className="py-3 px-4">{tree.dbh}</td>
                <td className="py-3 px-4">{tree.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreeList;