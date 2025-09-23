import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Imaginify',
    short_name: 'Imaginify',
    description: "Imaginify Made By Anas Ahmed lets you transform your images using AI generative fill, remove backgrounds, change object colors, and remove unwanted objects with Cloudinary AI integration.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon-2.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: "maskable",
      },
      {
        src: '/favicon-3.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: "maskable",
      },
    ],
  }
}