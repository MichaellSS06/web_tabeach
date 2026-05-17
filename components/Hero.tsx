"use client";
import React, { useState, useRef, useEffect } from 'react';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';

export default function HeroSection() {
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [filtros, setFiltros] = useState({ origen: '', destino: '', pasajeros: '1-3 Pasajeros' });
  const resultsRef = useRef<HTMLDivElement>(null);

// Clave dinámica para forzar la destrucción y recreación del componente de filtros si falla
  const [remountKey, setRemountKey] = useState(0);

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
  
  const handleSearch = (data: { origen: string, destino: string, pasajeros: string }) => {
    setFiltros(data);
    setBusquedaRealizada(true);

    // Scroll suave hacia la sección de resultados
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      {/* SECCIÓN HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070" 
            alt="Fondo Turístico" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight italic">
            Viajes inolvidables, <br />
            <span className="not-italic font-sans font-bold uppercase tracking-tighter text-luxury-gold">Sin Esfuerzo</span>
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-12 opacity-90">
            Descubre la ciudad con el servicio de transporte más exclusivo y puntual.
          </p>

          <SearchFilters key={remountKey} onSearch={handleSearch} />
          
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
            <SearchResults visible={busquedaRealizada} filtros={filtros} />
        )}
        </div>
    </>
  );
}