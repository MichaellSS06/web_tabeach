"use client";
import React from 'react';
import { ChevronRight } from 'lucide-react';

const VEHICULOS = [
  { id: 1, name: "Mercedes-Benz S-Class", type: "Sedán", capacity: "1-3", price: 85, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070" },
  { id: 2, name: "Mercedes-Benz Sprinter", type: "Van", capacity: "4-7", price: 150, img: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070" },
];

export default function SearchResults({ visible, filtros }: { visible: boolean, filtros: { origen: string, destino: string, pasajeros: string } }) {
  // Filtrar localmente
  const filtrados = VEHICULOS.filter(v => v.capacity === filtros.pasajeros.split(' ')[0]);

  return (
    <section className={`py-24 bg-luxury-cream transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Flota Disponible</h2>
          <p className="text-3xl font-serif italic text-luxury-dark">Opciones para su trayecto</p>
        </div>

        <div className="space-y-4">
          {filtrados.map((auto) => (
            <div key={auto.id} className="bg-white p-5 rounded-sm flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all group">
              <div className="flex items-center gap-6 w-full">
                <img src={auto.img} alt={auto.name} className="w-24 h-16 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h4 className="font-serif italic text-xl text-luxury-dark">{auto.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{auto.type} • {auto.capacity} Plazas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase">Desde</span>
                  <span className="text-2xl font-bold text-luxury-dark">${auto.price}</span>
                </div>
                <a 
                  href={`/reservar?vehiculo=${encodeURIComponent(auto.name)}&origen=${encodeURIComponent(filtros.origen)}&destino=${encodeURIComponent(filtros.destino)}`}
                  className="bg-luxury-dark text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors flex items-center group"
                >
                  Reservar <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}