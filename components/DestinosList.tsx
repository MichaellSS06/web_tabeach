"use client";
import React,{ useEffect, useState }from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import TourCard from './TourCard';

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

export default function DestinosList() {
  const { tours, fetchToursAndTarifas } = useBookingStore();
  
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
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            numPasajeros={pasajeros[tour.id] || 1}
            zonaHotel={zonasHoteles[tour.id] || ""}
            onPasajerosChange={handlePasajerosChange}
            onZonaChange={handleZonaChange}
          />
        ))}
      </div>
    </section>
  );
}