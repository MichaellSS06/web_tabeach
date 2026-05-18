import { useMemo } from 'react';
import { useBookingStore } from '@/store/useBookingStore';

export function useFlotaLocations() {
  const flotaCompleta = useBookingStore((state) => state.flotaCompleta);

  // Obtener valores únicos de Origen usando useMemo para optimizar rendimiento
  const origenesUnicos = useMemo(() => {
    return Array.from(new Set(flotaCompleta.map(item => item.origen?.trim()))).sort();
  }, [flotaCompleta]);

  // Obtener valores únicos de Destino usando useMemo para optimizar rendimiento
  const destinosUnicos = useMemo(() => {
    return Array.from(new Set(flotaCompleta.map(item => item.destino?.trim()))).sort();
  }, [flotaCompleta]);

  return { origenesUnicos, destinosUnicos, tieneFlota: flotaCompleta.length > 0 };
}