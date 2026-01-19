import Link from 'next/link';
import { CarTaxiFront, MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Fleet', href: '/fleet' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { name: 'Airport Transfer', href: '/booking?type=airport' },
  { name: 'City Taxi', href: '/booking?type=taxi' },
  { name: 'Golden Circle Tour', href: '/tours/golden-circle' },
  { name: 'Northern Lights Tour', href: '/tours/northern-lights' },
  { name: 'Blue Lagoon Transfer', href: '/booking?type=blue-lagoon' },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src="/logo.png"
                alt="PrimeTaxi & Tours"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Professional and reliable transportation services in Iceland. From
              airport transfers to custom private tours, we ensure your journey
              is safe and comfortable.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-white/5 hover:bg-primary hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-white/5 hover:bg-primary hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-white/5 hover:bg-primary hover:text-slate-900 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
                <span>Borgartún 25, 105 Reykjavík, Iceland</span>
              </li>
              <li>
                <a
                  href="tel:+3545551234"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="size-5 text-primary shrink-0" />
                  <span>+354 555 1234</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:booking@primetaxi.is"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="size-5 text-primary shrink-0" />
                  <span>booking@primetaxi.is</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} PrimeTaxi & Tours. All rights reserved.</p>

          <div className="flex justify-center items-center gap-2">
            <a
              href="https://paksoft.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group"
            >
              <span className="text-slate-500 mr-2 group-hover:text-primary transition-colors">Developed by</span>
              <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                {/* Custom Crescent Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 -rotate-12">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.08-1.38-.7.13-1.42.21-2.16.21-5.52 0-10-4.48-10-10S9.42 2.83 14.92 2.83c.74 0 1.46.08 2.16.21C15.58 2.5 13.85 2 12 2z" />
                </svg>
                <span className="font-bold text-lg tracking-wide ml-1">PakSoft</span>
              </div>
            </a>
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
