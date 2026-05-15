"use client";
import React from 'react';
import { MapPin, Navigation, Clock, Calendar, ChevronRight } from 'lucide-react';

const DESTINOS = [
  {
    id: 1,
    title: "Costa del Sol Premium",
    origen: "Aeropuerto de Málaga (AGP)",
    destino: "Marbella Center",
    distancia: "52 km",
    tiempo: "45 min",
    img: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2070"
  },
  {
    id: 2,
    title: "Ruta de los Pueblos Blancos",
    origen: "Sevilla Centro",
    destino: "Ronda",
    distancia: "128 km",
    tiempo: "1h 40 min",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070"
  },
  {
    id: 3,
    title: "Transfer Alpino Luxury",
    origen: "Granada",
    destino: "Sierra Nevada",
    distancia: "36 km",
    tiempo: "50 min",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075"
  }
];

export default function DestinosList() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {DESTINOS.map((ruta) => (
          <div key={ruta.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
            
            {/* Imagen con Overlay de Distancia */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={ruta.img} 
                alt={ruta.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-luxury-dark/80 backdrop-blur-md text-luxury-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {ruta.distancia}
              </div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-serif italic text-luxury-dark mb-6">{ruta.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-luxury-gold mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter leading-none mb-1">Origen</p>
                    <p className="text-sm text-luxury-dark font-medium">{ruta.origen}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation size={16} className="text-luxury-gold mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter leading-none mb-1">Destino Final</p>
                    <p className="text-sm text-luxury-dark font-medium">{ruta.destino}</p>
                  </div>
                </div>
              </div>

              {/* Info Técnica de Viaje */}
              <div className="flex items-center justify-between py-4 border-y border-gray-50 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-500">{ruta.tiempo} est.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-[10px] font-bold uppercase text-luxury-gold">Bajo Solicitud</span>
                </div>
              </div>

              {/* Botón de Acción */}
              <a 
                href={`/reservar?origen=${encodeURIComponent(ruta.origen)}&destino=${encodeURIComponent(ruta.destino)}`}
                className="w-full bg-luxury-dark text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center group hover:bg-luxury-gold transition-colors"
              >
                Reservar Ruta
                <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}