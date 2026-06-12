"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { useFlotaLocations } from '@/hooks/useFlotaLocations';

interface FiltersProps {
  onSearch?: (filtros: EstadoFiltros) => void;
  onChange: (filtros: EstadoFiltros) => void;
  esFormVuelta: boolean;
  sugerenciaOrigen?: string;
  sugerenciaDestino?: string;
}

interface EstadoFiltros {
  origen: string;
  destino: string;
  fecha: string;
  pasajeros: number | ''; // <-- Permite que sea un número o el string vacío de "Cualquier Capacidad"
}

export default function SearchFilters({ onSearch, onChange, esFormVuelta, sugerenciaOrigen, sugerenciaDestino }: FiltersProps) {
  const { origenesUnicos, destinosUnicos } = useFlotaLocations();

  const [data, setData] = useState<EstadoFiltros>({
    origen: sugerenciaOrigen || '',
    destino: sugerenciaDestino || '',
    fecha: '',
    pasajeros: ''
  });

  // 2. SOLUCIÓN AL EFECTO: Sincronización limpia basada en renderizado derivado.
  // Si las sugerencias del padre cambian (porque el usuario editó el formulario de ida),
  // ajustamos el estado inmediatamente en la fase de renderizado actual, evitando efectos secundarios asíncronos.
  const [prevSugerenciaOrigen, setPrevSugerenciaOrigen] = useState(sugerenciaOrigen);
  const [prevSugerenciaDestino, setPrevSugerenciaDestino] = useState(sugerenciaDestino);

  if (esFormVuelta && (sugerenciaOrigen !== prevSugerenciaOrigen || sugerenciaDestino !== prevSugerenciaDestino)) {
    setPrevSugerenciaOrigen(sugerenciaOrigen);
    setPrevSugerenciaDestino(sugerenciaDestino);
    
    const estadoActualizado = {
      ...data,
      origen: sugerenciaOrigen || data.origen,
      destino: sugerenciaDestino || data.destino
    };
    queueMicrotask(() => {
      setData(estadoActualizado);
      onChange(estadoActualizado);
    }); // Informa al padre de forma segura y controlada
  }

  // 3. Función auxiliar para actualizar localmente y notificar al padre sin usar useEffect
  const actualizarCampo = (campo: keyof EstadoFiltros, valor: string | number) => {
    const nuevoEstado = { ...data, [campo]: valor };
    setData(nuevoEstado);
    onChange(nuevoEstado); // 🚀 Sincronización directa y limpia en el hilo de ejecución del evento
  };

  // 4. Obtener la fecha de hoy en formato YYYY-MM-DD para bloquear el pasado
  const hoyStr = useMemo(() => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // 3. Validar de manera síncrona si el formulario es válido para buscar
  const esFormularioValido = data.origen !== '' && data.destino !== '' && data.fecha !== '';

  // 4. Calcular dinámicamente qué valor mostrar en los selectores
  // Si el usuario no ha elegido nada aún, toma el primer valor disponible de Supabase
  //const valorOrigen = data.origen || origenesUnicos[0] || '';
  //const valorDestino = data.destino || destinosUnicos[0] || '';

  // 5. Manejador de envío seguro que inyecta los valores por defecto si el usuario no interactuó con los selects
  const handleFormSubmit = () => {
    if (!esFormularioValido || !onSearch) return;
    onSearch(data);
  };
    //console.log(data.origen, data.destino, data.pasajeros, data.fecha)

  return (
    <div className="bg-white p-2 rounded-xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center text-luxury-dark mt-12 w-full max-w-5xl">
      {/* SELECTOR DE ORIGEN */}
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full">
        <MapPin className="text-luxury-gold mr-3" size={18} />
        <select 
          value={data.origen}
          className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          onChange={(e) => actualizarCampo('origen', e.target.value)} // 👈 Corregido
        >
          <option value="" disabled>¿Dónde le recogemos?</option>
          {origenesUnicos.map((orig) => (
            <option key={orig} value={orig}>{orig}</option>
          ))}
        </select>
      </div>
      
      {/* SELECTOR DE DESTINO */}
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full">
        <MapPin className="text-luxury-gold mr-3" size={18} />
        <select 
          value={data.destino}
          className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          onChange={(e) => actualizarCampo('destino', e.target.value)}
        >
          <option value="" disabled>¿A dónde desea ir?</option>
          {destinosUnicos.map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
      </div>

      {/* CAMPO DE FECHA (MÍNIMO HOY) */}
      <div className="flex items-center px-6 py-3 border-r border-gray-100 w-full md:w-50">
        <Calendar className="text-luxury-gold mr-3" size={18} />
        <input 
          type="date" 
          min={hoyStr} // Restringe la selección a hoy o fechas futuras
          value={data.fecha}
          className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          onChange={(e) => actualizarCampo('fecha', e.target.value)}
        />
      </div>

      {/* SELECTOR DE PASAJEROS NUMÉRICO */}
      <div className="flex items-center px-6 py-3 w-full md:pl-0">
        <Users className="text-luxury-gold mr-3" size={18} />
        <select 
          value={data.pasajeros}
          className="bg-transparent outline-none w-full text-sm font-medium text-luxury-dark cursor-pointer appearance-none"
          onChange={(e) => actualizarCampo('pasajeros', e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Cualquier Capacidad</option>
          {Array.from({ length: 40 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={String(num)}>
              {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
            </option>
          ))}
        </select>
      </div>

      {/* RENDERIZADO CONDICIONAL DEL BOTÓN INDIVIDUAL (Solo si no requiere flujo compuesto) */}
      {onSearch && (
        <button 
          onClick={handleFormSubmit}
          disabled={!esFormularioValido}
          className={`p-4 rounded-full transition-all duration-300 shadow-lg shrink-0 ${
            esFormularioValido 
              ? 'bg-luxury-gold text-white hover:bg-luxury-dark active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70'
          }`}
        >
          <Search size={20} />
        </button>
      )}
    </div>
  );
}