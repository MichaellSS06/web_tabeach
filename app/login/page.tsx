import { Metadata } from "next"
import LoginPage from "@/components/LoginPage"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}