import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', ...(business.siteUrl ? { allow: '/', disallow: '/api/' } : { disallow: '/' }) }, ...(business.siteUrl ? { sitemap: `${business.siteUrl}/sitemap.xml` } : {}) }; }
