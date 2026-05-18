"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, CreditCard, ShieldCheck, Loader2,Users, Compass, Plane } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useBookingStore } from '@/store/useBookingStore';
import { useVehiclePricing } from '@/hooks/useVehiclePricing';
import { useTourPricing } from '@/hooks/useTourPricing';
import { useFlotaLocations } from '@/hooks/useFlotaLocations';

import TrasladoCampos from './booking/TrasladoCampos';
import TourCampos from './booking/TourCampos';

export default function FormularioReserva() {
  const searchParams = useSearchParams()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { tours, fetchToursAndTarifas } = useBookingStore();
  const { origenesUnicos, destinosUnicos } = useFlotaLocations();

  useEffect(() => {
    fetchToursAndTarifas();
  }, [fetchToursAndTarifas]);

  // Captura de Parámetros de la URL
  const vehiculoQuery = searchParams.get('vehiculo') || "Auto"
  const tourParam = searchParams.get('tour') || null
  const zonaHotelParam = searchParams.get('zonaHotel') || null
  const origenParam = searchParams.get('origen') || null     
  const destinoParam = searchParams.get('destino') || null
  const pasajerosParam = Number(searchParams.get('pasajeros')) || 1
  const fechaParam = searchParams.get('fecha') || ""
  const precioMovilidadParam = searchParams.get('precioMovilidad') || 0

  // const vehiculo = useMemo(() => {
  //   if (vehiculoQuery.toLowerCase().includes("custer")) return "Custer"
  //   if (vehiculoQuery.toLowerCase().includes("minibus")) return "Minibus"
  //   if (vehiculoQuery.toLowerCase().includes("omnibus")) return "Omnibus"
  //   if (vehiculoQuery.toLowerCase().includes("sprinter")) return "Sprinter"
  //   if (vehiculoQuery.toLowerCase().includes("van")) return "Van"
  //   return "Auto"
  // }, [vehiculoQuery])
  
  const [origen, setOrigen] = useState(origenParam || "")
  const [destino, setDestino] = useState(destinoParam || "")
  const [zonaHotel, setZonaHotel] = useState(zonaHotelParam || "")
  const [telefono, setTelefono] = useState("")
  const [pasajeros, setPasajeros] = useState(pasajerosParam)
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [codigoPais, setCodigoPais] = useState("+51")
  const [numeroVuelo, setNumeroVuelo] = useState("");

  // Extracción de listas únicas desde Zustand para los dropdowns de traslado
  if (origenParam && origen === "" && origenesUnicos.includes(origenParam)) {
    setOrigen(origenParam);
  }
  if (destinoParam && destino === "" && destinosUnicos.includes(destinoParam)) {
    setDestino(destinoParam);
  }
  console.log(origenesUnicos, destinosUnicos)
  console.log(origenParam, origen)

  // Encontrar el Tour actual si aplica
  const tourActual = useMemo(() => {
    if (!tourParam) return null;
    return tours.find(t => t.nombre.toLowerCase().trim() === tourParam.toLowerCase().trim()) || null;
  }, [tourParam, tours]);

  // 🔄 RECALCULO DINÁMICO DE CLASE SEGÚN PASAJEROS (1 a 40)
  const vehiculoClaseAsignada = useMemo(() => {
    if (pasajeros <= 3) return 'Auto';
    if (pasajeros <= 5) return 'Avanza';
    if (pasajeros <= 7) return 'Van';
    if (pasajeros <= 12) return 'Sprinter';
    if (pasajeros <= 25) return 'Minibus';
    return 'Omnibus';
  }, [pasajeros]);

  // Hooks de negocio legales ejecutados a nivel superior
  const pricingVehiculo = useVehiclePricing({
    origen,
    destino,
    vehiculoClase: vehiculoClaseAsignada
  });

  const pricingTour = useTourPricing({
    tourId: tourActual?.id || '',
    precioPorPasajero: tourActual?.precio_por_pasajero || 0,
    numPasajeros: pasajeros,
    zonaHotel: zonaHotel
  });
  
  // Datos financieros consolidados según el tipo de reserva
  const { precioFinal, vehiculoFinal, esTarifaValida } = useMemo(() => {
    if (tourParam) {
      return {
        precioFinal: pricingTour.costoTotal,
        vehiculoFinal: pricingTour.vehiculoAsignado || vehiculoClaseAsignada,
        esTarifaValida: pricingTour.costoTotal > 0
      };
    } else {
      return {
        precioFinal: pricingVehiculo.precioPvt,
        vehiculoFinal: vehiculoClaseAsignada,
        esTarifaValida: pricingVehiculo.precioPvt > 0
      };
    }
  }, [tourParam, pricingTour, pricingVehiculo, vehiculoClaseAsignada]);

  const handlePago = async () => {
    // Validación dinámica de campos requeridos
    if (!tourParam && (!origen || !destino)) {
      setError("Por favor, ingrese el origen y destino de su traslado.")
      return
    }
    if (tourParam && !zonaHotel.trim()) {
      setError("Por favor, especifique su zona de hoteles o lugar de pick-up.");
      return
    }
    if (!telefono.trim()) {
      setError("Por favor, ingrese un número de teléfono de contacto.");
      return
    }
    if (!fecha || !hora) {
      setError("Por favor, seleccione la fecha y hora para su servicio.")
      return
    }
    setLoading(true)
    setError("")
    
    const datosCompra = {
      nombre: "Cliente Tabeach",
      email: "michaellhuanca@gmail.com",
      phone: `${codigoPais}${telefono.trim()}`,
      pasajeros: pasajeros,
      vehiculo: vehiculoFinal, 
      origen: tourParam ? null : origen,     
      destino: tourParam ? null : destino,  
      fecha: fecha,
      hora: `${hora}:00`, 
      tour: tourParam,
      zonaHotel: zonaHotel,
      numeroVuelo: numeroVuelo.trim() || null   
    }

    try {
      // 2. REEMPLAZO DEL FETCH POR EL METODO NATIVO
      const { data, error: invokeError } = await supabase.functions.invoke('openpay-checkout', {
        body: datosCompra // No necesita JSON.stringify, se pasa el objeto directo
      })

      // El cliente de Supabase maneja los errores de red o de función en el objeto error
      if (invokeError) {
        throw new Error(invokeError.message || 'Error al invocar la función de pago.')
      }

      // 3. REDIRECCIÓN A OPENPAY CON LA DATA EN LÍMPIA
      if (data && data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        throw new Error('No se recibió la URL de la pasarela de pagos.')
      }

    } catch (err: unknown) {
      setError((err as Error).message || 'Error de conexión con el servidor.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-cream pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA FORMULARIO */}
        <div className="lg:col-span-2 bg-white shadow-2xl rounded-sm overflow-hidden">
          <div className="bg-luxury-dark p-6 text-white">
            <h1 className="text-2xl font-serif italic">
              {tourParam ? 'Reserva de Experiencia' : 'Detalles del Trayecto'}
            </h1>
            <span className="text-[10px] tracking-widest uppercase border border-luxury-gold/30 px-3 py-1 text-luxury-gold">
              {tourParam ? 'Tour' : 'Traslado'}
            </span>
          </div>

          <div className="p-8 space-y-6">
            {/* Mensaje de error visual si la pasarela falla */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-xs uppercase tracking-wider font-bold rounded-sm">
                {error}
              </div>
            )}

            {/* CONDICIONAL: SI ES TOUR MUESTRA INFO ESTÁTICA, SINO MUESTRA INPUTS */}
            {tourParam ? (
              <TourCampos 
                tourNombre={tourParam} 
                zonaHotel={zonaHotel} 
                zonasDisponibles={pricingTour.zonasDisponiblesParaEsteTour} 
                onChangeZona={setZonaHotel} 
              />
            ) : (
              <TrasladoCampos 
                origen={origen} 
                destino={destino} 
                origenesUnicos={origenesUnicos} 
                destinosUnicos={destinosUnicos} 
                onChangeOrigen={setOrigen} 
                onChangeDestino={setDestino} 
              />
            )}

            {/* Número de Vuelo & Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Número de Vuelo (Opcional)</label>
                <div className="flex items-gray-10-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
                  <Plane size={17} className="text-luxury-gold mr-3 shrink-0" />
                  <input 
                    type="text" 
                    value={numeroVuelo}
                    onChange={(e) => setNumeroVuelo(e.target.value.toUpperCase())}
                    placeholder="Ej. LA2034" 
                    className="bg-transparent outline-none w-full text-sm font-medium uppercase tracking-wider text-luxury-dark" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Teléfono de Contacto</label>
                <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
                  <select 
                    value={codigoPais} 
                    onChange={(e) => setCodigoPais(e.target.value)}
                    className="bg-transparent outline-none text-xs font-bold text-gray-500 mr-2 cursor-pointer appearance-none"
                  >
                    <option value="+51">PE (+51)</option>
                    <option value="+1">US (+1)</option>
                    <option value="+34">ES (+34)</option>
                    <option value="+56">CL (+56)</option>
                    <option value="+54">AR (+54)</option>
                    <option value="+57">CO (+57)</option>
                    <option value="+52">MX (+52)</option>
                    <option value="+593">EC (+593)</option>
                  </select>
                  <span className="text-gray-300 mr-2 select-none">|</span>
                  <input 
                    type="tel" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="999 999 999" 
                    className="bg-transparent outline-none w-full text-sm font-medium tracking-wider text-luxury-dark" 
                  />
                </div>
              </div>
            </div>
               
            {/* Selector de Pasajeros Estilizado y Controlado */}
            <div className="bg-gray-50/50 p-4 border border-gray-100 rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-luxury-gold" />
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block">Pasajeros</label>
                  <span className="text-[11px] text-gray-400 italic">Capacidad máxima admitida: 40 personas</span>
                </div>
              </div>
              <div className="flex items-center border border-gray-200 bg-white shadow-sm rounded-sm overflow-hidden">
                <button 
                  type="button"
                  onClick={() => setPasajeros(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-sm font-bold bg-gray-50 text-gray-600 hover:bg-luxury-dark hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold text-luxury-dark min-w-[50px] text-center">
                  {pasajeros}
                </span>
                <button 
                  type="button"
                  onClick={() => setPasajeros(prev => Math.min(40, prev + 1))}
                  className="px-4 py-2 text-sm font-bold bg-gray-50 text-gray-600 hover:bg-luxury-dark hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border-b border-gray-100 pb-2 group focus-within:border-luxury-gold transition-colors">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Fecha</label>
                <input 
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  type="date" 
                  className="bg-transparent outline-none w-full text-sm text-luxury-dark [color-scheme:light] cursor-pointer" 
                />
              </div>
              <div className="border-b border-gray-100 pb-2 group focus-within:border-luxury-gold transition-colors">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Hora</label>
                <input 
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  type="time" 
                  className="bg-transparent outline-none w-full text-sm text-luxury-dark cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA RESUMEN Y PAGO */}
        <div className="bg-white shadow-2xl rounded-sm p-8 flex flex-col justify-between border-t-4 border-luxury-gold">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">Resumen de Reserva</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-500 italic">Vehículo clase:</span>
                <span className="text-xs font-bold text-luxury-dark">Clase {vehiculoFinal}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-500 italic">Pasajeros:</span>
                <span className="text-xs font-bold text-luxury-dark">{pasajeros} {pasajeros === 1 ? 'persona' : 'personas'}</span>
              </div>
              {tourParam && (
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-xs text-gray-500 italic">Experiencia:</span>
                  <span className="text-xs font-bold text-luxury-gold max-w-[150px] truncate text-right" title={tourParam}>
                    {tourParam}
                  </span>
                </div>
              )}
            </div>

            <div className="py-6 border-y border-dashed border-gray-200 text-center">
              <p className="text-[10px] uppercase text-gray-400 mb-1">Tarifa Total Estimada</p>
              <div className="text-4xl font-serif text-luxury-dark">
                {esTarifaValida ? `$${precioFinal}` : <span className="text-gray-300 text-lg font-sans font-normal">No disponible</span>}
              </div>
              <p className="text-[9px] text-gray-400 mt-2">Incluye impuestos y cargos de servicio</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              onClick={handlePago}
              disabled={!esTarifaValida || !fecha || !hora || loading}
              className={`w-full py-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                esTarifaValida && fecha && hora && !loading
                ? "bg-luxury-gold text-white hover:bg-luxury-dark cursor-pointer" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-luxury-gold" />
                  Conectando pasarela...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Proceder al Pago
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-[9px] text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={12} />
              Pago Encriptado y Seguro
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}