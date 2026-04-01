import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-secondary text-slate-300 py-10 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo-v2.png"
                alt="PrimeTaxi & Tours"
                width={90}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Professional and reliable transportation services in Iceland. From
              airport transfers to custom private tours, we ensure your journey
              is safe and comfortable.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/footerimg1.webp"
                alt="Authorized Day Tour Provider"
                width={80}
                height={80}
                className="h-20 w-auto object-contain rounded-lg mix-blend-screen"
              />
              <Image
                src="/footerimg2.webp"
                alt="Service Partner"
                width={80}
                height={80}
                className="h-20 w-auto object-contain rounded-lg mix-blend-screen"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1HZ4VEteno/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-white/5 hover:bg-primary hover:text-slate-900 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href="https://www.instagram.com/prime_.taxi?igsh=MXJxYjN5OTlkM3V2YQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-white/5 hover:bg-primary hover:text-slate-900 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>
              </div>
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

          {/* Contact & Payments */}
          <div className="flex flex-col h-full">
            <div className="mb-8 lg:mb-0">
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              
              <a href="https://wa.me/3548575955" target="_blank" rel="noopener noreferrer" className="inline-flex bg-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform mb-6 items-center gap-3">
                <Image
                  src="/whatsapp-qr.png"
                  alt="WhatsApp Contact QR Code"
                  width={110}
                  height={110}
                  className="rounded-lg"
                />
                <div className="text-slate-900 pr-3">
                  <p className="font-extrabold text-[15px] leading-tight">Scan & Chat</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">● 24/7 Online</p>
                </div>
              </a>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="size-5 text-primary mt-0.5 shrink-0" />
                  <span>Krummahólum 2, 111 Reykjavík, Iceland</span>
                </li>
                <li>
                  <a
                    href="tel:+3548575955"
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Phone className="size-5 text-primary shrink-0" />
                    <span>+354 857 5955</span>
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

            {/* Payments Area (Aligned to bottom opposite of Socials) */}
            <div className="mt-auto pt-8 border-t border-slate-800/50 lg:border-t-0 lg:pt-0">
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-3 lg:text-right">Secured Payments By</p>
              <div className="flex flex-nowrap items-center gap-1.5 lg:justify-end">
                {/* Stripe */}
                <div className="bg-white px-1.5 py-1 rounded-sm shadow-sm border border-slate-200 flex flex-shrink-0 items-center justify-center h-[34px] w-[56px] hover:scale-105 transition-transform">
                  <img src="/stripe-logo.png" alt="Stripe" className="w-[44px] h-auto object-contain" />
                </div>

                {/* Visa */}
                <div className="bg-white px-1.5 py-1 rounded-sm shadow-sm border border-slate-200 flex flex-shrink-0 items-center justify-center h-[34px] w-[56px] hover:scale-105 transition-transform">
                  <svg viewBox="0 0 50 16" xmlns="http://www.w3.org/2000/svg" className="w-[40px] h-auto fill-[#1434CB]">
                    <path d="M22.58 1h-3.41l-2.07 10.04h3.41L22.58 1zM34.75 1.25c-.65-.17-1.83-.35-3.32-.35-3.66 0-6.24 1.89-6.26 4.59-.04 2 1.86 3.1 3.28 3.78 1.45.69 1.94 1.14 1.94 1.76-.02.94-1.16 1.38-2.24 1.38-1.51 0-2.3-.23-3.52-.77l-.5-.24-.48 2.87c.87.39 2.46.73 4.14.75 3.9 0 6.45-1.87 6.47-4.78.02-1.6-.96-2.81-3.13-3.82-1.3-.64-2.1-1.08-2.1-1.74.02-.59.68-1.22 2.14-1.22 1.16-.02 2 .25 2.64.53l.32.16.62-2.85zM46.74 1h-2.61c-.63 0-1.12.18-1.42.84l-4.99 11.45h3.6s.58-1.63.72-2.02h4.37c.12.5.64 2.02.64 2.02h3.18L46.74 1zm-3.14 7.6l1.3-3.46c-.02.04.27-.72.43-1.18l.22 1.05.74 3.58h-2.69z" />
                    <path fill="#F7B600" d="M16.59 1H11.5L8.24 8.78 7.6 4.63C7.45 3.51 6.55 2.7 5.47 2.7H.14L0 3.39c1.07.23 2.28.61 3.01.99.51.27.65.61.81 1.22l2.67 8.64h3.63L16.59 1z"/>
                  </svg>
                </div>

                {/* MasterCard */}
                <div className="bg-white px-1.5 py-1 rounded-sm shadow-sm border border-slate-200 flex flex-shrink-0 items-center justify-center h-[34px] w-[56px] hover:scale-105 transition-transform relative overflow-hidden">
                  <svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg" className="w-[42px] h-auto p-0.5">
                    <circle fill="#EB001B" cx="20" cy="18" r="16"/>
                    <circle fill="#F79E1B" cx="40" cy="18" r="16"/>
                    <path fill="#FF5F00" d="M30 31.8c-3.1-2.9-5.1-7-5.1-13.8s2-10.9 5.1-13.8c3.1 2.9 5.1 7 5.1 13.8s-2 10.9-5.1 13.8z"/>
                    <text x="30" y="21.5" fontFamily="Arial, Helvetica, sans-serif" fontStyle="italic" fontWeight="900" fontSize="8" fill="white" textAnchor="middle" style={{textShadow: "0px 1px 2px rgba(0,0,0,0.5)"}}>MasterCard</text>
                  </svg>
                </div>

                <div className="bg-white px-1.5 py-1 rounded-sm shadow-sm border border-slate-200 flex flex-shrink-0 items-center justify-center h-[34px] w-[80px] hover:scale-105 transition-transform gap-1">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[16px] w-auto">
                    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.84 1.01 1.15 1.304 2.815.865 4.797-.88 3.963-3.69 5.86-7.818 5.86h-2.1c-.55 0-.96.44-1.05.99l-1.97 10.96a.64.64 0 01-.63.53H7.076z" />
                    <path fill="#009cde" d="M19.349 7.02c-.88 3.963-3.69 5.86-7.818 5.86h-2.1c-.55 0-.96.44-1.05.99l-2.22 12.35a.64.64 0 00.63.75h4.606a.64.64 0 00.63-.53l1.19-6.6a.64.64 0 01.63-.53h1.28c3.55 0 6.09-1.528 6.84-5.23.49-2.45.19-4.32-1.02-5.59-1.37-1.44-4.11-2.06-8.23-2.06H9.72c-.17 0-.3.12-.34.28L8.14 13.59" />
                  </svg>
                  <div className="font-bold text-[14px] tracking-tight leading-none italic flex" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <span className="text-[#003087]">Pay</span>
                    <span className="text-[#009cde]">Pal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Registered Company</p>
            <p className="text-sm font-medium text-slate-400">Prime taxi • KT: 670326-0470</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} PrimeTaxi & Tours. All rights reserved.</p>
          </div>

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
