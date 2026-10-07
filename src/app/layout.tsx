import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { business } from '@/lib/business';
import './globals.css';
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
export const metadata: Metadata = {
  title: { default: `${business.name} | Personal Support at Home`, template: `%s | ${business.name}` },
  description: 'Personal home care for seniors, adults who need extra support, and their families. A warm conversation about help at home starts here.',
  ...(business.siteUrl ? { metadataBase: new URL(business.siteUrl) } : {}),
  robots: { index: Boolean(business.siteUrl), follow: Boolean(business.siteUrl) },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: business.name, description: 'Personal home care and everyday support at home.', ...(business.siteUrl ? { url: business.siteUrl } : {}), ...(business.phone ? { telephone: business.phone } : {}), ...(business.email ? { email: business.email } : {}), ...(business.address ? { address: business.address } : {}), ...(business.serviceAreas.length ? { areaServed: business.serviceAreas } : {}) };
  return <html lang="en"><body className={inter.variable}><a className="skip-link" href="#main-content">Skip to main content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /></body></html>;
}
