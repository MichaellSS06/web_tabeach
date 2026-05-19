import Image from 'next/image';
import DestinosList from '@/components/DestinosList';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-luxury-cream">
      {/* --- BOTÓN PARA VOLVER AL ORIGEN (Flotante Minimalista) --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-white hover:text-luxury-dark hover:border-transparent transition-all duration-500 group shadow-lg"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>

      {/* Hero de Destinos */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073" 
            className="w-full h-full object-cover brightness-50"
            alt="Destinos Turísticos Exclusivos Tabeach"
            fill
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Rutas Exclusivas</h1>
          <p className="text-xs uppercase tracking-[0.5em] font-bold text-luxury-gold">
            Explora el confort sin límites
          </p>
        </div>
      </section>

      {/* Listado Interactivo */}
      <DestinosList />
    </main>
  );
}