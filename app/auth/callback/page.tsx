"use client"

import { useEffect } from "react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from "next/navigation"

export default function AuthCallback() {
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
        router.push("/")
      } else {
        router.push("/login")
      }
    }
    handleAuthCallback()
  }, [router, supabase])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg animate-pulse">
        <h2 className="text-xl font-bold text-center">Procesando autenticación...</h2>
        <p className="text-center mt-2">Por favor espera un momento</p>
      </div>
    </div>
  )
}
