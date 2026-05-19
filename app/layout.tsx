import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", 
});

export const metadata: Metadata = {
  title: {
    default: "Tabeach | Transporte Turístico VIP",
    template: "%s | Tabeach"
  },
  description: "Servicios de transporte de lujo y tours personalizados en los destinos más exclusivos. Confort, puntualidad y discreción garantizados.",
  keywords: ["transporte turístico", "traslados VIP", "tours personalizados", "transporte de lujo", "Tabeach"],
  authors: [{ name: "Tabeach" }],
  creator: "Tabeach",
  publisher: "Tabeach",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://tabeach.com", // Reemplazar con la URL real si es diferente
    siteName: "Tabeach",
    title: "Tabeach | Transporte Turístico VIP",
    description: "Servicios de transporte de lujo y tours personalizados. La mejor experiencia de viaje.",
    images: [
      {
        url: "/og-image.jpg", // Asegurarse de que esta imagen exista en public/
        width: 1200,
        height: 630,
        alt: "Tabeach Transporte Turístico VIP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabeach | Transporte Turístico VIP",
    description: "Servicios de transporte de lujo y tours personalizados.",
    images: ["/og-image.jpg"],
  },
  robots: {
    follow: true,
  },
  alternates: {
    canonical: "https://tabeach.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
    >
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Tabeach",
              "description": "Servicios de transporte de lujo y tours personalizados en los destinos más exclusivos.",
              "url": "https://tabeach.com",
              "telephone": "+51980214169", // Reemplazar con el real
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Mariscal Castilla 985",
                "addressLocality": "Tumbes",
                "addressCountry": "PE"
              },
              "image": "https://tabeach.com/og-image.jpg",
              "priceRange": "$$"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
