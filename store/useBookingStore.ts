import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface RutaTraslado {
  id: number | string;
  origen: string;
  destino: string;
  vehiculo_clase: string;
  precio_pvt: number;
}

export interface Tour {
  id: number | string;
  nombre: string;
  precio_por_pasajero: number;
}

export interface TourMovilidadTarifa {
  id: number | string;
  tour_id: number | string;
  zona_hoteles: string;
  vehiculo_clase: string;
  precio_movilidad_rt: number;
}

interface BookingState {
  flotaCompleta: RutaTraslado[];
  setFlotaCompleta: (flota: RutaTraslado[]) => void;

  tours: Tour[];
  tarifasMovilidad: TourMovilidadTarifa[];

  fetchToursAndTarifas: () => Promise<void>;
  fetchFlota: () => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  flotaCompleta: [],
  tours: [],
  tarifasMovilidad: [],

  setFlotaCompleta: (flota) => set({ flotaCompleta: flota }),

  fetchToursAndTarifas: async () => {
    try {
      // Disparamos ambas peticiones en paralelo para optimizar la velocidad de carga
      const [toursRes, tarifasRes] = await Promise.all([
        supabase.from('tours').select('*'),
        supabase.from('tour_movilidad_tarifas').select('*')
      ]);

      if (toursRes.error) throw toursRes.error;
      if (tarifasRes.error) throw tarifasRes.error;

      set({
        tours: toursRes.data || [],
        tarifasMovilidad: tarifasRes.data || []
      });
    } catch (error) {
      console.error('Error crítico al cargar datos en useBookingStore:', error);
    }
  },

  fetchFlota: async () => {
    try {
      const { data, error } = await supabase.from('rutas_traslados').select('*'); // Asegúrate de que este sea el nombre real de tu tabla
      if (error) throw error;
      set({ flotaCompleta: data || [] });
    } catch (error) {
      console.error('Error al cargar la flota en useBookingStore:', error);
    }
  },
  
}));