"use client";
import React, { useState, useRef, useEffect } from 'react';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import Image from 'next/image';
import { useBookingStore, RutaTraslado } from '@/store/useBookingStore';

interface HeroProps {
  initialFlota: RutaTraslado[];
}
interface EstadoFiltroIndividual {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number | '';
}

export interface FiltrosBusqueda {
  ida: EstadoFiltroIndividual;
  vuelta: EstadoFiltroIndividual | null;
}

export default function HeroSection({ initialFlota }: HeroProps) {
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
// 1. Reemplazamos los refs por estados reactivos para que la UI responda en tiempo real
  const [estadoIda, setEstadoIda] = useState<EstadoFiltroIndividual>({
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: ''
  });
  
  const [estadoVuelta, setEstadoVuelta] = useState<EstadoFiltroIndividual>({
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: ''
  });

  const [filtrosFinales, setFiltrosFinales] = useState<FiltrosBusqueda>({
    ida: { origen: '', destino: '', fecha: '', pasajeros: '' },
    vuelta: null
  });

  const [esVueltaActivo, setEsVueltaActivo] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const setFlotaCompleta = useBookingStore((state) => state.setFlotaCompleta);

  // Sincronizar data del servidor a Zustand
  useEffect(() => {
    if (initialFlota.length > 0) {
      setFlotaCompleta(initialFlota);
    }
  }, [initialFlota, setFlotaCompleta]);

  useEffect(() => {
    // 1. Estrategia por API de Rendimiento (Detecta retroceso de forma nativa)
    const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    
    if (entries.length > 0 && entries[0].type === 'back_forward') {
      // No actualices estados aquí. Al recargar la página, React nacerá con sus valores por defecto (false y 0).
      window.location.reload(); 
    }

    // 2. Plan B: Monitorear visibilidad por si Next.js congela el hilo principal al volver
    const limpiarEstadoAlVolver = () => {
      if (document.visibilityState === 'visible') {
        const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (perfEntries[0]?.type === 'back_forward') {
          window.location.reload();
        }
      }
    };

    document.addEventListener('visibilitychange', limpiarEstadoAlVolver);
    return () => document.removeEventListener('visibilitychange', limpiarEstadoAlVolver);
  }, []);
  
  const ejecutarBusquedaFinal = () => {
    setFiltrosFinales({
      ida: estadoIda,
      vuelta: esVueltaActivo ? estadoVuelta : null
    });
    setBusquedaRealizada(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
  <>
    {/* SECCIÓN HERO ADAPTATIVA */}
    <section className="relative min-h-screen h-auto flex items-center justify-center overflow-hidden pt-36 pb-24 px-4 md:px-8">
      {/* Fondo de Imagen */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/tumbes.jpg" 
          alt="Transporte Turístico de Lujo Tabeach" 
          fill
          priority
          className="object-cover brightness-[0.6]"
        />
      </div>
      
      {/* Contenedor de Contenido Principal */}
      <div className="relative z-10 text-center text-white w-full max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight italic">
          Viajes inolvidables, <br />
          <span className="not-italic font-sans font-bold uppercase tracking-tighter text-luxury-gold">Sin Esfuerzo</span>
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 opacity-90">
          Descubre la ciudad con el servicio de transporte más exclusivo y puntual.
        </p>

        {/* Selector Checkbox de Ida y Vuelta */}
        <div className="mb-8 flex items-center gap-3 bg-luxury-dark/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 select-none">
          <input
            type="checkbox"
            id="vuelta"
            className="w-4 h-4 accent-luxury-gold cursor-pointer"
            checked={esVueltaActivo}
            onChange={(e) => {
              setEsVueltaActivo(e.target.checked);
              setBusquedaRealizada(false); // Limpia resultados anteriores al cambiar de modo
            }}
          />
          <label htmlFor="vuelta" className="text-xs uppercase tracking-widest font-bold text-white cursor-pointer">
            ¿Desea solicitar servicio de Retorno (Vuelta)?
          </label>
        </div>

        {/* Formulario 1: TRAYECTO DE IDA */}
        <div className="w-full mb-4 relative z-20">
          <span className="absolute -top-5 left-6 text-[10px] uppercase font-bold tracking-widest text-luxury-gold bg-luxury-dark/80 px-3 py-0.5 rounded-md">Trayecto de Ida</span>
          <SearchFilters 
            onChange={setEstadoIda} 
            onSearch={!esVueltaActivo ? ejecutarBusquedaFinal : undefined} 
            esFormVuelta={false}
          />
        </div>

        {/* Formulario 2: TRAYECTO DE VUELTA (Duplicado Reactivo) */}
        {esVueltaActivo && (
          <div className="w-full mt-10 mb-4 relative z-10 animate-fadeIn flex flex-col items-center">
            <span className="absolute -top-5 left-6 text-[10px] uppercase font-bold tracking-widest text-luxury-gold bg-luxury-dark/80 px-3 py-0.5 rounded-md">Trayecto de Retorno (Vuelta)</span>
            <SearchFilters 
              onChange={setEstadoVuelta} 
              esFormVuelta={true}
              sugerenciaOrigen={estadoIda.origen} // Invierte el destino por comodidad
              sugerenciaDestino={estadoIda.destino}
            />
            
            {/* Botón único disparador para cuando están los dos bloques activos */}
            <button
              onClick={ejecutarBusquedaFinal}
              className="mt-10 bg-luxury-gold text-white font-bold uppercase text-xs tracking-widest px-12 py-4 rounded-full hover:bg-white hover:text-luxury-dark transition-all duration-300 shadow-xl active:scale-95"
            >
              Buscar Ida y Vuelta
            </button>
          </div>
        )}
      </div>
    </section>

    {/* SECCIÓN DE RESULTADOS */}
    <div 
      ref={resultsRef} 
      className={`transition-all duration-700 ease-in-out ${
        busquedaRealizada ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'
      }`}
    >
      {/* Solo renderizamos el contenido si hay búsqueda para evitar saltos de scroll inesperados */}
      {busquedaRealizada && (
        <SearchResults visible={busquedaRealizada} filtros={filtrosFinales} />
      )}
    </div>
    </>
  )
}