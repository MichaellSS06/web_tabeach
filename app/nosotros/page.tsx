import Image from 'next/image';
import Link from 'next/link';
import { Shield, Clock, Compass, Award, ChevronRight, ArrowLeft } from 'lucide-react';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans">
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

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070" 
            className="w-full h-full object-cover brightness-50 animate-in fade-in duration-1000"
            alt="Experiencia premium Taxibeach - Transporte VIP en el Norte"
            fill
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block mb-3">Nuestra Esencia</span>
          <h1 className="text-5xl md:text-7xl font-serif italic">Más que un trayecto</h1>
        </div>
      </section>

      {/* --- NUESTRA HISTORIA / MANIFIESTO --- */}
      <section className="max-w-5xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold">Desde el Origen</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-dark leading-tight">
            Redefiniendo los estándares de la movilidad <span className="italic font-normal text-gray-400">Premium</span>
          </h2>
          <div className="w-16 h-[1px] bg-luxury-gold" />
        </div>
        <div className="space-y-6 text-gray-500 text-sm leading-relaxed font-light">
          <p>
            En <strong>Taxibeach (Taxi Beach Travel S.A.C.)</strong>, entendemos que el tiempo y la tranquilidad son los activos más valiosos de nuestros pasajeros. Nos hemos consolidado como el operador líder en traslados aeroportuarios y tours exclusivos en el norte peruano, elevando cada viaje a una experiencia de máximo confort sin concesiones.
          </p>
          <p>
            No nos limitamos a conectar los aeropuertos de Tumbes, Talara o Piura con los balnearios más selectos de la región. Diseñamos entornos de descanso y desconexión donde cada kilómetro hacia Máncora, Punta Sal o Zorritos se recorre bajo sus propias reglas, combinando una flota versátil de última generación con una asistencia logística impecable.
          </p>
        </div>
      </section>

      {/* --- SECCIÓN DE VALORES (GRID EDITORIAL) --- */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-2">Compromiso Inquebrantable</span>
            <h2 className="text-3xl font-serif text-luxury-dark">Los pilares de nuestro servicio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield size={24} />,
                title: "Seguridad & Confianza",
                desc: "Operamos formalmente bajo estrictos protocolos de bioseguridad, con conductores profesionales y monitoreo constante en ruta para garantizar un entorno seguro y de absoluta tranquilidad."
              },
              {
                icon: <Clock size={24} />,
                title: "Precisión Logística",
                desc: "Sincronizamos nuestros servicios con los itinerarios de llegada y salida de sus vuelos. Monitoreamos en tiempo real para anticipar cualquier cambio y asegurar una puntualidad impecable en su recepción."
              },
              {
                icon: <Compass size={24} />,
                title: "Experiencia VIP Curada",
                desc: "Ofrecemos unidades climatizadas equipadas con música instrumental, diarios, revistas y una fina atención que incluye bebidas frías variadas y snacks premium con los mejores dulces típicos y chifles de la zona."
              }
            ].map((valor, index) => (
              <div key={index} className="space-y-4 group">
                <div className="text-luxury-gold w-12 h-12 border border-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-dark group-hover:text-white transition-all duration-500">
                  {valor.icon}
                </div>
                <h3 className="text-lg font-serif italic text-luxury-dark">{valor.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN MÉRITOS / NÚMEROS --- */}
      <section className="max-w-5xl mx-auto py-24 px-6 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "100%", label: "Servicios Privados" },
            { metric: "2025-26", label: "Tarifario Oficial" },
            { metric: "24/7", label: "Coordinación de Operaciones" },
            { metric: "3", label: "Aeropuertos del Norte" }
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <span className="text-4xl md:text-5xl font-serif text-luxury-dark block">{item.metric}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION (CTA) ENFOCADO EN CONVERSIÓN --- */}
      <section className="bg-luxury-dark text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif italic">¿Listo para experimentar el verdadero confort?</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            Permítanos diseñar su próximo traslado o tour personalizado por las playas y manglares del norte bajo los más altos estándares.
          </p>
          <div className="pt-4">
            <Link 
              href="/"
              className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-luxury-dark transition-colors duration-500 group"
            >
              Iniciar mi Reserva
              <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}