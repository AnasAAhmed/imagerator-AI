import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imagerator-ai.vercel.app';

    // Example: static pages with images
    const staticPages = [
        {
            path: "/",
            image: "/assets/images/hero.webp"
        },
        {
            path: "/profile",
            image: "/assets/images/hero.webp"

        },
        {
            path: "/sign-in",
            image: "/assets/images/hero.webp"

        },
        {
            path: "/sign-up",
            image: "/assets/images/hero.webp"

        },
        {
            path: "/credits",
            image: "/assets/images/credits.png"
        },
        {
            path: "/transformations/add/restore",
            image: '/assets/images/restore.webp',
        },
        {
            path: "/transformations/add/removeBackground",
            image: '/assets/images/bg-remove.webp',
        },
        {
            path: "/transformations/add/fill",
            image: '/assets/images/hero.webp',
        },
        {
            path: "/transformations/add/remove",
            image: '/assets/images/obj-remove.webp',
        },
        {
            path: "/transformations/add/recolor",
            image: '/assets/images/obj-recolor.webp',
        }
    ];

    const urls = staticPages.map(({ path, image }) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <image:image>
        <image:loc>${baseUrl}${image}</image:loc>
        <image:caption>${path.replace("/", "").replace("-", " ")}</image:caption>
      </image:image>
    </url>
  `).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  >
    ${urls}
  </urlset>
  `;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
}
