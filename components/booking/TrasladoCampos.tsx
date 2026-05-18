"use client";
import React from 'react';
import { MapPin } from 'lucide-react';

interface TrasladoCamposProps {
  origen: string;
  destino: string;
  origenesUnicos: string[];
  destinosUnicos: string[];
  onChangeOrigen: (val: string) => void;
  onChangeDestino: (val: string) => void;
}

export default function TrasladoCampos({
  origen,
  destino,
  origenesUnicos,
  destinosUnicos,
  onChangeOrigen,
  onChangeDestino
}: TrasladoCamposProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative group">
        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Origen</label>
        <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
          <MapPin size={18} className="text-luxury-gold mr-3 shrink-0" />
          <select
            value={origen}
            onChange={(e) => onChangeOrigen(e.target.value)}
            className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          >
            <option value="">¿Dónde le recogemos?</option>
            {origenesUnicos.map((orig) => (
              <option key={orig} value={orig}>{orig}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative group">
        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Destino</label>
        <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
          <MapPin size={18} className="text-luxury-gold mr-3 shrink-0" />
          <select
            value={destino}
            onChange={(e) => onChangeDestino(e.target.value)}
            className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          >
            <option value="">¿A dónde desea ir?</option>
            {destinosUnicos.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}