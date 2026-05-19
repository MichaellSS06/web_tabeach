import Link from 'next/link';
import { 
  Calendar, 
  Car, 
  AlertTriangle, 
  CreditCard, 
  Clock, 
  Mail, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  ArrowLeft
} from 'lucide-react';

export default function TerminosCondicionesPage() {
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
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block">Marco Contractual Oficial</span>
          <h1 className="text-4xl md:text-5xl font-serif italic">Términos y Condiciones</h1>
          <p className="text-xs text-gray-400 tracking-wider">Vigencia Técnica: Periodo 2025 - 2026</p>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
        </header>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="bg-white p-8 md:p-12 border border-gray-100 space-y-10 shadow-sm rounded-sm text-sm text-gray-500 leading-relaxed font-light">
          
          <p>
            El presente documento establece las condiciones comerciales y operativas que rigen las reservas, la prestación y la cancelación de los servicios de transporte privado, traslados corporativos y tours brindados por <strong>Taxi Beach Travel S.A.C.</strong>. Al efectuar un pago o recibir una confirmación de reserva, el cliente acepta expresamente todas las cláusulas detalladas a continuación.
          </p>

          {/* 1. Modalidades de Servicio */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Car size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">1. Estándares y Modalidades del Servicio</h2>
            </div>
            <div className="space-y-4">
              <p>
                <strong>1.1. Servicio Privado (PVT):</strong> Se ejecuta en unidades exclusivas equipadas con aire acondicionado. Incluye una parada libre con una duración máxima de 1 hora en la ruta directa hacia el destino pactado, además de agua de cortesía para los pasajeros durante el trayecto.
              </p>
              <p>
                <strong>1.2. Servicio VIP:</strong> Brindado en unidades premium de estreno. Incluye atenciones personalizadas superiores como ambientación con música instrumental, periódicos, revistas, climatización milimétrica, bebidas frías variadas y snacks premium de la zona (chifles, dulces típicos de la región y frutas de estación).
              </p>
            </div>
          </section>

          {/* 2. Solicitud y Confirmación de Reservas */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Mail size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">2. Procedimiento de Solicitud de Reserva</h2>
            </div>
            <p>
              La única vía formal y correcta para solicitar una reserva es mediante <strong>correo electrónico o página web</strong>, consignando obligatoriamente y al detalle los siguientes datos:
            </p>
            <div className="bg-luxury-cream/40 p-6 rounded-sm border border-gray-100 font-light text-xs text-gray-600 space-y-3">
              <p><strong>1. Fechas del servicio IN/OUT:</strong><br />
                <span className="pl-4 block">• <strong>IN:</strong> Aeropuerto, Estación de Bus, Hotel o Lugar de Recojo exacto.</span>
                <span className="pl-4 block">• <strong>OUT:</strong> Aeropuerto, Estación de Bus, Hotel o Lugar de Destino final.</span>
              </p>
              <p><strong>2. Datos de vuelo:</strong> Aerolínea y N° de Vuelos, o en su defecto, Empresa de Transporte Terrestre.</p>
              <p><strong>3. Identificación:</strong> Nombre de referencia del titular y número total de pasajeros.</p>
              <p><strong>4. Contacto obligatorio:</strong> Número de celular de contacto, WhatsApp o Correo Electrónico (<span className="text-luxury-gold font-normal">¡MUY IMPORTANTE!</span>).</p>
              <p><strong>5. Tipo de Servicio:</strong> Especificar explícitamente si se requiere Servicio Privado (PVT) o VIP.</p>
              <p><strong>6. Clase de Vehículo:</strong> Auto, Van, Sprinter, Minibús u Ómnibus.</p>
            </div>
            <p className="flex items-start gap-2 text-xs bg-green-50 text-green-800 p-3 rounded-sm border border-green-100">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
              <span><strong>Confirmación de la reserva:</strong> Se formalizará bajo la consigna expresa de <strong> COPIADO Y CONFIRMADO </strong> por parte de nuestra central, indicando con precisión la hora exacta de recojo para el traslado de salida (TRF OUT).</span>
            </p>
          </section>

          {/* 3. Plazos de Gestión, Modificación y Anulación */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Calendar size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">3. Plazos de Gestión, Modificaciones y Anulaciones</h2>
            </div>
            <div className="space-y-4 font-light text-sm">
              <p>
                <strong>3.1. Anticipación de Reservas:</strong> Todas las reservas deben gestionarse con antelación. Si las unidades solicitadas corresponden a <em>Autos, Van o Sprinter</em>, el plazo límite es de hasta <strong>01 día antes</strong> del servicio. Para unidades de gran envergadura (<em>Ómnibus o Minibús</em>), la reserva debe procesarse hasta con <strong>07 días de anticipación</strong> y queda estrictamente sujeta a disponibilidad de flota.
              </p>
              <p>
                <strong>3.2. Modificaciones de Itinerario:</strong> Cualquier cambio en los datos del servicio debe solicitarse formalmente hasta <strong>02 días antes</strong> del traslado, debido a que la programación de unidades y choferes se cierra con un día de anticipación. Las solicitudes de reprogramación de vuelos o postergaciones de servicio deben enviarse con <strong>01 día de anticipación</strong> a fin de evitar la aplicación de penalidades.
              </p>
              <p>
                <strong>3.3. Políticas de Anulación Gradual:</strong> 
                <span className="pl-4 block mt-1">• Para vehículos tipo <strong>Auto, Van o Sprinter</strong>: La anulación se aceptará sin costo hasta <strong>01 día antes</strong> del servicio.</span>
                <span className="pl-4 block mt-1">• Para vehículos tipo <strong>Ómnibus o Minibús</strong>: La anulación se aceptará únicamente con un mínimo de <strong>04 días de anticipación</strong>. De no cumplirse este plazo, el servicio será facturado con una penalidad equivalente al <strong>50% del valor total</strong> cotizado.</span>
              </p>
            </div>
          </section>

          {/* 4. Ejecución del Servicio */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <FileText size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">4. Ejecución y Procedimientos del Servicio</h2>
            </div>
            <p>
              Los traslados se estructuran de forma rigurosa un día antes del servicio. El equipo logístico designa al chofer y el vehículo correspondiente según el aforo y el tipo de servicio contratado (PVT/VIP). El conductor recibe una hoja de ruta con la información precisa: nombre de referencia, cantidad y relación de pasajeros, número de contacto, ubicación milimétrica de origen y destino, hora de recojo, N° de vuelo IN/OUT y requerimientos especiales.
            </p>
          </section>

          {/* 5. Procedimientos de Llegada */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Clock size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">5. Protocolos de Llegada (TRF IN)</h2>
            </div>
            <ol className="space-y-3 pl-5 list-decimal font-light">
              <li>
                <strong>Ubicación y Bienvenida:</strong> El conductor se posicionará estratégicamente en el aeropuerto o estación de bus portando un letrero acrílico proporcionado por la agencia con el nombre del pasajero. Posteriormente, se presentará formalmente y validará los detalles del trayecto.
              </li>
              <li>
                <strong>Validación de Voucher:</strong> El pasajero está obligado a mostrar su <strong>VOUCHER DE SERVICIO</strong> emitido por la agencia para corroborar los datos de destino y el tipo de servicio contratado con TAXI BEACH.
              </li>
              <li>
                <strong>Estiba y Cuidado del Equipaje:</strong> Los pasajeros abordarán la unidad mientras el chofer acomoda el equipaje en el maletero si se trata de un auto. <span className="text-luxury-dark font-medium">¡IMPORTANTE!</span> En el caso de unidades Van o Sprinter, el equipaje se resguarda en la parte posterior interior de la unidad por estrictas razones de cuidado, seguridad, comodidad y facilidad de estiba.
              </li>
              <li>
                <strong>Control de Calidad Activo:</strong> Durante el viaje, se realizarán supervisiones telefónicas periódicas para certificar que el chofer conduzca con total prudencia, mantenga encendido el aire acondicionado, se muestre atento, educado y que los pasajeros viajen en óptimas condiciones.
              </li>
              <li>
                <strong>Cierre de Ruta y Coordinación OUT:</strong> Al arribar al hotel de destino, el chofer se comunicará inmediatamente con el Coordinador de Servicios para reportar la finalización conforme y, aprovechando la presencia del pasajero en la movilidad, coordinar la hora exacta de recojo para el traslado de salida.
              </li>
            </ol>
          </section>

          {/* 6. Procedimientos de Salida */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <Clock size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">6. Protocolos de Salida (TRF OUT)</h2>
            </div>
            <ol className="space-y-3 pl-5 list-decimal font-light">
              <li>
                <strong>Pre-confirmación:</strong> La central se comunicará telefónicamente con los pasajeros y/o la recepción del hotel un día antes del traslado de salida para reconfirmar la hora de recojo, registrando el nombre del recepcionista en turno.
              </li>
              <li>
                <strong>Notificación de Unidad:</strong> El día del servicio se reconfirmará la hora exacta y se enviará al pasajero vía mensaje de texto (SMS) el nombre del conductor asignado, su número de celular, así como el color y la placa del vehículo. En caso de pasajeros extranjeros sin cobertura móvil nacional, los datos se remitirán vía WhatsApp, correo electrónico o directamente a la agencia aliada.
              </li>
              <li>
                <strong>Puntualidad en Lobby:</strong> El chofer se estacionará en los exteriores del hotel <strong>15 minutos antes</strong> de la hora pactada, notificando su llegada a través de recepción. <span className="text-luxury-dark font-medium">¡IMPORTANTE!</span> Para servicios en el hotel <em>Royal Decameron</em>, es responsabilidad exclusiva del pasajero o de la agencia notificar a la seguridad del hotel los datos del vehículo y del chofer para autorizar su ingreso; de lo contrario, la unidad permanecerá afuera de las instalaciones hasta recibir la orden de acceso.
              </li>
              <li>
                <strong>Monitoreo de Calidad en Ruta:</strong> Se replica el protocolo de control telefónico durante el traslado hacia el aeropuerto o terminal de salida, evaluando la prudencia en el manejo, el uso de climatización y la cortesía del personal a cargo.
              </li>
            </ol>
          </section>

          {/* 7. Penalidad No-Show */}
          <section className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">7. Régimen de Penalidad por No-Show</h2>
            </div>
            <p>
              La declaración de <strong>No-Show</strong> extingue de forma automática el derecho a la prestación del servicio contratado e implica una penalidad económica correspondiente al <strong>100% del valor total de la tarifa</strong>, sin opción a devoluciones, reembolsos ni reprogramaciones bajo las siguientes causales taxativas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs bg-red-50/60 p-5 rounded-sm border border-red-100/50 text-gray-700 font-light">
              <p>• Pérdida de vuelo por motivos ajenos a la empresa.</p>
              <p>• No presentarse en el punto de recojo tras una tolerancia máxima de <strong>30 minutos de espera</strong>.</p>
              <p>• Cambios de vuelo no informados con más de 02 horas de diferencia respecto al itinerario inicial.</p>
              <p>• Modificación imprevista del aeropuerto de destino o llegada.</p>
              <p>• Decisión unilateral del pasajero de trasladarse por cuenta propia.</p>
              <p>• Postergación de la fecha programada del servicio sin aviso oportuno por los canales formales.</p>
              <p>• Retiro anticipado (Check-out) del pasajero del hotel sin previo aviso a la central logísticca.</p>
            </div>
          </section>

          {/* 8. Cuentas Bancarias */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-luxury-gold">
              <CreditCard size={20} />
              <h2 className="text-xl font-serif text-luxury-dark font-normal">8. Gestión Financiera</h2>
            </div>
            <p>
              Para garantizar la vigencia de cualquier reserva confirmada, los fondos deben encontrarse validados en las cuentas oficiales de <strong>Taxi Beach Travel S.A.C.</strong> del Banco BBVA Continental o mediante la Cuenta de Detracciones obligatoria del Banco de la Nación para transacciones sujetas a las normativas de la SUNAT.
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