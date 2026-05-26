import RegisterPage from "@/components/RegisterPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registrarse",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Register() {
  return (
    <RegisterPage />
  )
}