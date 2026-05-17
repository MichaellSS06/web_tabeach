"use client";
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useBookingStore } from '@/store/useBookingStore';

// Diccionario estático de imágenes asignadas por clase de vehículo
const IMAGENES_POR_CLASE: Record<string, string> = {
  "Auto": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Avanza": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
  "Van": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Sprinter": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
  "Minibus": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
  "Omnibus": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
};

// Mapeo estético de nombres comerciales según tus categorías reales
const NOMBRES_COMERCIALES: Record<string, string> = {
  "Auto": "Mercedes-Benz S-Class",
  "Avanza": "Toyota Avanza Premium",
  "Van": "Toyota Hiace VIP",
  "Sprinter": "Mercedes-Benz Sprinter",
  "Minibus": "Executive Minibus",
  "Omnibus": "Luxury Coach Bus"
};

export default function SearchResults({ visible, filtros }: { visible: boolean, filtros: { origen: string, destino: string, pasajeros?: number | string | null, fecha: string } }) {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);
  const pas = filtros.pasajeros ? Number(filtros.pasajeros) : 0;
  // Determinar la clase requerida solo si hay pasajeros (mayor a 0)
  const claseRequerida = pas > 0 
    ? (pas <= 3 ? 'Auto' : pas <= 5 ? 'Avanza' : pas <= 7 ? 'Van' : pas <= 12 ? 'Sprinter' : pas <= 25 ? 'Minibus' : 'Omnibus')
    : null;

  // Filtrado flexible
  const filtrados = flotaCompleta.filter(v => {
    const coincideOrigen = v.origen.toLowerCase().trim() === filtros.origen.toLowerCase().trim();
    const coincideDestino = v.destino.toLowerCase().trim() === filtros.destino.toLowerCase().trim();
    
    // Si claseRequerida es null (porque no hay pasajeros), este check da true y muestra todas las clases
    const coincideClase = claseRequerida ? v.vehiculo_clase === claseRequerida : true;

    return coincideOrigen && coincideDestino && coincideClase;
  });

  return (
    <section className={`py-24 bg-luxury-cream transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Flota Disponible</h2>
          <p className="text-3xl font-serif italic text-luxury-dark">Opciones para su trayecto</p>
        </div>

        <div className="space-y-4">
          {filtrados.length > 0 ? (
            filtrados.map((item) => {
              const imagenVehiculo = IMAGENES_POR_CLASE[item.vehiculo_clase] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800";
              const nombreComercial = NOMBRES_COMERCIALES[item.vehiculo_clase] || item.vehiculo_clase;

              return (
            <div key={item.id} className="bg-white p-5 rounded-sm flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all group">
              <div className="flex items-center gap-6 w-full">
                <img 
                      src={imagenVehiculo} 
                      alt={`${nombreComercial} - Tabeach`} 
                      className="w-24 h-16 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                <div>
                  <h4 className="font-serif italic text-xl text-luxury-dark">{nombreComercial}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{item.vehiculo_clase} • {item.origen} a {item.destino}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase">Desde</span>
                  <span className="text-2xl font-bold text-luxury-dark">${item.precio_pvt}</span>
                </div>
                <Link 
                  href={`/reservar?vehiculo=${encodeURIComponent(item.vehiculo_clase)}&origen=${encodeURIComponent(item.origen)}&destino=${encodeURIComponent(item.destino)}&fecha=${encodeURIComponent(filtros.fecha)}`}
                  className="bg-luxury-dark text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors flex items-center group whitespace-nowrap"
                >
                  Reservar 
                  <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )})):(
            <div className="text-center py-8 text-gray-500 font-light italic">
              No se encontraron vehículos disponibles para la capacidad seleccionada.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}