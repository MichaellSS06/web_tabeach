import { Link } from "lucide-react";

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans pt-32 pb-20 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white p-10 md:p-14 rounded-sm shadow-xl border border-gray-100 border-t-4 border-t-red-700 text-center relative overflow-hidden">
        
        {/* Ícono de Error Estilizado (X minimalista) */}
        <div className="mx-auto mb-8 flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-700 border border-red-100">
          <svg 
            className="w-6 h-6 stroke-[1.5]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Cabecera */}
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-700 block mb-3">
          Algo no salió como esperábamos
        </span>
        <h1 className="text-4xl md:text-5xl font-serif italic text-luxury-dark mb-4">
          Transacción interrumpida
        </h1>
        
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-6">
          No se ha realizado ningún cargo a tu tarjeta. Esto puede deberse a una pérdida temporal de conexión, datos de pago incorrectos o a que la sesión ha expirado por seguridad.
        </p>

        {/* Información adicional de asistencia */}
        <div className="bg-luxury-cream/40 p-4 rounded-sm max-w-md mx-auto mb-8 text-left border border-gray-100">
          <h4 className="text-[10px] uppercase tracking-wider font-bold text-luxury-dark mb-2">
            Recomendaciones para tu reserva:
          </h4>
          <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
            <li>Verifica los fondos o la autorización de tu tarjeta para compras en línea.</li>
            <li>Asegúrate de que la conexión a internet sea estable antes de reintentar.</li>
            <li>Si el problema persiste, puedes contactar con nuestro equipo de soporte.</li>
          </ul>
        </div>

        {/* Separador Minimalista */}
        <div className="w-12 h-px bg-gray-200 mx-auto mb-8" />

        {/* Único Botón de Redirección */}
        <div className="flex items-center justify-center">
          <Link 
            href="/"
            className="w-full sm:w-auto px-10 py-4 bg-luxury-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-all duration-300 shadow-md text-center cursor-pointer"
          >
            Ir al inicio
          </Link>
        </div>

        {/* Información de contacto sin enlaces/botones adicionales */}
        <p className="text-[11px] text-gray-400 mt-10 italic">
          Asistencia inmediata disponible las 24 horas a través de nuestros canales oficiales de atención.
        </p>
        
      </div>
    </main>
  )
}