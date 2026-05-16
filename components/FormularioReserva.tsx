"use client"

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, CreditCard, ShieldCheck } from 'lucide-react'

export default function FormularioReserva() {
  const searchParams = useSearchParams()
  const vehiculo = searchParams.get('vehiculo') || "Sedán Premium"
  
  const [origen, setOrigen] = useState("")
  const [destino, setDestino] = useState("")

  const precio = useMemo(() => {
    if (origen.length > 3 && destino.length > 3) {
      const tarifaBase = vehiculo.includes("Sprinter") ? 120 : 85
      const variacion = (origen.length + destino.length) % 30 
      return tarifaBase + variacion
    }
    return null
  }, [origen, destino, vehiculo])

  return (
    <div className="min-h-screen bg-luxury-cream pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA FORMULARIO */}
        <div className="lg:col-span-2 bg-white shadow-2xl rounded-sm overflow-hidden">
          <div className="bg-luxury-dark p-6 text-white">
            <h1 className="text-2xl font-serif italic">Detalles del Trayecto</h1>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative group">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Origen</label>
                <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
                  <MapPin size={18} className="text-luxury-gold mr-3" />
                  <input 
                    type="text" 
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    placeholder="¿Dónde le recogemos?" 
                    className="bg-transparent outline-none w-full text-sm" 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Destino</label>
                <div className="flex items-center border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 transition-all">
                  <MapPin size={18} className="text-luxury-gold mr-3" />
                  <input 
                    type="text" 
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder="¿A dónde desea ir?" 
                    className="bg-transparent outline-none w-full text-sm" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-b border-gray-100 pb-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Fecha</label>
                <input type="date" className="bg-transparent outline-none w-full text-sm [color-scheme:light]" />
              </div>
              <div className="border-b border-gray-100 pb-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Hora</label>
                <input type="time" className="bg-transparent outline-none w-full text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA RESUMEN Y PAGO */}
        <div className="bg-white shadow-2xl rounded-sm p-8 flex flex-col justify-between border-t-4 border-luxury-gold">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">Resumen de Reserva</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 italic">Vehículo:</span>
                <span className="text-sm font-bold">{vehiculo}</span>
              </div>
            </div>

            <div className="py-6 border-y border-dashed border-gray-200 text-center">
              <p className="text-[10px] uppercase text-gray-400 mb-1">Tarifa Total Estimada</p>
              <div className="text-4xl font-serif text-luxury-dark">
                {precio ? `$${precio}` : <span className="text-gray-200 animate-pulse">---</span>}
              </div>
              <p className="text-[9px] text-gray-400 mt-2">Incluye impuestos y cargos de servicio</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              disabled={!precio}
              className={`w-full py-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                precio 
                ? "bg-luxury-gold text-white hover:bg-luxury-dark cursor-pointer" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <CreditCard size={16} />
              Proceder al Pago
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