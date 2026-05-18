import { useMemo } from 'react';
import { useBookingStore } from '@/store/useBookingStore';

interface UseVehiclePricingProps {
  origen: string;
  destino: string;
  vehiculoClase: string | null;
}

export function useVehiclePricing({ origen, destino, vehiculoClase }: UseVehiclePricingProps) {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);

  // Busca el vehículo exacto que haga match con los tres parámetros
  const vehiculoMatch = useMemo(() => {
    if (!origen || !destino || !vehiculoClase) return null;

    return flotaCompleta.find(
      v => v.origen.toLowerCase().trim() === origen.toLowerCase().trim() &&
           v.destino.toLowerCase().trim() === destino.toLowerCase().trim() &&
           v.vehiculo_clase.toLowerCase().trim() === vehiculoClase.toLowerCase().trim()
    );
  }, [flotaCompleta, origen, destino, vehiculoClase]);

  return {
    vehiculo: vehiculoMatch,
    precioPvt: vehiculoMatch ? vehiculoMatch.precio_pvt : 0,
    existeRuta: !!vehiculoMatch
  };
}