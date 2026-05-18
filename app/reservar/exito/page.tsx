import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans pt-32 pb-20 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white p-10 md:p-14 rounded-sm shadow-xl border border-gray-100 border-t-4 border-t-luxury-gold text-center relative overflow-hidden">
        
        {/* Ícono de Éxito Estilizado en Oro */}
        <div className="mx-auto mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-luxury-cream text-luxury-gold border border-luxury-gold/20">
          <svg 
            className="w-8 h-8 stroke-[1.5]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        {/* Cabecera */}
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block mb-3">
          Reserva Confirmada
        </span>
        <h1 className="text-4xl md:text-5xl font-serif italic text-luxury-dark mb-4">
          ¡Tu viaje está listo!
        </h1>
        
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-10">
          Hemos procesado tu pago correctamente. En unos minutos recibirás un correo electrónico con los detalles del itinerario, comprobante y las instrucciones de recogida para tu traslado.
        </p>

        {/* Separador Minimalista */}
        <div className="w-12 h-px bg-gray-200 mx-auto mb-10" />

        {/* Botones de Acción de Lujo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-luxury-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300 shadow-md text-center cursor-pointer"
          >
            Volver al inicio
          </Link>
          
          <Link 
            href="/mis-viajes" // Ajusta esta ruta según la estructura de tu app si tienes panel de usuario
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-200 text-luxury-dark text-[10px] font-bold uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 text-center cursor-pointer"
          >
            Gestionar mis reservas
          </Link>
        </div>

        {/* Nota de soporte al pie */}
        <p className="text-[11px] text-gray-400 mt-12 italic">
          ¿Tienes alguna duda de último minuto?{" "}
          <Link href="/contacto" className="text-luxury-dark hover:text-luxury-gold font-bold not-italic underline underline-offset-4 ml-1 transition-colors">
            Contáctanos
          </Link>
        </p>
        
      </div>
    </main>
  )
}