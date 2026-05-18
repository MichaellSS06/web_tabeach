"use client";
import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { useBookingStore, RutaTraslado } from '@/store/useBookingStore';
import { FiltrosBusqueda } from './Hero';

interface SearchResultsProps {
  visible: boolean;
  filtros: FiltrosBusqueda;
}

interface ResultadoCombinado {
  id: string | number;
  item: RutaTraslado;
  precioMostrar: number;
  textoTrayecto: string;
  fecha: string;
  pasajeros: number;
  vueltaOrigen: string | null;
  vueltaDestino: string | null;
  fechaVuelta: string | null;
  vueltaClase: string | null;
  vueltaPasajeros: number | null;
}

export default function SearchResults({ visible, filtros }: SearchResultsProps) {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);
  // Determinar la clase requerida según el volumen de pasajeros
  // Función interna auxiliar para deducir la clase según volumen
  const obtenerClaseRequerida = (numPasajeros: number) => {
    if (numPasajeros <= 0) return null;
    if (numPasajeros <= 3) return 'Auto';
    if (numPasajeros <= 5) return 'Avanza';
    if (numPasajeros <= 7) return 'Van';
    if (numPasajeros <= 12) return 'Sprinter';
    if (numPasajeros <= 25) return 'Minibus';
    return 'Omnibus';
  };

  // Filtrado inicial de rutas de la flota
  // Procesamiento consolidado de los datos a mostrar
  const resultadosCombinados = useMemo(() => {
    const pasIda = filtros.ida.pasajeros ? Number(filtros.ida.pasajeros) : 0;
    const claseIda = obtenerClaseRequerida(pasIda);

    // 1. Filtrar opciones elegibles para la IDA exacta
    const opcionesIda = flotaCompleta.filter(v => {
      const coincideOrigen = v.origen.toLowerCase().trim() === filtros.ida.origen.toLowerCase().trim();
      const coincideDestino = v.destino.toLowerCase().trim() === filtros.ida.destino.toLowerCase().trim();
      const coincideClase = claseIda ? v.vehiculo_clase === claseIda : true;
      return coincideOrigen && coincideDestino && coincideClase;
    });

    // CASO A: Solo Ida solicitado
    if (!filtros.vuelta) {
      return opcionesIda.map(rutaIda => ({
        id: rutaIda.id,
        item: rutaIda,
        precioMostrar: rutaIda.precio_pvt,
        textoTrayecto: "Precio por trayecto simple",
        fecha: filtros.ida.fecha,
        pasajeros: pasIda,
        // Retorno vacío
        vueltaOrigen: null,
        vueltaDestino: null,
        fechaVuelta: null,
        vueltaClase: null,
        vueltaPasajeros: null
      }));
    }

    // CASO B: Ida y Vuelta con vehículos y pasajeros totalmente independientes
    const pasVuelta = filtros.vuelta.pasajeros ? Number(filtros.vuelta.pasajeros) : 0;
    const claseVuelta = obtenerClaseRequerida(pasVuelta);

    // Filtrar opciones elegibles para la VUELTA exacta usando su propia capacidad requerida
    const opcionesVuelta = flotaCompleta.filter(v => {
      const coincideOrigen = v.origen.toLowerCase().trim() === filtros.vuelta!.origen.toLowerCase().trim();
      const coincideDestino = v.destino.toLowerCase().trim() === filtros.vuelta!.destino.toLowerCase().trim();
      const coincideClase = claseVuelta ? v.vehiculo_clase === claseVuelta : true;
      return coincideOrigen && coincideDestino && coincideClase;
    });

    const combinados: ResultadoCombinado[] = [];
    
    // Si hay opciones para la vuelta, tomamos la primera que haga match con la clase requerida de vuelta
    // Esto evita duplicar infinitamente las combinaciones en la UI
    opcionesIda.forEach(rutaIda => {
      // Buscamos cualquier opción de vuelta válida para la capacidad solicitada en el retorno
      // 🚀 NOTA: Ya NO filtramos por "rutaVuelta.vehiculo_clase === rutaIda.vehiculo_clase"
      const retornoCorrespondiente = opcionesVuelta[0]; // Tomamos la opción idónea de retorno disponible

      if (retornoCorrespondiente) {
        combinados.push({
          id: `${rutaIda.id}-${retornoCorrespondiente.id}`,
          item: {
            ...rutaIda,
            // Guardamos la suma combinada de ambos precios de forma directa
            precio_pvt: rutaIda.precio_pvt + retornoCorrespondiente.precio_pvt 
          },
          precioMostrar: rutaIda.precio_pvt + retornoCorrespondiente.precio_pvt,
          textoTrayecto: `Combinado: Ida (${rutaIda.vehiculo_clase}) + Vuelta (${retornoCorrespondiente.vehiculo_clase})`,
          fecha: filtros.ida.fecha,
          pasajeros: pasIda, // Pasajeros específicos de la ida
          // Datos asimétricos de la vuelta para el card e hilos URL
          vueltaOrigen: retornoCorrespondiente.origen,
          vueltaDestino: retornoCorrespondiente.destino,
          fechaVuelta: filtros.vuelta!.fecha,
          vueltaClase: retornoCorrespondiente.vehiculo_clase,
          vueltaPasajeros: pasVuelta
        });
      }
    });

    return combinados;
  }, [flotaCompleta, filtros]);

  return (
    <section className={`py-24 bg-luxury-cream transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-xs mb-2">Flota Disponible</h2>
            <p className="text-3xl font-serif italic text-luxury-dark">
              {filtros.vuelta ? 'Opciones Disponibles (Ida y Vuelta Incluida)' : 'Opciones para su trayecto'}
            </p>
          </div>
          {filtros.vuelta && (
            <span className="bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 text-[10px] tracking-widest font-bold uppercase px-4 py-2 rounded-md">
              Tarifas Totales Consolidadas
            </span>
          )}
        </div>

        <div className="space-y-4">
          {resultadosCombinados.length > 0 ? (
            resultadosCombinados.map((res) => (
              <div key={res.id} className="relative group">
                <VehicleCard 
                  item={res.item}
                  fecha={res.fecha}
                  pasajerosCount={res.pasajeros}
                  vueltaOrigen={res.vueltaOrigen}
                  vueltaDestino={res.vueltaDestino}
                  vueltaClase={res.vueltaClase}
                  fechaVuelta={res.fechaVuelta}
                  vueltaPasajeros={res.vueltaPasajeros}
                />
                {/* Desglose visual estético del total de cobro abajo de la tarjeta */}
                <div className="absolute top-3 right-6 hidden md:block text-[10px] text-gray-400 font-medium tracking-wider italic">
                  {res.textoTrayecto}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-sm shadow-sm text-gray-500 font-light italic">
              No se encontraron vehículos disponibles que cubran ambos trayectos para las capacidades elegidas.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}