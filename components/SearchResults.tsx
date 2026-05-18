"use client";
import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { useBookingStore } from '@/store/useBookingStore';

interface SearchResultsProps {
  visible: boolean;
  filtros: { 
    origen: string; 
    destino: string; 
    pasajeros?: number | string | null; 
    fecha: string; 
  };
}

export default function SearchResults({ visible, filtros }: SearchResultsProps) {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);
  const pas = filtros.pasajeros ? Number(filtros.pasajeros) : 0;

  // Determinar la clase requerida según el volumen de pasajeros
  const claseRequerida = useMemo(() => {
    if (pas <= 0) return null;
    if (pas <= 3) return 'Auto';
    if (pas <= 5) return 'Avanza';
    if (pas <= 7) return 'Van';
    if (pas <= 12) return 'Sprinter';
    if (pas <= 25) return 'Minibus';
    return 'Omnibus';
  }, [pas]);

  // Filtrado inicial de rutas de la flota
  const filtrados = useMemo(() => {
    return flotaCompleta.filter(v => {
      const coincideOrigen = v.origen.toLowerCase().trim() === filtros.origen.toLowerCase().trim();
      const coincideDestino = v.destino.toLowerCase().trim() === filtros.destino.toLowerCase().trim();
      const coincideClase = claseRequerida ? v.vehiculo_clase === claseRequerida : true;

      return coincideOrigen && coincideDestino && coincideClase;
    });
  }, [flotaCompleta, filtros.origen, filtros.destino, claseRequerida]);

  return (
    <section className={`py-24 bg-luxury-cream transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Flota Disponible</h2>
          <p className="text-3xl font-serif italic text-luxury-dark">Opciones para su trayecto</p>
        </div>

        <div className="space-y-4">
          {filtrados.length > 0 ? (
            filtrados.map((item) => (
              <VehicleCard 
                key={item.id}
                item={item}
                fecha={filtros.fecha}
                pasajerosCount={pas}
              />
            ))
          ):(
            <div className="text-center py-8 text-gray-500 font-light italic">
              No se encontraron vehículos disponibles para la capacidad seleccionada.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}