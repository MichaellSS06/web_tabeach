"use client"

import { createBrowserClient } from '@supabase/ssr'
import { Provider } from '@supabase/supabase-js'
import { motion, Variants } from "framer-motion"
import { useSearchParams } from 'next/navigation'

import type { SVGProps } from "react";

const Gmail = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 49.4 512 399.42">
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path
          fill="#4285f4"
          d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
        />
        <path
          fill="#34a853"
          d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
        />
        <path
          fill="#fbbc04"
          d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
        />
      </g>
      <path
        fill="#ea4335"
        d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
      />
      <path
        fill="#c5221f"
        fillRule="nonzero"
        d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
      />
    </g>
  </svg>
);

export { Gmail };

const providers = [
  { 
    name: "Google", 
    provider: "google", 
    // Icono oficial de Google via CDN público y seguro
    icon: "https://www.svgrepo.com/show/355037/google-icon.svg" 
  },
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

  const buttonVariants : Variants = {
    initial: { 
      scale: 1, 
      backgroundColor: "#ffffff",
      borderColor: "#f3f4f6" 
    },
    hover: { 
      scale: 1.01, 
      borderColor: "#c5a880", // Toque sutil de tu luxury-gold en el borde al hacer hover
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.99 }
  }

  return (
    <div className="flex flex-col gap-3 mb-6">
      {providers.map((p) => (
        <motion.button
          key={p.provider}
          onClick={() => handleOAuthLogin(p.provider)}
          className="w-full flex items-center justify-center gap-3 border text-[10px] uppercase tracking-widest font-bold text-luxury-dark px-6 py-4 rounded-sm shadow-sm cursor-pointer transition-colors"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Gmail
            className="w-6 h-6 object-contain select-none" 
          />
          <span>Continuar con {p.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
