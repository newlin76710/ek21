import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// /news/、/dating/ 由姊妹站各自提供 sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ek21.com'
  const routes = [
    '/',
    '/chatroom/',
    '/rent/',
    '/stored/',
    '/about/',
    '/about/privacy/',
    '/blog/problem/',
    '/blog/advertisement/',
    '/blog/opinion/',
    '/contact/',
  ]
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/chatroom/' ? 'daily' : 'monthly',
    priority: route === '/' ? 1 : route === '/chatroom/' ? 0.9 : 0.6,
  }))
}
