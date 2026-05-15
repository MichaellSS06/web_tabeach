import { cookies } from "next/headers"
import { createServerClient } from '@supabase/ssr'

// Server Components
export const createServerClientSupabase = async() => {
  const cookieStore = await cookies() // En Next.js 15+ cookies() es una promesa, usa await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // El bloque catch es necesario porque los Server Components 
            // no siempre pueden escribir cookies si la página ya se está renderizando
          }
        },
      },
    }
  )
}
