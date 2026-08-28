import Link from 'next/link';
import { 
  ArrowLeft, 
  RotateCcw, 
  CalendarCheck, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

export default function PoliticaDevolucionesPage() {
  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans py-20 px-6 relative">
      
      {/* Botón para volver al Origen (Flotante Minimalista) */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-luxury-dark border border-gray-200/60 px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-luxury-dark hover:text-white hover:border-transparent transition-all duration-500 group shadow-sm"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* --- CABECERA --- */}
        <header className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block">
            Garantía Operativa y Comercial
          </span>
          <h1 className="text-4xl md:text-5xl font-serif italic">
            Política de Cambios y Devoluciones
          </h1>
          <p className="text-xs text-gray-400 tracking-wider">
            Normativa aplicable a servicios privados, traslados y tours
          </p>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
        </header>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="bg-white p-8 md:p-12 border border-gray-100 space-y-10 shadow-sm rounded-sm text-sm text-gray-500 leading-relaxed font-light">
          
          <p>
            En <strong>Taxi Beach Travel S.A.C.</strong> nos regimos por los más altos estándares de transparencia y puntualidad en la prestación de servicios de transporte turístico corporativo. La presente política regula de manera detallada las condiciones, plazos de anticipación y penalidades aplicables ante cualquier modificación, reprogramación o anulación de reserva solicitada por el cliente.
          </p>

          {/* 1. Modificaciones de Itinerario */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <CalendarCheck size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">
                1. Reprogramaciones y Modificaciones del Servicio
              </h2>
            </div>
            <div className="space-y-3">
              <p>
                <strong>1.1. Cambios de Itinerario o Datos:</strong> Cualquier solicitud de cambio (como actualización de datos del titular, modificación en la relación de pasajeros o cambio de hotel) debe ser notificada por escrito al correo institucional con una anticipación mínima de <strong>02 días antes del servicio</strong>, dado que la programación logística de choferes y unidades se liquida un día previo a la operación.
              </p>
              <p>
                <strong>1.2. Reprogramación por Cambios de Vuelo:</strong> Las postergaciones de fecha o ajustes de horario por reprogramación de aerolíneas deben ser notificadas formalmente con al menos <strong>01 día de anticipación</strong>. Si la solicitud cumple con dicho plazo, el servicio se reprogramará sin penalidad alguna, quedando sujeto a la disponibilidad de la flota.
              </p>
            </div>
          </section>

          {/* 2. Política de Anulaciones y Reembolsos por Categoría de Vehículo */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <RotateCcw size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">
                2. Anulaciones y Escala de Reembolso
              </h2>
            </div>
            <p>
              La aceptación de anulaciones con devolución de saldo se rige estrictamente según la categoría de la unidad reservada y el tiempo previo de comunicación formal:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Bloque: Vehículos Cortos */}
              <div className="bg-luxury-cream/30 p-6 rounded-sm border border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-luxury-dark font-serif font-medium text-base">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Autos, Vans y Sprinter</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  La anulación total de la reserva será aceptada con derecho a reembolso o saldo a favor si se solicita con un mínimo de <strong>01 día de anticipación</strong> a la fecha del servicio.
                </p>
              </div>

              {/* Bloque: Unidades Grandes */}
              <div className="bg-luxury-cream/30 p-6 rounded-sm border border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-luxury-dark font-serif font-medium text-base">
                  <Clock size={16} className="text-luxury-gold" />
                  <span>Minibuses y Ómnibus</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Debido a la exclusividad de bloqueo de flota pesada, las anulaciones solo se aceptan con <strong>04 días de anticipación</strong>. Cancelaciones con menor tiempo se facturarán con una penalidad fija del <strong>50% del valor total del servicio</strong>.
                </p>
              </div>

            </div>
          </section>

          {/* 3. Ausencia del Pasajero y Pérdida de Devolución (No-Show) */}
          <section className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">
                3. Causales Imputables de No-Show (Sin Reembolso)
              </h2>
            </div>
            <p>
              Se perderá el <strong>100% del importe abonado</strong> sin derecho a reembolso ni reprogramación en cualquiera de los siguientes escenarios de No-Show:
            </p>
            
            <ul className="space-y-2 pl-4 text-xs text-gray-600 font-light list-disc">
              <li>Pérdida del vuelo de llegada por causas ajenas a la empresa.</li>
              <li>Exceder el tiempo de tolerancia de espera sin presencia en el punto de recojo (máximo <strong>30 minutos de tolerancia</strong>).</li>
              <li>Modificaciones en el número de vuelo notificadas con menos de 02 horas de diferencia al itinerario pactado.</li>
              <li>Cambio de aeropuerto de llegada sin previo aviso formal.</li>
              <li>Abandono del punto de recojo o traslado por cuenta propia del pasajero sin coordinación previa.</li>
              <li>Postergaciones o cambios de fecha solicitados fuera de los plazos reglamentarios.</li>
              <li>Check-out anticipado del pasajero de su hotel de origen sin notificación previa a nuestra central.</li>
            </ul>
          </section>

          {/* 4. Tiempos y Procesamiento de Devoluciones */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <CreditCard size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">
                4. Procedimiento para Devoluciones de Dinero
              </h2>
            </div>
            <div className="space-y-3">
              <p>
                <strong>4.1. Canal de Procesamiento:</strong> Las solicitudes aprobadas para reembolsos deben tramitarse obligatoriamente escribiendo a <span className="text-luxury-dark font-medium">reservastaxibeach@hotmail.com</span> adjuntando el voucher de servicio emitido y la titularidad de la cuenta bancaria.
              </p>
              <p>
                <strong>4.2. Plazos de Retorno:</strong> Los reembolsos autorizados se ejecutan en un plazo máximo de <strong>03 a 05 días hábiles</strong> mediante transferencia directa a la cuenta de origen (o devolución bancaria correspondiente).
              </p>
              <p>
                <strong>4.3. Gastos Administrativos:</strong> Toda devolución autorizada por causas imputables al usuario (error en compra o cancelación voluntaria a tiempo) estará sujeta a un descuento del <strong>5% por gastos bancarios y administrativos de emisión</strong>.
              </p>
            </div>
          </section>

          {/* Bloque Informativo Final */}
          <div className="flex items-start gap-3 bg-luxury-cream/50 p-4 rounded-sm border border-luxury-gold/20 text-xs text-gray-600">
            <AlertCircle size={18} className="text-luxury-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong>Atención de Emergencias Operativas:</strong> Si presenta un retraso imprevisto durante su viaje, comuníquese de inmediato a nuestras líneas de WhatsApp corporativo (<strong>+51 964 935 157</strong> / <strong>+51 972 853 621</strong>) para evaluar alternativas con nuestra central logistica antes de incurrir en causal de No-Show.
            </p>
          </div>

        </div>

        {/* --- RETORNO INFERIOR --- */}
        <div className="text-center mt-12">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors">
            ← Volver al Inicio
          </Link>
        </div>

      </div>
    </main>
  );
}