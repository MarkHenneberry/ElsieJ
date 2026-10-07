'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { business, navigation } from '@/lib/business';
import { PrimaryButton } from './ui';
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus(); } }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, [open]);
  return <div className="mobile-navigation"><button ref={button} className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}<span>{open ? 'Close' : 'Menu'}</span></button>{open && <nav id="mobile-menu" aria-label="Mobile navigation">{navigation.map(item => <Link onClick={() => setOpen(false)} aria-current={pathname === item.href ? 'page' : undefined} href={item.href} key={item.href}>{item.label}</Link>)}<Link className="button primary" onClick={() => setOpen(false)} href="/contact">Talk With Us About Care</Link></nav>}</div>;
}
export function Header() {
  const pathname = usePathname();
  return <header className="site-header"><div className="header-inner"><Link className="logo-link" href="/" aria-label="Elsie J's Home Care — Home"><Image src="/images/logo.png" alt="Elsie J's Home Care" width={174} height={130} priority /></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav><div className="header-contact">{business.phone && <a className="header-phone" href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}><Phone size={19} aria-hidden="true" />{business.phone}</a>}<PrimaryButton /></div>{business.phone && <a className="mobile-call" href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}><Phone size={20} aria-hidden="true" />Call</a>}<MobileNavigation /></div></header>;
}
