import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail,
  Search
} from 'lucide-react';
import HeroSection from '@/components/Hero';
import ReservarButton from '@/components/ReservarButton';

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      {/* --- NAVEGACIÓN --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-luxury-dark uppercase">
          Tabeach <span className="text-luxury-gold">.</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <a href="/destinos" className="hover:text-luxury-gold transition">Tours</a>
          <a href="/vehiculos" className="hover:text-luxury-gold transition">Vehículos</a>
          {/* <a href="#" className="hover:text-luxury-gold transition">Servicios</a> */}
          <a href="/nosotros" className="hover:text-luxury-gold transition">Nosotros</a>
        </div>

        <ReservarButton />
      </nav>

      {/* --- SECCIÓN HERO --- */}
      <HeroSection />

      {/* --- SERVICIOS (Grid Estético) --- */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">Nuestra Flota</h2>
            <p className="text-4xl md:text-5xl font-serif italic text-luxury-dark">Elige tu experiencia</p>
          </div>
          <button className="mt-6 md:mt-0 text-[11px] font-bold uppercase tracking-widest border-b-2 border-luxury-gold pb-1">
            Ver todos los vehículos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { id: '01', name: 'Chofer Privado', desc: 'Servicio premium de punto a punto.', enlace: "/vehiculos", img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800' },
            { id: '02', name: 'Tours Guiados', desc: 'Conoce la historia local con expertos.', enlace: "/destinos", img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800' },
            { id: '03', name: 'Vans Ejecutivas', desc: 'Confort absoluto para grupos VIP.', enlace: "/vehiculos", img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800' }
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 shadow-xl">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 text-xs font-bold">
                  {item.id}
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
              <a 
                href={item.enlace} 
                className="inline-flex items-center text-luxury-gold text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform w-fit"
              >
                Explorar 
                <ChevronRight size={14} className="ml-1 shrink-0" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-luxury-dark text-white py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold mb-6 tracking-tighter uppercase">Tabeach <span className="text-luxury-gold">.</span></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Llevamos el transporte turístico a un nuevo nivel de sofisticación y confort.
            </p>
            <div className="flex space-x-5">
              <Instagram size={18} className="hover:text-luxury-gold cursor-pointer transition" />
              <Facebook size={18} className="hover:text-luxury-gold cursor-pointer transition" />
              <Twitter size={18} className="hover:text-luxury-gold cursor-pointer transition" />
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-luxury-gold">Servicios</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition cursor-pointer">Traslados Aeropuerto</li>
              <li className="hover:text-white transition cursor-pointer">Eventos Corporativos</li>
              <li className="hover:text-white transition cursor-pointer">Tours Nocturnos</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-luxury-gold">¿Consultas a la medida?</h4>
            <p className="text-gray-400 text-xs font-light mb-4 leading-relaxed">
              Escríbenos de forma directa para coordinar traslados privados especiales.
            </p>
            <a 
              href="mailto:informes@tabeach.com?subject=Consulta%20Servicio%20Premium%20Tabeach"
              className="flex items-center justify-between border-b border-gray-700 pb-2 group hover:border-luxury-gold transition-colors"
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-light">
                informes@tabeach.com
              </span>
              <Mail size={16} className="text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-[10px] text-gray-500 uppercase tracking-widest">
          © 2026 Tabeach Transportes. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}