"use client"

import { useEffect } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'
import { getSafeRedirect } from "@/lib/utils"

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Error en la autenticación:", error.message)
        router.push("/login")
        return
      }
      if (session?.user) {
        // 2. Recuperar el parámetro "next". Si no existe, usar la raíz "/"
        const nextParam = searchParams.get('next')
        const nextRoute = getSafeRedirect(nextParam, "/")

        // 3. Redirigir al destino dinámico correspondiente
        router.push(nextRoute)
      } else {
        router.push("/login")
      }
    }
    handleAuthCallback()
  }, [router, supabase, searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-luxury-cream px-6 font-sans">
      <div className="w-full max-w-sm bg-white p-8 rounded-sm shadow-xl border border-gray-100 border-t-4 border-t-luxury-gold flex flex-col items-center justify-center text-center">
        
        {/* Spinner Minimalista de Lujo */}
        <div className="relative mb-6 flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-luxury-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <h2 className="text-xl font-serif italic text-luxury-dark mb-2">
          Verificando credenciales
        </h2>
        
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          Por favor espera un momento mientras preparamos tu viaje
        </p>
      </div>
    </div>
  )
}
