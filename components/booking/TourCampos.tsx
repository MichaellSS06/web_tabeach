"use client";
import React from 'react';
import { Compass, MapPin } from 'lucide-react';

interface TourCamposProps {
  tourNombre: string;
  zonaHotel: string;
  zonasDisponibles: string[];
  onChangeZona: (val: string) => void;
}

export default function TourCampos({ tourNombre, zonaHotel, zonasDisponibles, onChangeZona }: TourCamposProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-luxury-cream/30 p-6 border border-gray-100 rounded-sm">
      <div className="flex items-start">
        <Compass className="text-luxury-gold mr-4 mt-1 shrink-0" size={20} />
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">Tour Seleccionado</label>
          <p className="text-sm font-serif font-bold text-luxury-dark">{tourNombre}</p>
        </div>
      </div>
      <div className="relative group">
        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Zona de Hoteles / Pick-up</label>
        <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
          <MapPin size={18} className="text-luxury-gold mr-3 shrink-0" />
          <select
            value={zonaHotel}
            onChange={(e) => onChangeZona(e.target.value)}
            className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          >
            <option value="">Seleccione Zona de Pick-up...</option>
            {zonasDisponibles.map((zona) => (
              <option key={zona} value={zona}>{zona}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}