"use client";
import React from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

interface FiltersProps {
  onSearch: (filtros: { origen: string, destino: string, pasajeros: string }) => void;
}

export default function SearchFilters({ onSearch }: FiltersProps) {
  const [data, setData] = React.useState({
    origen: '',
    destino: '',
    pasajeros: '1-3 Pasajeros'
  });

  return (
    <div className="bg-white p-2 rounded-xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center text-luxury-dark mt-12 w-full max-w-5xl">
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full">
        <MapPin className="text-luxury-gold mr-3" size={18} />
        <input 
          type="text" 
          placeholder="Origen" 
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => setData({...data, origen: e.target.value})}
        />
      </div>
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full">
        <MapPin className="text-luxury-gold mr-3" size={18} />
        <input 
          type="text" 
          placeholder="Destino" 
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => setData({...data, destino: e.target.value})}
        />
      </div>
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full">
        <Calendar className="text-luxury-gold mr-3" size={18} />
        <input type="date" className="bg-transparent outline-none w-full text-sm [color-scheme:light]" />
      </div>
      <div className="flex items-center px-6 py-3 w-full">
        <Users className="text-luxury-gold mr-3" size={18} />
        <select 
          className="bg-transparent outline-none w-full text-sm text-gray-500 cursor-pointer"
          onChange={(e) => setData({...data, pasajeros: e.target.value})}
        >
          <option>1-3 Pasajeros</option>
          <option>4-7 Pasajeros</option>
        </select>
      </div>
      <button 
        onClick={() => onSearch(data)}
        className="bg-luxury-gold text-white p-4 rounded-full hover:bg-luxury-dark transition-all duration-300 active:scale-95 shadow-lg"
      >
        <Search size={20} />
      </button>
    </div>
  );
}