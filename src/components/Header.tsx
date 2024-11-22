import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 right-0 left-20 z-10">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">ArborPro Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">John Smith</p>
            <p className="text-xs text-gray-500">Arborist</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;