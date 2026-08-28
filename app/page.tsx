import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail,
  Phone, 
  MessageSquare, 
  Compass, 
  ShieldCheck
} from 'lucide-react';
import HeroSection from '@/components/Hero';
import ReservarButton from '@/components/ReservarButton';
import { supabase } from '@/lib/supabase';

export default async function HomePage() {
  const { data: rutasTraslados, error } = await supabase
    .from('rutas_traslados')
    .select('*');
   
  if (error) {
    console.error("Error cargando rutas_traslados de Supabase:", error.message);
  }

  return (
    <div className="min-h-screen font-sans">
      
      {/* --- NAVEGACIÓN --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        
        {/* Fila superior en celular (Logo y Botón alineados perfectamente en los extremos) */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link href="/nosotros" className="text-2xl font-bold tracking-tighter text-luxury-dark uppercase">
            Tabeach <span className="text-luxury-gold">.</span>
          </Link>
          
          {/* Este contenedor solo empuja el botón en móvil, en PC se integra al flujo */}
          <div className="md:hidden">
            <ReservarButton />
          </div>
        </div>
        
        {/* Enlaces de Navegación: Abajo en celular (centrados), en línea para computadora */}
        <div className="flex justify-center md:justify-start space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <Link href="/destinos" className="hover:text-luxury-gold transition">Tours</Link>
          {/* <Link href="/vehiculos" className="hover:text-luxury-gold transition">Vehículos</Link>
          <Link href="/nosotros" className="hover:text-luxury-gold transition">Nosotros</Link> */}
        </div>

        {/* Botón original para Computadora (Oculto en celular para que no se duplique) */}
        <div className="hidden md:block">
          <ReservarButton />
        </div>
      </nav>

      {/* --- SECCIÓN HERO --- */}
      <section>
        <h1 className="sr-only">Tabeach | Transporte Turístico VIP y Tours Personalizados</h1>
        <HeroSection initialFlota={rutasTraslados || []}/>
      </section>

      {/* --- SERVICIOS (Grid Estético) --- */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">Nuestros Tours</h2>
            <p className="text-4xl md:text-5xl font-serif italic text-luxury-dark">Elige tu experiencia</p>
          </div>
          <Link href="/destinos" className="mt-6 md:mt-0 text-[11px] font-bold uppercase tracking-widest border-b-2 border-luxury-gold pb-1">
            Ver todos los tours
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 max-w-full">
          {[
            // { id: '01', name: 'Chofer Privado', desc: 'Servicio premium de punto a punto.', enlace: "/vehiculos", img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800' },
            { id: '02', name: 'Tours Guiados', desc: 'Disfruta con muchas actividades y conoce la historia que guarda nuestras ciudades.', enlace: "/destinos", img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800' },
            // { id: '03', name: 'Vans Ejecutivas', desc: 'Confort absoluto para grupos VIP.', enlace: "/vehiculos", img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800' }
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden w-xs aspect-[3/4] mb-6 shadow-xl">
                <Image 
                  src={item.img} 
                  alt={`Servicio de ${item.name} - Tabeach`} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 text-xs font-bold">
                  {item.id}
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
              <Link 
                href={item.enlace} 
                className="inline-flex items-center text-luxury-gold text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform w-fit"
              >
                Explorar 
                <ChevronRight size={14} className="ml-1 shrink-0" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN: NUESTROS PRINCIPALES CLIENTES (Grid Editorial con Logos e Imagen) --- */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Cabecera de Sección */}
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs">
              Alianzas Estratégicas
            </h2>
            <p className="text-4xl md:text-5xl font-serif italic text-luxury-dark">
              Nuestros principales clientes
            </p>
            <div className="w-12 h-[1px] bg-luxury-gold/40 mx-auto mt-4" />
          </div>

          {/* Grid de 8 Logos con Imágenes y Motion */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
            {[
              { 
                name: "CTM Tours", 
                ref: "CTM TOURS S.A.C.",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" // Abstracción Minimalista Oro/Gris
              },
              { 
                name: "Viajes Pacífico", 
                ref: "VIAJES PACÍFICO S.A.C.",
                img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80" // Ondas suaves y elegantes
              },
              { 
                name: "Nuevo Mundo", 
                ref: "NUEVO MUNDO VIAJES",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" // Monograma geométrico moderno
              },
              { 
                name: "Atipax Perú", 
                ref: "ATIPAX PERÚ TOUR OPERADOR",
                img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80" // Formas fluidas corporativas
              },
              { 
                name: "Peak DMC", 
                ref: "PEAK DMC SOUTH AMERICA",
                img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&q=80" // Arte vectorial minimalista fino
              },
              { 
                name: "Viajes Falabella", 
                ref: "VIAJES FALABELLA",
                img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&q=80" // Textura sutil con tintes dorados
              },
              { 
                name: "Gastón Sacaze", 
                ref: "GASTÓN SACAZE",
                img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80" // Degradado premium limpio
              },
              { 
                name: "Traveleando", 
                ref: "TRAVELEANDO",
                img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80" // Logotipo abstracto conceptual
              },
            ].map((cliente, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col items-center justify-center bg-luxury-cream/20 border border-gray-100/70 p-6 h-36 rounded-sm cursor-pointer transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-transparent overflow-hidden"
              >
                {/* Contenedor del Logo (Imagen con Efecto Zoom en Hover) */}
                <div className="relative w-full h-16 mb-2 overflow-hidden transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={cliente.img}
                    alt={`Logo de ${cliente.name}`}
                    fill
                    className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    sizes="(max-w-7xl) 25vw"
                  />
                </div>

                {/* Información de Texto Inferior (Fija / Sin Zoom) */}
                <div className="text-center mt-1 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-dark/70 group-hover:text-luxury-gold transition-colors duration-500 block">
                    {cliente.name}
                  </span>
                  <span className="text-[7px] uppercase tracking-widest text-gray-400 block font-light whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                    {cliente.ref}
                  </span>
                </div>

                {/* Sutil línea dorada decorativa inferior al hacer hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-luxury-gold transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Nota de Confianza al Pie de Grid */}
          <div className="text-center mt-16">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-light">
              Operando con respaldo corporativo integral a nivel nacional e internacional.
            </p>
          </div>

        </div>
      </section>

      <footer className="bg-luxury-dark text-white py-20 px-8 border-t border-gray-900 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          
          {/* Columna 1: Marca e Identidad */}
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tighter uppercase font-serif italic">
              Tabeach <span className="text-luxury-gold font-sans font-normal">.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Llevamos el transporte turístico a un nuevo nivel de sofisticación y confort en todo el norte peruano.
            </p>
            <div className="flex space-x-5 text-gray-400">
              <Instagram size={18} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              <Facebook size={18} className="hover:text-luxury-gold cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-luxury-gold cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Columna 2: Links a Servicios */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-luxury-gold">Servicios</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <Compass size={12} className="text-luxury-gold/50" /> Traslados Aeropuerto
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <Compass size={12} className="text-luxury-gold/50" /> Eventos Corporativos
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                <Compass size={12} className="text-luxury-gold/50" /> Tours Privados del Norte
              </li>
            </ul>
          </div>

          {/* Columna 3: Canales de Contacto Corporativos */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-luxury-gold">Central Logística</h4>
            <div className="space-y-4 text-sm text-gray-400 font-light">
              
              {/* Teléfono Fijo de Planta */}
              <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
                <Phone size={14} className="text-luxury-gold flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block tracking-wider">Teléfono de Oficina</span>
                  <a href="tel:+51072601372" className="hover:text-white transition-colors text-xs">
                    072 601372
                  </a>
                </div>
              </div>

              {/* Bloque de Whatsapp Atencion 24 Horas */}
              <div className="flex items-start gap-3 border-b border-gray-800 pb-2">
                <MessageSquare size={14} className="text-green-500 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <span className="text-[10px] uppercase text-gray-500 block tracking-wider">Líneas WhatsApp 24H</span>
                  
                  <a href="https://wa.me/51964935157" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors text-xs">
                    +51 964 935 157 <span className="text-[10px] text-gray-500 italic ml-1">(Reservas)</span>
                  </a>
                  
                  <a href="https://wa.me/51972853621" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors text-xs">
                    +51 972 853 621 <span className="text-[10px] text-gray-500 italic ml-1">(Operaciones)</span>
                  </a>
                  
                  <a href="https://wa.me/51980214169" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors text-xs">
                    +51 980 214 169 <span className="text-[10px] text-gray-500 italic ml-1">(Gerencia)</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Columna 4: Consultas por Correo */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-luxury-gold">¿Consultas a la medida?</h4>
            <p className="text-gray-400 text-xs font-light mb-4 leading-relaxed">
              Escríbenos de forma directa para coordinar traslados privados especiales o agendar flotas corporativas.
            </p>
            <a 
              href="mailto:taxibeach@hotmail.com?subject=Consulta%20Servicio%20Premium%20Tabeach"
              className="flex items-center justify-between border-b border-gray-800 pb-2 group hover:border-luxury-gold transition-colors"
            >
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-light">
                reservastaxibeach@hotmail.com
              </span>
              <Mail size={14} className="text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* --- MÓDULO LEGAL Y COPYRIGHT --- */}
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Derechos Reservados */}
          <div className="text-[10px] text-gray-500 uppercase tracking-widest text-center md:text-left">
            © 2026 Taxi Beach Travel S.A.C. Todos los derechos reservados.
          </div>

          {/* Links Legales Solicitados */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-wider text-gray-400">
            <Link href="/aviso-legal" className="hover:text-luxury-gold transition-colors flex items-center gap-1">
              <ShieldCheck size={10} className="text-luxury-gold/40" /> Aviso Legal
            </Link>
            <Link href="/privacidad" className="hover:text-luxury-gold transition-colors">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-luxury-gold transition-colors">
              Cookies
            </Link>
            <Link href="/terminos-condiciones" className="hover:text-luxury-gold transition-colors font-normal text-luxury-gold">
              Términos y Condiciones
            </Link>
            <Link href="/devoluciones" className="hover:text-luxury-gold transition-colors font-normal text-luxury-gold">
              Política de cambios y devoluciones
            </Link>
            <Link href="/reclamaciones" className="hover:text-luxury-gold transition-colors font-normal text-luxury-gold">
              Libro de reclamaciones
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}