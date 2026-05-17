import React from 'react';
import { 
  Users, 
  Briefcase, 
  Wind, 
  Coffee, 
  Wifi, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    type: "Auto de Lujo",
    param: "auto",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070",
    passengers: 3,
    luggage: 2,
    features: ["Chofer privado", "Asientos de cuero", "Climatización bizona", "Agua embotellada"]
  },
  {
    id: 2,
    name: "Mercedes-Benz Sprinter",
    type: "Avanza de Lujo",
    param: "avanza",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
    passengers: 8,
    luggage: 10,
    features: ["Wifi Premium", "Punto de carga USB", "Cristales tintados", "Espacio para esquís/golf"]
  },
  {
    id: 3,
    name: "Tesla Model X",
    type: "Van de Lujo",
    param: "van",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
    passengers: 4,
    luggage: 3,
    features: ["Silencio absoluto", "Techo panorámico", "Piloto automático", "Cero emisiones"]
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class",
    type: "Sprinter de Lujo",
    param: "sprinter",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070",
    passengers: 3,
    luggage: 2,
    features: ["Chofer privado", "Asientos de cuero", "Climatización bizona", "Agua embotellada"]
  },
  {
    id: 5,
    name: "Mercedes-Benz Sprinter",
    type: "Custer de Lujo",
    param: "custer",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
    passengers: 8,
    luggage: 10,
    features: ["Wifi Premium", "Punto de carga USB", "Cristales tintados", "Espacio para esquís/golf"]
  },
  {
    id: 6,
    name: "Tesla Model X",
    type: "Minibus de Lujo",
    param: "minibus",
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070",
    passengers: 4,
    luggage: 3,
    features: ["Silencio absoluto", "Techo panorámico", "Piloto automático", "Cero emisiones"]
  },
  {
    id: 7,
    name: "Mercedes-Benz Sprinter",
    type: "Omnibus de Lujo",
    param: "omnibus",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
    passengers: 8,
    luggage: 10,
    features: ["Wifi Premium", "Punto de carga USB", "Cristales tintados", "Espacio para esquís/golf"]
  }
];

export default function VehiculosPage() {
  return (
    <div className="min-h-screen bg-luxury-cream font-sans">
      
      {/* --- HERO DE LA SECCIÓN --- */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070" 
            className="w-full h-full object-cover brightness-[0.5]"
            alt="Flota de lujo"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif italic mb-4">Nuestra Flota Curada</h1>
          <p className="text-sm uppercase tracking-[0.4em] font-bold text-luxury-gold">
            Excelencia en cada kilómetro
          </p>
        </div>
      </section>

      {/* --- LISTADO DE VEHÍCULOS --- */}
      <section className="max-w-6xl mx-auto py-24 px-6 space-y-24">
        {vehicles.map((car, index) => (
          <div 
            key={car.id} 
            className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Imagen a la Izquierda (con efecto hover) */}
            <div className="w-full md:w-1/2 overflow-hidden shadow-2xl rounded-sm group">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Características a la Derecha */}
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <span className="text-luxury-gold font-bold text-xs uppercase tracking-widest">{car.type}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-luxury-dark mt-2">{car.name}</h2>
              </div>

              {/* Iconos Rápidos */}
              <div className="flex gap-6 border-y border-gray-200 py-6">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-luxury-gold" />
                  <span className="text-xs font-medium">{car.passengers} Pasajeros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-luxury-gold" />
                  <span className="text-xs font-medium">{car.luggage} Maletas</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-luxury-gold" />
                  <span className="text-xs font-medium">Seguro VIP</span>
                </div>
              </div>

              {/* Lista de Features detallada */}
              <div className="grid grid-cols-2 gap-4">
                {car.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full mr-3" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Precio y Botón */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                    <span className="text-xs text-gray-400 block uppercase tracking-tighter">Disponibilidad</span>
                    <span className="text-xl font-medium text-luxury-dark italic">Bajo solicitud</span>
                </div>
                
                <a 
                    href={`/reservar?vehiculo=${encodeURIComponent(car.param)}`}
                    className="bg-luxury-dark text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors flex items-center group"
                >
                    Cotizar Viaje
                    <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- SECCIÓN DE SERVICIOS INCLUIDOS (Iconos del Wireframe) --- */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: <Wifi />, label: "Wifi High-Speed" },
            { icon: <Coffee />, label: "Bebidas de Cortesía" },
            { icon: <Wind />, label: "Control de Clima" },
            { icon: <ShieldCheck />, label: "Seguridad 24/7" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 flex items-center justify-center text-luxury-gold border border-luxury-gold/20 rounded-full mb-4 group-hover:bg-luxury-gold group-hover:text-white transition-all">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-dark">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}