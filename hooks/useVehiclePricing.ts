import { useMemo } from 'react';
import { useBookingStore } from '@/store/useBookingStore';

interface UseVehiclePricingProps {
  origen: string;
  destino: string;
  vehiculoClase: string | null;
  vueltaOrigen?: string | null;
  vueltaDestino?: string | null;
  vueltaClase?: string | null; // 👈 Nueva prop: Clase de vehículo específica de la vuelta
}

export function useVehiclePricing ({ origen, destino, vehiculoClase, vueltaOrigen, vueltaDestino, vueltaClase }: UseVehiclePricingProps) {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);

  // 1. Buscar tarifa de Ida exacta
  const vehiculoIda = useMemo(() => {
    if (!origen || !destino || !vehiculoClase) return null;
    return flotaCompleta.find(
      v => v.origen.toLowerCase().trim() === origen.toLowerCase().trim() &&
           v.destino.toLowerCase().trim() === destino.toLowerCase().trim() &&
           v.vehiculo_clase.toLowerCase().trim() === vehiculoClase.toLowerCase().trim()
    );
  }, [flotaCompleta, origen, destino, vehiculoClase]);

  // 2. Buscar tarifa de Vuelta utilizando su PROPIA clase asignada de forma asimétrica
  const vehiculoVuelta = useMemo(() => {
    if (!vueltaOrigen || !vueltaDestino || !vueltaClase) return null;
    return flotaCompleta.find(
      v => v.origen.toLowerCase().trim() === vueltaOrigen.toLowerCase().trim() &&
           v.destino.toLowerCase().trim() === vueltaDestino.toLowerCase().trim() &&
           v.vehiculo_clase.toLowerCase().trim() === vueltaClase.toLowerCase().trim() // 👈 Usa vueltaClase
    );
  }, [flotaCompleta, vueltaOrigen, vueltaDestino, vueltaClase]);

  // 3. Consolidar la suma final
  const precioTotal = useMemo(() => {
    const precioIda = vehiculoIda ? vehiculoIda.precio_pvt : 0;
    const precioVuelta = vehiculoVuelta ? vehiculoVuelta.precio_pvt : 0;
    
    if (vueltaClase && !vehiculoVuelta) return 0;
    if (vehiculoClase && !vehiculoIda) return 0;
    
    return precioIda + precioVuelta;
  }, [vehiculoIda, vehiculoVuelta, vueltaClase, vehiculoClase]);
  
  return {
    vehiculo: vehiculoIda,
    vehiculoRetorno: vehiculoVuelta,
    precioPvt: precioTotal,
    existeRuta: vueltaClase ? (!!vehiculoIda && !!vehiculoVuelta) : !!vehiculoIda
  };
}