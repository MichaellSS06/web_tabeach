import Image from 'next/image';
import DestinosList from '@/components/DestinosList';

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-luxury-cream">
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