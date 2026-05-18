import { useMemo } from 'react';
import { useBookingStore } from '@/store/useBookingStore';

interface UseTourPricingProps {
  tourId: number | string;
  precioPorPasajero: number;
  numPasajeros: number;
  zonaHotel: string;
}

export function useTourPricing({ tourId, precioPorPasajero, numPasajeros, zonaHotel }: UseTourPricingProps) {
  const tarifasMovilidad = useBookingStore((state) => state.tarifasMovilidad);

  // 1. Lógica estricta de asignación de vehículo por volumen de pasajeros
  const vehiculoAsignado = useMemo(() => {
    if (numPasajeros <= 3) return 'Auto';
    if (numPasajeros <= 6) return 'Van';
    if (numPasajeros <= 12) return 'Sprinter';
    if (numPasajeros <= 25) return 'Minibus';
    return 'Bus';
  }, [numPasajeros]);

  // 2. Extraer de forma única las zonas asociadas exclusivamente a este Tour ID
  const zonasDisponiblesParaEsteTour = useMemo(() => {
    return Array.from(
      new Set(
        tarifasMovilidad
          .filter(t => String(t.tour_id) === String(tourId))
          .map(t => t.zona_hoteles)
      )
    ).sort();
  }, [tarifasMovilidad, tourId]);

  // 3. Cruzar datos para hallar la tarifa exacta (Tour + Zona + Tipo de vehículo)
  const tarifaMovilidadMatch = useMemo(() => {
    return tarifasMovilidad.find(
      t => String(t.tour_id) === String(tourId) && 
           t.zona_hoteles === zonaHotel && 
           t.vehiculo_clase === vehiculoAsignado
    );
  }, [tarifasMovilidad, tourId, zonaHotel, vehiculoAsignado]);
  
  // 4. Cálculos finales de precios
  const precioMovilidad = tarifaMovilidadMatch ? tarifaMovilidadMatch.precio_movilidad_rt : 0;
  const costoTotal = (precioPorPasajero * numPasajeros) + precioMovilidad;

  return {
    vehiculoAsignado,
    zonasDisponiblesParaEsteTour,
    precioMovilidad,
    costoTotal,
    existeTarifaParaVehiculo: !!tarifaMovilidadMatch || !zonaHotel
  };
}