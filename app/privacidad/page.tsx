import { ShieldCheck, EyeOff, Database, KeyRound, UserCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PoliticaPrivacidadPage() {
  const pilaresPrivacidad = [
    {
      icon: <Database size={22} />,
      title: "Banco de Datos y Recopilación",
      desc: "De conformidad con la Ley N° 29733, los datos personales facilitados en nuestros formularios de reserva (nombres, información de contacto, datos de vuelos, itinerarios de hoteles y pasajeros) serán incorporados de forma segura en nuestro Banco de Datos Personales denominado 'Usuarios de la Plataforma', de titularidad de TAXI BEACH TRAVEL S.A.C."
    },
    {
      icon: <KeyRound size={22} />,
      title: "Finalidades Obligatorias y Necesarias",
      desc: "El tratamiento de sus datos personales tiene como única finalidad la correcta ejecución técnica y logística del servicio de traslado o tour contratado: la asignación de su conductor certificado, el envío de las notificaciones de placa y vehículo 1 día antes del servicio, la prevención de fraudes y la emisión de comprobantes electrónicos de pago exonerados de IGV."
    },
    {
      icon: <EyeOff size={22} />,
      title: "Tratamiento de Datos Financieros",
      desc: "Todas las transacciones de pago con tarjetas de crédito o débito son procesadas a través de la pasarela cifrada de BBVA Openpay Perú. TAXI BEACH TRAVEL S.A.C. no almacena, no tiene acceso ni registra números de tarjetas ni códigos CVV en sus servidores locales o en la base de datos."
    },
    {
      icon: <UserCheck size={22} />,
      title: "Consentimiento Libre e Informado",
      desc: "Al marcar la casilla de aceptación previa al pago, usted otorga su consentimiento expreso, previo, libre e informado para que procesemos sus datos exclusivamente bajo los términos descritos aquí. No realizamos prospección comercial agresiva ni venta de bases de datos a agencias de marketing terceras."
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
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block mb-3">Privacidad De Alta Gama</span>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-6">Política de Privacidad</h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest font-light">
          Cumplimiento irrestricto de la legislación peruana vigente — Ley N° 29733
        </p>
      </section>

      {/* Contenido Editorial */}
      <section className="max-w-4xl mx-auto py-20 px-6 space-y-16">
        <div className="text-gray-500 text-sm font-light leading-relaxed space-y-4">
          <p>
            En <strong>TAXI BEACH TRAVEL S.A.C.</strong>, con RUC 20529745771 y domicilio legal en Av. Mariscal Castilla 985, Tumbes, Perú, consideramos que resguardar su privacidad digital es un pilar fundamental de nuestra excelencia. Esta declaración detalla las estrictas directrices bajo las cuales recopilamos y protegemos la información de nuestros clientes.
          </p>
        </div>

        {/* Grid de Secciones de Ley */}
        <div className="space-y-12">
          {pilaresPrivacidad.map((pilar, index) => (
            <div key={index} className="border-l border-luxury-gold/30 pl-6 space-y-3 group">
              <div className="flex items-center gap-3 text-luxury-gold transition-colors duration-300">
                {pilar.icon}
                <h2 className="text-lg font-serif italic text-luxury-dark">{pilar.title}</h2>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-light">{pilar.desc}</p>
            </div>
          ))}
        </div>

        {/* Ejercicio de Derechos ARCO */}
        <div className="bg-white p-8 border border-gray-100 rounded-sm space-y-4">
          <div className="flex items-center gap-2 text-luxury-dark">
            <ShieldCheck size={20} className="text-luxury-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-sans">Canal Oficial para Derechos ARCO</h3>
          </div>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Como titular de sus datos personales, la legislación le confiere los derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO)</strong>. Para ejercer cualquiera de ellos de manera gratuita, puede remitir una solicitud escrita firmada adjuntando copia de su DNI o Pasaporte directo a nuestra dirección electrónica oficial: <span className="font-medium text-luxury-dark">taxibeach@hotmail.com</span>, indicando en el asunto &quot;Derechos ARCO — Tabeach&quot;. Su solicitud será atendida dentro de los plazos legales correspondientes.
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