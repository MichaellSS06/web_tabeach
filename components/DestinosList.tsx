"use client";
import React,{ useEffect, useMemo, useState }from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/store/useBookingStore';
import Link from 'next/link';
import { MapPin, Clock, Users, Car, ChevronRight, FileText } from 'lucide-react';

// Tarifario y descripciones oficiales de los 4 Tours de Tabeach
// const TOURS = [
//   {
//     id: 1,
//     title: "Tour Manglares de Tumbes Premium",
//     precioPorPasajero: 45,
//     duracion: "4h 30 min",
//     descripcion: "Navegue en botes privados por los majestuosos canales de manglares. Conozca la Isla de los Pájaros, el criadero de cocodrilos americanos y disfrute de una recolección demostrativa de conchas negras en un entorno natural único protegido.",
//     img: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2070"
//   },
//   {
//     id: 2,
//     title: "Avistamiento de Ballenas Órganos Luxury",
//     precioPorPasajero: 65,
//     duracion: "3h 15 min",
//     descripcion: "Una expedición marina exclusiva guiada por biólogos. Zarpe desde el muelle de Los Órganos para presenciar los espectaculares saltos de las ballenas jorobadas, escuche sus cantos bajo el agua con hidrófonos y nade con tortugas verdes.",
//     img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070"
//   },
//   {
//     id: 3,
//     title: "Full Day Máncora & Playas del Norte",
//     precioPorPasajero: 35,
//     duracion: "3h 15 min",
//     descripcion: "Recorrido privado de lujo por el circuito playero más cotizado. Desde las tranquilas aguas de Pocitas y Vichayito, hasta el vibrante centro de Máncora. Incluye paradas gastronómicas secretas y acceso a clubes de playa exclusivos.",
//     img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075"
//   },
//   {
//     id: 4,
//     title: "Sunset Ancestral en Amotape & Desierto",
//     precioPorPasajero: 50,
//     duracion: "5h 00 min",
//     descripcion: "Adéntrese en los senderos del Parque Nacional Cerros de Amotape. Descubra el bosque seco ecuatorial único en el mundo y termine la tarde con un brindis de champagne premium y un catering privado observando el atardecer sobre las dunas del desierto.",
//     img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
//   }
// ];

const IMAGENES_TOURS: Record<string, string> = {
  "Tour de Manglares": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=2070",
  "Tour de Pesca y Nado con Tortugas": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070",
  "Tour Nado Con Tortugas Marinas": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075",
  "Tour Avistamiento de Ballenas": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
};

export default function DestinosList() {
  const { tours, tarifasMovilidad, fetchToursAndTarifas } = useBookingStore();
  
  const [pasajeros, setPasajeros] = useState<{ [key: number|string]: number }>({});
  const [zonasHoteles, setZonasHoteles] = useState<{ [key: number|string]: string }>({});

  useEffect(() => {
    fetchToursAndTarifas();
  }, [fetchToursAndTarifas]);

  // Desplegable de zonas únicas extraídas de la tabla de tarifas
  // const zonasDisponibles = useMemo(() => {
  //   return Array.from(new Set(tarifasMovilidad.map(t => t.zona_hoteles))).sort();
  // }, [tarifasMovilidad]);

  const handlePasajerosChange = (id: number|string, val: number) => {
    setPasajeros(prev => ({ ...prev, [id]: Math.min(40, Math.max(1, val)) }));
  };

  const handleZonaChange = (id: number|string, val: string) => {
    setZonasHoteles(prev => ({ ...prev, [id]: val }));
  };

  const obtenerVehiculo = (numPasajeros: number): string => {
    if (numPasajeros <= 3) return 'Auto';
    if (numPasajeros <= 6) return 'Van';
    if (numPasajeros <= 12) return 'Sprinter';
    if (numPasajeros <= 25) return 'Minibus';
    return 'Bus';
  };

  // Estado de carga elegante (Skeleton o mensaje) mientras Supabase responde
  if (tours.length === 0) {
    return (
      <div className="text-center py-32 bg-luxury-cream">
        <div className="animate-pulse font-serif italic text-luxury-dark text-lg">
          Cargando experiencias exclusivas Tabeach...
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 font-sans">
      {/* Contenedor en flex-col con espacio vertical amplio entre tarjetas */}
      <div className="flex flex-col gap-12">
        {tours.map((tour) => {
          const numPasajeros = pasajeros[tour.id] || 1;
          const zonaHotel = zonasHoteles[tour.id] || "";
          const vehiculoAsignado = obtenerVehiculo(numPasajeros);
          
          // 1. 🔥 FILTRAR las zonas disponibles EXCLUSIVAMENTE para este tour_id
          const zonasDisponiblesParaEsteTour = Array.from(
            new Set(
              tarifasMovilidad
                .filter(t => String(t.id) === String(tour.id)) // Filtro estricto por ID de Tour
                .map(t => t.zona_hoteles)
            )
          ).sort();

          // 2. 🔥 BUSCAR la tarifa haciendo match con zona, vehículo Y el tour_id
          const tarifaMovilidadMatch = tarifasMovilidad.find(
            t => String(t.id) === String(tour.id) && 
                 t.zona_hoteles === zonaHotel && 
                 t.vehiculo_clase === vehiculoAsignado
          );
          
          const precioMovilidad = tarifaMovilidadMatch ? tarifaMovilidadMatch.precio_movilidad_rt : 0;
          const costoTotal = (tour.precio_por_pasajero * numPasajeros) + precioMovilidad;
          const imgUrl = IMAGENES_TOURS[tour.nombre] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073";

          const hrefReserva = `/reservar?tour=${encodeURIComponent(tour.nombre)}&vehiculo=${vehiculoAsignado}&zonaHotel=${encodeURIComponent(zonaHotel)}&pasajeros=${numPasajeros}&precio_movilidad=${precioMovilidad}&total=${costoTotal}`;

          return (
            <div 
              key={tour.id} 
              className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 grid grid-cols-1 lg:grid-cols-3 w-full"
            >
              
              {/* Columna 1: Imagen del Tour con Altura Controlada Estricta */}
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

              {/* Columna 2: Título, Descripción Extensa e Información Técnica */}
              <div className="p-8 lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100">
                <div>
                  <span className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase block mb-2">Experiencia Tabeach</span>
                  <h3 className="text-xl font-serif italic text-luxury-dark mb-4">{tour.nombre}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light mb-6 min-h-[64px] lg:line-clamp-3" title="Descripcion">
                    {"Disfrute de un itinerario personalizado con atención al detalle y chofer privado a su completa disposición."}
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

              {/* Columna 3: Controles de Formulario, Cálculo de Precio y Botón CTA */}
              <div className="p-8 bg-gray-50/30 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Selector de Zona de Hoteles */}
                  <div className="relative group/input">
                    <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest block mb-1.5">Zona de Hoteles / Pick-up</label>
                    <div className="flex items-center border-b border-gray-200 group-focus-within/input:border-luxury-gold pb-2 transition-all">
                      <MapPin size={14} className="text-luxury-gold mr-2 shrink-0" />
                      <select
                        value={zonaHotel}
                        onChange={(e) => handleZonaChange(tour.id, e.target.value)}
                        className="bg-transparent outline-none w-full text-xs text-luxury-dark font-medium cursor-pointer"
                      >
                        <option value="">Seleccione Zona de Pick-up...</option>
                        {/* 🔥 Renderizamos únicamente las zonas filtradas de este tour */}
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
                        onClick={() => handlePasajerosChange(tour.id, numPasajeros - 1)}
                        className="px-2.5 py-1 text-xs font-bold text-gray-500 hover:bg-luxury-dark hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-luxury-dark w-6 text-center">{numPasajeros}</span>
                      <button 
                        type="button"
                        onClick={() => handlePasajerosChange(tour.id, numPasajeros + 1)}
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
                    href={zonaHotel && precioMovilidad > 0 ? hrefReserva : '#'}
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
                      zonaHotel && precioMovilidad > 0
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
        })}
      </div>
    </section>
  );
}