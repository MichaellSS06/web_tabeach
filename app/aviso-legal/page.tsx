import Link from 'next/link';
import { ShieldCheck, FileText, Scale, Building2, ArrowLeft } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans py-20 px-6">
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
      <div className="max-w-4xl mx-auto">
        
        {/* --- CABECERA --- */}
        <header className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block">Transparencia Institucional</span>
          <h1 className="text-4xl md:text-5xl font-serif italic">Aviso Legal</h1>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
        </header>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="bg-white p-8 md:p-12 border border-gray-100 space-y-10 shadow-sm rounded-sm">
          
          {/* 1. Datos Identificativos */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Building2 size={20} />
              <h2 className="text-xl font-serif text-luxury-dark">1. Información General y Titularidad</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              En cumplimiento con las normativas vigentes del sector de transporte, turismo y las disposiciones legales del comercio electrónico en el Perú, se informa que este sitio web es operado por:
            </p>
            <div className="bg-luxury-cream/40 p-5 rounded-sm border border-gray-100 text-xs text-gray-600 space-y-2 font-light">
              <p><strong>Razón Social:</strong> Taxi Beach Travel S.A.C. (en adelante, <strong>Tabeach</strong>)</p>
              <p><strong>RUC:</strong> 20529745771</p>
              <p><strong>Domicilio Legal:</strong> AV. MARISCAL CASTILLA 985 – TUMBES</p>
              <p><strong>Actividad Principal:</strong> Operador de traslados turísticos, transporte privado al aeropuerto y comercialización de tours guiados.</p>
              <p><strong>Contacto Principal:</strong> taxibeach@hotmail.com | 072 601372 </p>
              <p><strong>Números de contacto:</strong> 072 601372 | 980214169 | 964935157 | 972853621 </p>
            </div>
          </section>

          {/* 2. Propiedad Intelectual */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <ShieldCheck size={20} />
              <h2 className="text-xl font-serif text-luxury-dark">2. Propiedad Intelectual e Industrial</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Todos los contenidos de esta página web —incluyendo de forma enunciativa pero no limitativa: textos, códigos de programación, marcas comerciales, logotipos, combinaciones de colores, estructuras de diseño, tarifas oficiales de traslados para los periodos 2025-2026, e itinerarios de rutas y tours— son propiedad exclusiva de <strong>Taxi Beach Travel S.A.C.</strong> o de sus respectivos licenciantes.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Queda estrictamente prohibida la reproducción total o parcial, modificación, distribución o explotación comercial de estos elementos sin una autorización expresa y por escrito de la gerencia de la empresa.
            </p>
          </section>

          {/* 3. Condiciones de Uso de la Plataforma */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Scale size={20} />
              <h2 className="text-xl font-serif text-luxury-dark">3. Responsabilidad sobre los Contenidos</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              <strong>Taxibeach</strong> realiza los máximos esfuerzos para asegurar que los precios, términos y especificaciones técnicas de los servicios (clases de vehículos corporativos, tiempos estimados de paradas y amenidades del servicio VIP) mostrados en la plataforma web coincidan exactamente con nuestro tarifario oficial vigente.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              No obstante, la empresa no se hace responsable de las variaciones o interrupciones del servicio causadas por eventos de fuerza mayor ajenos a nuestro control directo, tales como cierres imprevistos de carreteras por condiciones climatológicas o modificaciones de horarios y cancelaciones por parte de las aerolíneas que operan en los aeropuertos de Piura, Talara y Tumbes.
            </p>
          </section>

          {/* 4. Enlaces de Interés Legales */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 text-luxury-gold">
              <FileText size={20} />
              <h2 className="text-xl font-serif text-luxury-dark">4. Políticas Complementarias</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Para conocer de manera minuciosa las reglas comerciales, reservas, reprogramaciones y el régimen económico de cancelaciones aplicable a nuestros pasajeros y agencias aliadas, le recomendamos revisar los{' '}
              <Link href="/terminos-condiciones" className="text-luxury-gold underline hover:text-luxury-dark transition-colors font-normal">
                Términos y Condiciones del Servicio
              </Link>.
            </p>
          </section>

        </div>
        
        {/* --- RETORNO --- */}
        <div className="text-center mt-12">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors">
            ← Volver al Inicio
          </Link>
        </div>

      </div>
    </main>
  );
}