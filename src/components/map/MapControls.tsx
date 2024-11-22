import React from 'react';
import { ArrowLeft, Plus, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapControlsProps {
  onAddTree: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onAddTree }) => (
  <>
    <Link
      to="/"
      className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 flex items-center gap-2"
    >
      <ArrowLeft size={20} />
      Back to Dashboard
    </Link>

    <button 
      className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700 flex items-center gap-2"
      onClick={onAddTree}
    >
      <Plus size={20} />
      <TreePine size={20} />
      Add Tree
    </button>
  </>
);

export default MapControls;