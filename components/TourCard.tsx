"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users, Car, ChevronRight, FileText } from 'lucide-react';
import { useTourPricing } from '@/hooks/useTourPricing';

// Tipamos las propiedades que va a recibir del bucle padre
interface TourCardProps {
  tour: {
    id: number | string;
    nombre: string;
    precio_por_pasajero: number;
  };
  numPasajeros: number;
  zonaHotel: string;
  onPasajerosChange: (id: number | string, val: number) => void;
  onZonaChange: (id: number | string, val: string) => void;
}

const IMAGENES_TOURS: Record<string, string> = {
  "Tour de Manglares": "/tourmanglares.png",
  "Tour de Pesca y Nado con Tortugas": "/tourpesca.png",
  "Tour Nado Con Tortugas Marinas": "/tourtortugas.png",
  "Tour Avistamiento de Ballenas": "/tourballenas.png"
};

const DESCRIPCION_TOURS: Record<string, string> = {
  "Tour de Manglares": "Esta experiencia se inicia en muelle de Puerto Pizarro, paradisiaco lugar donde los turistas abordan una lancha para hacer un recorrido por los canales del manglar observando aves del lugar y visitando el Zoo criadero de Cocodrilos. Incluye: Movilidad, Paseo en Lancha, Chaleco Salvavidas, Derecho de Muelle, Snack (chifles, dulce típico de la zona y fruta), Bebidas: Agua o Gaseosa, Entradas. Recomendaciones: Traer toalla, un cambio de ropa, bloqueador solar y repelente.",
  "Tour de Pesca y Nado con Tortugas": "Esta excelente combinación de Tours se puede realizar durante todo el año, el mismo que se inicia en el Muelle de Los Órganos para abordar un Yate que los llevara a la ex Plataforma Petrolera donde podrán observar Lobos y Aves Marinas, asimismo después e ello se inicio a la pesca artesanal, experiencia que termina con la preparación de un exquisito ceviche abordo. Finalmente Llegamos al Muelle del Ñuro para disfrutar del mar y el nado con amigables Tortugas Marinas. Incluye: Traslado ida y vuelta desde los hoteles en Los Órganos / Máncora o Punta Sal, Chaleco Salvavidas, Recorrido en Deslizador de Fibra, Entradas, Snack (chifles, dulce típico de la zona y fruta), Bebidas: Agua o Gaseosa, Asistencia, Fotos y Videos. Recomendaciones: Traer toalla, un cambio de ropa y bloqueador solar.",
  "Tour Nado Con Tortugas Marinas": "Encuentro con Tortugas Marinas amigables en su propio hábitat natural, que hacen contacto con los humanos; experiencia única que empieza en el muelle del Ñuro, donde los Turistas se dotan de un Chaleco salvavidas, e instrucciones básicas para el disfrute de esta aventura. Incluye: Movilidad, Chaleco Salvavidas, Snack (chifles, dulce típico de la zona y fruta), Bebidas: Agua o Gaseosa, Entradas, Asistencia, Fotos y Videos. Recomendaciones: Traer toalla, un cambio de ropa y bloqueador solar.",
  "Tour Avistamiento de Ballenas": "Desde el 25 de Julio y durante los meses de agosto, setiembre y octubre es posible realizar el fantástico Tours de Avistamiento de Ballenas ya que estas emigran desde aguas antárticas a la costa norte del Perú para reproducirse y criar a sus ballenatos, además se pueden observar, el Delfín común, Lobos Marinos, Tortugas y Aves, lo cual dependerá de la favorable naturaleza. Duración 3:30 horas aproximadamente. Incluye: Traslado ida y vuelta desde los hoteles en Los Órganos / Máncora o Punta Sal, Chaleco Salvavidas, Recorrido en Deslizador de Fibra, Entradas, Snack (chifles, dulce típico de la zona y fruta), Bebidas: Agua o Gaseosa, Asistencia, Fotos y Videos, Recomendaciones: Traer toalla, un cambio de ropa y bloqueador solar."};

export default function TourCard({ tour, numPasajeros, zonaHotel, onPasajerosChange, onZonaChange }: TourCardProps) {
  
  // 💥 ¡AHORA SÍ! El hook se llama de manera legal en el nivel superior del componente
  const { 
    vehiculoAsignado, 
    zonasDisponiblesParaEsteTour, 
    precioMovilidad, 
    costoTotal 
  } = useTourPricing({
    tourId: tour.id,
    precioPorPasajero: tour.precio_por_pasajero,
    numPasajeros,
    zonaHotel
  });

  const imgUrl = IMAGENES_TOURS[tour.nombre] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073";
  const descripcion = DESCRIPCION_TOURS[tour.nombre] || "NA"
  const hrefReserva = `/reservar?tour=${encodeURIComponent(tour.nombre)}&vehiculo=${vehiculoAsignado}&zonaHotel=${encodeURIComponent(zonaHotel)}&pasajeros=${numPasajeros}&precio_movilidad=${precioMovilidad}`;
  const esValidoParaReserva = zonaHotel && (precioMovilidad > 0 || (precioMovilidad === 0 && zonaHotel !== ""));

  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 grid grid-cols-1 lg:grid-cols-3 w-full">
      {/* Columna 1: Imagen */}
      <div className="relative h-64 lg:h-[360px] w-full overflow-hidden shrink-0">
        <Image 
          src={imgUrl} 
          alt={`Tour Tabeach: ${tour.nombre}`} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-luxury-dark/90 backdrop-blur-md text-white px-4 py-2 rounded-sm text-center">
          <p className="text-[8px] uppercase tracking-widest text-luxury-gold font-bold">Desde</p>
          <p className="text-sm font-serif">${tour.precio_por_pasajero} <span className="text-[9px] font-sans text-gray-300">/ pasajero</span></p>
        </div>
      </div>

      {/* Columna 2: Detalles */}
      <div className="p-8 lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
        <div>
          <span className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase block mb-2">Experiencia Tabeach</span>
          <h3 className="text-xl font-serif italic text-luxury-dark mb-4">{tour.nombre}</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-light mb-6 min-h-[64px] lg:line-clamp-15">
            {descripcion}
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-xs pt-4 border-t border-gray-50 text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-luxury-gold" />
            <span className="text-[11px] font-medium text-luxury-dark">2h 00min</span>
          </div>
          <span className="text-gray-200">|</span>
          <div className="flex items-center gap-1.5">
            <FileText size={13} className="text-luxury-gold" />
            <span className="text-[11px] font-medium text-luxury-dark">Servicio Privado</span>
          </div>
        </div>
      </div>

      {/* Columna 3: Controles de Formulario */}
      <div className="p-8 bg-gray-50/30 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Selector de Zona */}
          <div className="relative group/input">
            <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block mb-1.5">Zona de Hoteles / Pick-up</label>
            <div className="flex items-center border-b border-gray-200 group-focus-within/input:border-luxury-gold pb-2 transition-all">
              <MapPin size={14} className="text-luxury-gold mr-2 shrink-0" />
              <select
                value={zonaHotel}
                onChange={(e) => onZonaChange(tour.id, e.target.value)}
                className="bg-transparent outline-none w-full text-xs text-luxury-dark font-medium cursor-pointer"
              >
                <option value="">Seleccione Zona de Pick-up...</option>
                {zonasDisponiblesParaEsteTour.map(zona => (
                  <option key={zona} value={zona}>{zona}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Selector de Pasajeros */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-luxury-gold" />
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Pasajeros (Máx. 40)</span>
            </div>
            <div className="flex items-center border border-gray-200 rounded-sm bg-white shadow-sm">
              <button 
                type="button"
                onClick={() => onPasajerosChange(tour.id, numPasajeros - 1)}
                className="px-2.5 py-1 text-xs font-bold text-gray-500 hover:bg-luxury-dark hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-luxury-dark w-6 text-center">{numPasajeros}</span>
              <button 
                type="button"
                onClick={() => onPasajerosChange(tour.id, numPasajeros + 1)}
                className="px-2.5 py-1 text-xs font-bold text-gray-500 hover:bg-luxury-dark hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Feedback del Transporte */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between bg-white p-2.5 border border-gray-100 rounded-sm shadow-sm">
              <div className="flex items-center gap-2">
                <Car size={14} className="text-luxury-gold" />
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Vehículo Sugerido</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-dark">
                Clase {vehiculoAsignado}
              </span>
            </div>
            {zonaHotel && (
              <div className="flex justify-between px-2.5 text-[10px] text-gray-400">
                <span>Tarifa de Movilidad (RT):</span>
                {precioMovilidad > 0 ? (
                  <span className="font-semibold text-gray-600">${precioMovilidad} USD</span>
                ) : (
                  <span className="font-semibold text-red-500">No disp. para {vehiculoAsignado}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bloque Final de Pago */}
        <div className="mt-6 lg:mt-0">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Neto (USD)</span>
            <span className="font-serif font-bold text-luxury-dark text-xl">
              {zonaHotel && precioMovilidad === 0 ? "N/A" : `$${costoTotal}`}
            </span>
          </div>

          <Link 
            href={esValidoParaReserva && precioMovilidad > 0 ? hrefReserva : '#'}
            onClick={(e) => {
              if (!zonaHotel) {
                e.preventDefault();
                alert("Por favor, seleccione una Zona de Hoteles antes de reservar.");
              } else if (precioMovilidad === 0) {
                e.preventDefault();
                alert(`Lo sentimos, no hay tarifas de traslado registradas para la clase ${vehiculoAsignado} en esta zona.`);
              }
            }}
            className={`w-full py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center group transition-colors ${
              esValidoParaReserva && precioMovilidad > 0
                ? "bg-luxury-dark text-white hover:bg-luxury-gold cursor-pointer" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Reservar Experiencia
            <ChevronRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}