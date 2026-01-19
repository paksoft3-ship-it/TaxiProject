'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Phone, CarTaxiFront, ChevronDown, Sparkles, Map, Car, Plane } from 'lucide-react';

const servicesDropdown = [
  { name: 'Experience the Blue Lagoon', href: '/services/blue-lagoon-experience', icon: Sparkles },
  { name: 'Sightseeing Tours', href: '/services/sightseeing-tours', icon: Map },
  { name: 'Private Transfers', href: '/services/private-transfers', icon: Car },
  { name: 'Transfer Between Keflavik Airport and Blue Lagoon', href: '/services/kef-blue-lagoon', icon: Plane },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Tours', href: '/tours' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-secondary text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="PrimeTaxi & Tours"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium hover:text-primary transition-colors flex items-center gap-1',
                      pathname === item.href && 'text-primary'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="size-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 min-w-[320px]">
                      {servicesDropdown.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <service.icon className="size-5 text-primary" />
                          <span className="text-sm font-medium">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium hover:text-primary transition-colors',
                    pathname === item.href && 'text-primary'
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="tel:+3545551234"
              className="hidden sm:flex items-center justify-center gap-2 h-10 px-6 bg-primary hover:bg-yellow-400 text-slate-900 text-sm font-bold rounded-lg transition-colors shadow-lg shadow-yellow-500/20"
            >
              <Phone className="size-4" />
              <span>Call Now</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name} className="space-y-2">
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm font-medium hover:text-primary transition-colors py-2 flex items-center justify-between',
                        pathname === item.href && 'text-primary'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                      {servicesDropdown.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="flex items-center gap-2 text-sm text-slate-300 hover:text-primary transition-colors py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <service.icon className="size-4 text-primary" />
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium hover:text-primary transition-colors py-2',
                      pathname === item.href && 'text-primary'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                href="/booking"
                className="btn-primary text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
