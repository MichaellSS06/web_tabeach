"use client"

import { createBrowserClient } from '@supabase/ssr'
import { Provider } from '@supabase/supabase-js'
import { motion } from "framer-motion"
import { useSearchParams } from 'next/navigation'

const providers = [
  { name: "Google", provider: "google", icon: "/google-icon.svg" },
]

export default function OAuthButtons() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const searchParams = useSearchParams()

  const handleOAuthLogin = async (provider: string) => {
    // 1. Capturar el destino final desde la URL actual (?next=/reservar?vehiculo=...)
    const nextRoute = searchParams.get('next') || '/'

    // 2. Construir la URL de callback de tu aplicación de Next.js
    // Recomiendo usar una ruta dedicada a procesar el intercambio de tokens de Supabase
    const origin = window.location.origin

    // Unimos el callback oficial con el destino final codificado
    const redirectToUrl = `${origin}/auth/callback?next=${encodeURIComponent(nextRoute)}`

    await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: redirectToUrl,
      },
    })
  }

  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" },
    hover: { 
      scale: 1.2, 
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      {providers.map((p) => (
        <motion.button
          key={p.provider}
          onClick={() => handleOAuthLogin(p.provider)}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium shadow-sm"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          {/* <img src={p.icon} alt={p.name} className="w-5 h-5" /> */}
          Continuar con {p.name}
        </motion.button>
      ))}
    </div>
  )
}
