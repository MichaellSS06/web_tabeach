"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from "next/navigation"
import OAuthButtons from "@/components/OAuthButtons"
import { motion } from "framer-motion";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registrarse",
  robots: {
    index: false,
    follow: true,
  },
}

const schema = z.object({
  email: z.email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
  phone: z.string().min(12, "Mínimo 12 caracteres")
})

export default function RegisterPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    setError("")
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.username, phone: data.phone } // se guarda en metadata
        }
      })
      if (authError) throw authError
      router.push("/")
    } catch (err: unknown) {
      setError(
        //(err as Error).message
        "Error al registrar"
             )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-screen bg-luxury-cream px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-serif italic text-luxury-dark"
          >
            Crea tu cuenta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold"
          >
            Regístrate para coordinar tu próximo viaje
          </motion.p>
        </div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-8 rounded-sm shadow-xl space-y-6 border border-gray-100 border-t-4 border-t-luxury-gold"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="space-y-5">
            <div className="relative group">
              <label htmlFor="username" className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder="Ej. Alexander"
                {...register("username")}
                className="w-full bg-transparent outline-none border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 text-sm text-luxury-dark font-medium transition-all"
              />
              {errors.username && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-[11px] font-bold uppercase tracking-wider mt-1"
                >
                  {errors.username.message}
                </motion.p>
              )}
            </div>

            <div className="relative group">
              <label htmlFor="phone" className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">
                Teléfono
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+51 999 999 999"
                {...register("phone")}
                className="w-full bg-transparent outline-none border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 text-sm text-luxury-dark font-medium tracking-wider transition-all"
              />
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-[11px] font-bold uppercase tracking-wider mt-1"
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </div>

            <div className="relative group">
              <label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
                className="w-full bg-transparent outline-none border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 text-sm text-luxury-dark font-medium transition-all"
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-[11px] font-bold uppercase tracking-wider mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="relative group">
              <label htmlFor="password" className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 block">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                {...register("password")}
                className="w-full bg-transparent outline-none border-b border-gray-100 group-focus-within:border-luxury-gold pb-2 text-sm text-luxury-dark tracking-widest transition-all"
              />
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-[11px] font-bold uppercase tracking-wider mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 text-red-600 text-xs uppercase tracking-wider font-bold border-l-2 border-red-500 rounded-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
              loading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-luxury-dark text-white hover:bg-luxury-gold cursor-pointer shadow-md"
            }`}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-luxury-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </span>
            ) : "Crear cuenta"}
          </motion.button>

          <div className="text-center text-xs pt-2">
            <p className="text-gray-400 italic">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-luxury-dark hover:text-luxury-gold font-bold not-italic tracking-wider uppercase ml-1 transition-colors">
                Inicia sesión
              </a>
            </p>
          </div>
        </motion.form>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">o continúa con</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          <OAuthButtons />
        </motion.div>
      </motion.div>
    </div>
  )
}