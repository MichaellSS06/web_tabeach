import { Cookie, Info, ToggleLeft, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PoliticaCookiesPage() {
  const tipologiasCookies = [
    {
      icon: <Cookie size={20} />,
      title: "Cookies Técnicas y Estrictamente Necesarias",
      desc: "Son indispensables para permitir la navegación óptima y el correcto funcionamiento de nuestra plataforma. Esto incluye la persistencia de las búsquedas temporales de sus rutas de ida y vuelta (Trayecto de Ida y Retorno) en los filtros antes de procesar su reserva, así como el mantenimiento seguro del estado de autenticación."
    },
    {
      icon: <ToggleLeft size={20} />,
      title: "Cookies de Personalización y Preferencias",
      desc: "Permiten que el sitio web recuerde decisiones previas que usted ha tomado para agilizar su experiencia de reserva. Por ejemplo: recordar el tipo de moneda preferido (USD/PEN), sugerir de forma reactiva su origen como destino de retorno, o conservar datos de navegación no sensibles de su sesión."
    },
    {
      icon: <ShieldAlert size={20} />,
      title: "Cookies de Seguridad y Terceros",
      desc: "Integradas mediante scripts seguros de Supabase y nuestro partner BBVA Openpay. Monitorean tokens de autenticación y patrones de navegación con la exclusiva finalidad de mitigar e identificar riesgos de fraude electrónico o transacciones malintencionadas en la pasarela de pagos."
    }
  ];

  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans pt-28">
      {/* --- BOTÓN PARA VOLVER AL ORIGEN (Flotante Minimalista) --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-black/90 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-white hover:text-luxury-dark hover:border-transparent transition-all duration-500 group shadow-lg"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>

      {/* Encabezado Principal */}
      <section className="max-w-4xl mx-auto text-center px-6 py-16 border-b border-luxury-dark/10">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block mb-3">Navegación Fluida</span>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-6">Política de Cookies</h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest font-light">
          Información transparente sobre el almacenamiento de datos en su navegador
        </p>
      </section>

      {/* Contenido Informativo */}
      <section className="max-w-4xl mx-auto py-20 px-6 space-y-16">
        <div className="text-gray-500 text-sm font-light leading-relaxed space-y-4">
          <p>
            En <strong>TAXI BEACH TRAVEL S.A.C.</strong>, utilizamos cookies y tecnologías similares con la finalidad de ofrecer una navegación fluida, intuitiva y sumamente segura en nuestra web de reservas corporativas y VIP.
          </p>
          <p>
            Una cookie es un pequeño archivo de texto que se almacena de forma temporal en su navegador web o disco duro cuando accede a ciertas secciones de nuestra plataforma. Las cookies no dañan su terminal ni contienen virus de ningún tipo.
          </p>
        </div>

        {/* Clasificación de las Cookies */}
        <div className="space-y-12">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-2">Clasificación Operativa</span>
            <h2 className="text-2xl font-serif text-luxury-dark">¿Qué tecnologías empleamos en Tabeach?</h2>
          </div>

          <div className="space-y-10">
            {tipologiasCookies.map((tipo, index) => (
              <div key={index} className="border-l border-luxury-gold/30 pl-6 space-y-2">
                <div className="flex items-center gap-3 text-luxury-gold">
                  {tipo.icon}
                  <h3 className="text-md font-serif italic text-luxury-dark">{tipo.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{tipo.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desactivación de Cookies */}
        <div className="bg-white p-8 border border-gray-100 rounded-sm space-y-4">
          <div className="flex items-center gap-2 text-luxury-dark">
            <Info size={18} className="text-luxury-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-sans">Administración y Desactivación</h3>
          </div>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Usted tiene el control absoluto sobre las cookies de su dispositivo. Puede configurar su navegador web (Google Chrome, Safari, Mozilla Firefox o Microsoft Edge) para restringir, bloquear o eliminar por completo las cookies almacenadas en nuestro sitio. Tenga en consideración que deshabilitar las cookies estrictamente necesarias podría comprometer la funcionalidad algorítmica de los formularios interactivos de búsqueda y desestabilizar la validación antifraude de la pasarela de pagos.
          </p>
        </div>

        {/* --- RETORNO --- */}
        <div className="text-center mt-12">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors">
            ← Volver al Inicio
          </Link>
        </div>
      </section>
    </main>
  );
}