"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useVehiclePricing } from '@/hooks/useVehiclePricing';

interface VehicleCardProps {
  item: {
    id: number | string;
    vehiculo_clase: string;
    origen: string;
    destino: string;
  };
  fecha: string;
  pasajerosCount: number;
}

const IMAGENES_POR_CLASE: Record<string, string> = {
  "Auto": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Avanza": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
  "Van": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Sprinter": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
  "Minibus": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Omnibus": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
};

const NOMBRES_COMERCIALES: Record<string, string> = {
  "Auto": "Mercedes-Benz S-Class",
  "Avanza": "Toyota Avanza Premium",
  "Van": "Toyota Hiace VIP",
  "Sprinter": "Mercedes-Benz Sprinter",
  "Minibus": "Executive Minibus",
  "Omnibus": "Luxury Coach Bus"
};

export default function VehicleCard({ item, fecha, pasajerosCount }: VehicleCardProps) {
  // 🔥 REUSABILIDAD: Obtenemos el precio pvt consumiendo el Hook reutilizable
  const { precioPvt } = useVehiclePricing({
    origen: item.origen,
    destino: item.destino,
    vehiculoClase: item.vehiculo_clase
  });

  const imagenVehiculo = IMAGENES_POR_CLASE[item.vehiculo_clase] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800";
  const nombreComercial = NOMBRES_COMERCIALES[item.vehiculo_clase] || item.vehiculo_clase;

  return (
    <div className="bg-white p-5 rounded-sm flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all group">
      <div className="flex items-center gap-6 w-full">
        <img 
          src={imagenVehiculo} 
          alt={`${nombreComercial} - Tabeach`} 
          className="w-24 h-16 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
        <div>
          <h4 className="font-serif italic text-xl text-luxury-dark">{nombreComercial}</h4>
          <p className="text-[10px] uppercase tracking-widest text-gray-400">
            {item.vehiculo_clase} • {item.origen} a {item.destino}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between">
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block uppercase">Desde</span>
          <span className="text-2xl font-bold text-luxury-dark">${precioPvt}</span>
        </div>
        <Link 
          href={`/reservar?vehiculo=${encodeURIComponent(item.vehiculo_clase)}&origen=${encodeURIComponent(item.origen)}&destino=${encodeURIComponent(item.destino)}&fecha=${encodeURIComponent(fecha)}&pasajeros=${pasajerosCount}`}
          className="bg-luxury-dark text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors flex items-center group whitespace-nowrap"
        >
          Reservar
          <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}