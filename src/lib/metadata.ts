import type { Metadata } from 'next';
import { business } from './business';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = business.siteUrl ? `${business.siteUrl}${path}` : undefined;
  return { title, description, alternates: url ? { canonical: url } : undefined,
    openGraph: { title: `${title} | ${business.name}`, description, type: 'website', siteName: business.name, ...(url ? { url, images: [{ url: `${business.siteUrl}/images/care-at-home.webp`, width: 1536, height: 1024, alt: business.images.alt }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(business.siteUrl ? { images: [`${business.siteUrl}/images/care-at-home.webp`] } : {}) },
  };
}
