import { createServerClientSupabase } from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import FormularioReserva from '@/components/FormularioReserva'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// 1. Tipar los searchParams que recibe la página de Next.js
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ReservarPage({ searchParams }: PageProps) {
  const supabase = await createServerClientSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()
  const email = user?.email
  const nombre = user?.user_metadata.full_name
  
  if (!session) {
    // Await los parámetros ya que en versiones recientes de Next.js son promesas
    const resolvedParams = await searchParams
    
    // 2. Reconstruir los query strings originales (ej: vehiculo=Sedan+Premium)
    const queryString = new URLSearchParams(resolvedParams as Record<string, string>).toString()
    
    // 3. Crear la ruta de origen completa y codificarla para la URL
    const sourcePath = `/reservar${queryString ? `?${queryString}` : ''}`
    const redirectTo = `/login?next=${encodeURIComponent(sourcePath)}`

    // Redirige al login llevando el destino final bajo el parámetro '?next='
    redirect(redirectTo)
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-luxury-cream text-sm text-gray-500 italic">Cargando experiencia...</div>}>
      {/* --- BOTÓN PARA VOLVER AL ORIGEN (Flotante Minimalista) --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-black/90 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-white hover:text-luxury-dark hover:border-transparent transition-all duration-500 group shadow-lg"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>
      </div>
      <FormularioReserva nombre={nombre || ""} email={email || ""} />
    </Suspense>
  )
}