import RegisterPage from "@/components/RegisterPage"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Registrarse",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}