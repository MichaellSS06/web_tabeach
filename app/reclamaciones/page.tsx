'use client';

import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Send, ShieldCheck, Info } from 'lucide-react';

export default function LibroReclamacionesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    email: '',
    direccion: '',
    menorEdad: false,
    nombreApoderado: '',
    tipoBien: 'servicio', // servicio o producto
    montoReclamado: '',
    descripcionBien: '',
    tipoReclamacion: 'reclamo', // reclamo o queja
    detalle: '',
    pedido: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Invocar la función pasando el token en los headers
      const { data, error } = await supabase.functions.invoke('send-reclamation', {
        body: formData,
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error('Error enviando el libro de reclamaciones:', error);
      alert('Hubo un error al procesar el envío. Revisa la consola.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-luxury-cream text-luxury-dark font-sans py-20 px-6 relative">
      
      {/* Botón para volver al Origen */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-luxury-dark border border-gray-200/60 px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-luxury-dark hover:text-white hover:border-transparent transition-all duration-500 group shadow-sm"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* --- CABECERA OFICIAL INDECOPI --- */}
        <header className="text-center mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-luxury-gold mb-2">
            <BookOpen size={28} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold block">
            Conforme a la Ley N° 29571
          </span>
          <h1 className="text-3xl md:text-5xl font-serif italic">
            Libro de Reclamaciones Virtual
          </h1>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
        </header>

        {/* --- FORMULARIO DE RECLAMACIÓN --- */}
        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-sm">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-serif italic text-luxury-dark">
                Hoja de Reclamación Registrada
              </h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed font-light">
                Su reclamo/queja ha sido enviado con éxito a nuestro departamento de atención.
              </p>
              <p className="text-[11px] text-gray-400 block pt-2">
                Plazo de respuesta legal conforme a norma: Máximo 15 días hábiles.
              </p>
              <div className="pt-6">
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-xs uppercase tracking-widest text-luxury-gold hover:underline font-bold"
                >
                  Registrar otro reclamo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10 text-xs text-gray-600 font-light">
              
              {/* Bloque Informativo Legal */}
              <div className="flex items-start gap-3 bg-luxury-cream/40 p-4 rounded-sm border border-gray-100 text-[11px] text-gray-500">
                <Info size={16} className="text-luxury-gold flex-shrink-0 mt-0.5" />
                <p>
                  Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, esta institución cuenta con un Libro de Reclamaciones Virtual a su disposición.
                </p>
              </div>

              {/* SECCIÓN 1: Identificación del Consumidor Reclamante */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-dark border-b border-gray-100 pb-2">
                  1. Identificación del Consumidor Reclamante
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Tipo de Documento *</label>
                    <select 
                      required
                      value={formData.tipoDocumento}
                      onChange={(e) => setFormData({...formData, tipoDocumento: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    >
                      <option value="DNI">DNI</option>
                      <option value="CE">Carnet de Extranjería</option>
                      <option value="PASAPORTE">Pasaporte</option>
                      <option value="RUC">RUC</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">N° de Documento *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ingrese el número"
                      value={formData.numeroDocumento}
                      onChange={(e) => setFormData({...formData, numeroDocumento: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Nombres *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Apellido Paterno *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.apellidoPaterno}
                      onChange={(e) => setFormData({...formData, apellidoPaterno: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Apellido Materno *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.apellidoMaterno}
                      onChange={(e) => setFormData({...formData, apellidoMaterno: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Teléfono / Celular *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Domicilio Legal / Habitación *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Av / Calle / Jr - Distrito - Provincia"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                  />
                </div>
              </div>

              {/* SECCIÓN 2: Identificación del Bien Contratado */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-dark border-b border-gray-100 pb-2">
                  2. Identificación del Bien Contratado
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Tipo de Contratación *</label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="tipoBien" 
                          value="servicio" 
                          checked={formData.tipoBien === 'servicio'}
                          onChange={() => setFormData({...formData, tipoBien: 'servicio'})}
                          className="accent-luxury-gold"
                        />
                        <span>Servicio</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Monto Reclamado ($.) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formData.montoReclamado}
                      onChange={(e) => setFormData({...formData, montoReclamado: e.target.value})}
                      className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Descripción del Servicio / Producto Contratado *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Traslado Privado Aeropuerto Tumbes a Decameron - Reserva #1042"
                    value={formData.descripcionBien}
                    onChange={(e) => setFormData({...formData, descripcionBien: e.target.value})}
                    className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs"
                  />
                </div>
              </div>

              {/* SECCIÓN 3: Detalle de la Reclamación */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-dark border-b border-gray-100 pb-2">
                  3. Detalle de la Reclamación y Pedido
                </h3>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Tipo de Reclamación *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <label className={`p-3 border rounded-sm cursor-pointer flex flex-col gap-1 transition-colors ${formData.tipoReclamacion === 'reclamo' ? 'border-luxury-gold bg-luxury-cream/30' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-2 font-bold text-luxury-dark">
                        <input 
                          type="radio" 
                          name="tipoReclamacion" 
                          value="reclamo" 
                          checked={formData.tipoReclamacion === 'reclamo'}
                          onChange={() => setFormData({...formData, tipoReclamacion: 'reclamo'})}
                          className="accent-luxury-gold"
                        />
                        <span>RECLAMO</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-light pl-5">
                        Disconformidad relacionada directamente a los productos o servicios brindados.
                      </span>
                    </label>

                    <label className={`p-3 border rounded-sm cursor-pointer flex flex-col gap-1 transition-colors ${formData.tipoReclamacion === 'queja' ? 'border-luxury-gold bg-luxury-cream/30' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-2 font-bold text-luxury-dark">
                        <input 
                          type="radio" 
                          name="tipoReclamacion" 
                          value="queja" 
                          checked={formData.tipoReclamacion === 'queja'}
                          onChange={() => setFormData({...formData, tipoReclamacion: 'queja'})}
                          className="accent-luxury-gold"
                        />
                        <span>QUEJA</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-light pl-5">
                        Disconformidad no ligada directamente a los servicios; malestar en la atención al público.
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Detalle de los hechos *</label>
                  <textarea 
                    rows={4} 
                    required
                    placeholder="Explique detalladamente los hechos acontecidos..."
                    value={formData.detalle}
                    onChange={(e) => setFormData({...formData, detalle: e.target.value})}
                    className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Pedido del Consumidor *</label>
                  <textarea 
                    rows={2} 
                    required
                    placeholder="Especifique concretamente qué solución o respuesta requiere..."
                    value={formData.pedido}
                    onChange={(e) => setFormData({...formData, pedido: e.target.value})}
                    className="w-full p-2.5 bg-luxury-cream/20 border border-gray-200 rounded-sm focus:outline-none focus:border-luxury-gold text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* SECCIÓN 4: Términos y Envío */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">
                  * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.<br />
                  * El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles improrrogables.
                </p>

                <button 
                  type="submit" 
                  className="w-full bg-luxury-dark text-white py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-luxury-gold transition-colors duration-500 flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={14} />
                  Enviar Hoja de Reclamación
                </button>
              </div>

            </form>
          )}

        </div>

        {/* --- RETORNO INFERIOR --- */}
        <div className="text-center mt-12">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors">
            ← Volver al Inicio
          </Link>
        </div>

      </div>
    </main>
  );
}