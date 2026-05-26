import { Metadata } from "next"
import LoginPage from "@/components/LoginPage"

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Login() {
  return (
    <LoginPage />
  )
}