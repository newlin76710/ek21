import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ek21.com'
  const routes = [
    '',
    '/chatroom',
    '/dating',
    '/rent',
    '/stored',
    '/news',
    '/about',
    '/about/privacy',
    '/blog/problem',
    '/blog/advertisement',
    '/blog/opinion',
  ]
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
