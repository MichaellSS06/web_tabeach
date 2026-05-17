import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/login/', '/register/'],
    },
    sitemap: 'https://tabeach.com/sitemap.xml', // Reemplazar con la URL real
  }
}
