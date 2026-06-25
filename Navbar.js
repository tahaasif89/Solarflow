import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-yellow-600">Solar<span className="text-gray-800">Flow</span></div>
        
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-yellow-600">Home</a>
          <a href="#" className="hover:text-yellow-600">Panels</a>
          <a href="#" className="hover:text-yellow-600">Inverters</a>
          <a href="#" className="hover:text-yellow-600">Contact</a>
        </div>

        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-yellow-600">Login</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Get Quote</button>
        </div>
      </div>
    </nav>
  );
}