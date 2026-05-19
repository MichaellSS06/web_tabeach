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
  vueltaOrigen?: string | null;
  vueltaDestino?: string | null;
  fechaVuelta?: string | null;
  vueltaClase?: string | null;     // 👈 Recibe la clase asimétrica de la vuelta
  vueltaPasajeros?: number | null; // 👈 Recibe el conteo real de pasajeros de la vuelta
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

export default function VehicleCard({ item, fecha, pasajerosCount, vueltaOrigen, vueltaDestino, fechaVuelta, vueltaClase, vueltaPasajeros }: VehicleCardProps) {
  // 🔥 REUSABILIDAD: Obtenemos el precio pvt consumiendo el Hook reutilizable
  const { precioPvt } = useVehiclePricing({
    origen: item.origen,
    destino: item.destino,
    vehiculoClase: item.vehiculo_clase,
    vueltaOrigen,
    vueltaDestino,
    vueltaClase
  });

  const imagenVehiculo = IMAGENES_POR_CLASE[item.vehiculo_clase] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800";
  const nombreIda = NOMBRES_COMERCIALES[item.vehiculo_clase] || item.vehiculo_clase;
  const nombreVuelta = vueltaClase ? (NOMBRES_COMERCIALES[vueltaClase] || vueltaClase) : '';

  // Construcción de la URL de reserva enriquecida con datos asimétricos
  const urlReserva = React.useMemo(() => {
    let baseUrl = `/reservar?vehiculoIda=${encodeURIComponent(item.vehiculo_clase)}&origenIda=${encodeURIComponent(item.origen)}&destinoIda=${encodeURIComponent(item.destino)}&fechaIda=${encodeURIComponent(fecha)}&pasajerosIda=${pasajerosCount}`;
    
    if (vueltaOrigen && vueltaDestino && fechaVuelta && vueltaClase && vueltaPasajeros) {
      baseUrl += `&vueltaActiva=true&vehiculoVuelta=${encodeURIComponent(vueltaClase)}&origenVuelta=${encodeURIComponent(vueltaOrigen)}&destinoVuelta=${encodeURIComponent(vueltaDestino)}&fechaVuelta=${encodeURIComponent(fechaVuelta)}&pasajerosVuelta=${vueltaPasajeros}`;
    }
    return baseUrl;
  }, [item, fecha, pasajerosCount, vueltaOrigen, vueltaDestino, fechaVuelta, vueltaClase, vueltaPasajeros]);
  console.log(vueltaOrigen, vueltaDestino, fechaVuelta, vueltaClase, vueltaPasajeros)
  return (
    <div className="bg-white p-5 rounded-sm flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all group">
      <div className="flex items-center gap-6 w-full">
        <img 
          src={imagenVehiculo} 
          alt={`${nombreIda} - Tabeach`} 
          className="w-24 h-16 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
        <div>
          {/* Título dinámico que indica si es un servicio de vehículos combinados */}
          <h4 className="font-serif italic text-xl text-luxury-dark">
            {vueltaClase && vueltaClase !== item.vehiculo_clase 
              ? `${nombreIda} + ${nombreVuelta}` 
              : nombreIda}
          </h4>
          
          <div className="text-[10px] uppercase tracking-widest text-gray-400 space-y-1 mt-1">
            <div>
              <span className="text-luxury-gold font-bold">Ida ({pasajerosCount} Pax): {item.origen} a {item.destino} ({item.vehiculo_clase}) </span>
            </div>
            {vueltaOrigen && vueltaDestino && vueltaClase && (
              <div className="text-luxury-gold font-bold">
                Vuelta ({vueltaPasajeros} Pax): {vueltaOrigen} a {vueltaDestino} ({vueltaClase})
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between">
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block uppercase">
            {vueltaOrigen ? 'Desde' : 'Desde'}
          </span>
          <span className="text-2xl font-bold text-luxury-dark">
            {precioPvt > 0 ? `$${precioPvt}` : <span className="text-sm font-sans font-light text-gray-300">No disponible</span>}
          </span>
        </div>
        <Link 
          href={urlReserva}
          className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center group whitespace-nowrap ${
            precioPvt > 0 
              ? "bg-luxury-dark text-white hover:bg-luxury-gold cursor-pointer" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Reservar
          <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}