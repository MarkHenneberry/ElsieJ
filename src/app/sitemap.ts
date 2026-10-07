import type { MetadataRoute } from 'next';
import { business, navigation } from '@/lib/business';
export default function sitemap(): MetadataRoute.Sitemap { if (!business.siteUrl) return []; return [...navigation.map(n => n.href), '/privacy', '/accessibility'].map(path => ({ url: `${business.siteUrl}${path}`, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : .7 })); }
