import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ai-imagerator',
    short_name: 'ai-imager',
    description: "Imaginify lets you transform your images using AI generative fill, remove backgrounds, change object colors, and remove unwanted objects with Cloudinary AI integration.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}