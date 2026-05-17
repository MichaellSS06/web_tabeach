import React from 'react';
import Link from 'next/link'; // <-- Usamos el Link nativo de Next.js

export default function ReservarButton() {
  return (
    <Link 
      href="/reservar?vehiculo=auto"
      className="bg-luxury-dark text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors duration-300 inline-block text-center"
    >
      Reservar Ahora
    </Link>
  );
}