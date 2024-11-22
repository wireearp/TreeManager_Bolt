import React from 'react';
import { Trees, Map, Calendar, Settings, PieChart, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-screen w-20 bg-emerald-800 text-white flex flex-col items-center py-8 fixed left-0 top-0">
      <Link to="/" className="mb-12">
        <Trees size={32} className="text-emerald-300" />
      </Link>
      
      <nav className="flex flex-col gap-8">
        <Link 
          to="/map"
          className={`p-3 hover:bg-emerald-700 rounded-lg transition-colors ${
            location.pathname === '/map' ? 'bg-emerald-700' : ''
          }`}
        >
          <Map size={24} />
        </Link>
        <button className="p-3 hover:bg-emerald-700 rounded-lg transition-colors">
          <Search size={24} />
        </button>
        <button className="p-3 hover:bg-emerald-700 rounded-lg transition-colors">
          <Calendar size={24} />
        </button>
        <button className="p-3 hover:bg-emerald-700 rounded-lg transition-colors">
          <PieChart size={24} />
        </button>
        <button className="p-3 hover:bg-emerald-700 rounded-lg transition-colors mt-auto">
          <Settings size={24} />
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;