"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { NavigationLink } from "./NavigationLink";
import { Menu, X } from "lucide-react";

// --- Language Switcher Component with Flag Icons ---
const FlagIcon = ({ countryCode }: { countryCode: 'gb' | 'vn' }) => {
  if (countryCode === 'gb') {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" className="h-auto rounded-sm"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><g clipPath="url(#a)"><path fill="#012169" d="M0 0v30h60V0z"/><path stroke="#fff" strokeWidth="6" d="M0 0l60 30m0-30L0 30"/><path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30m0-30L0 30"/><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/><path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60"/></g></svg>;
  }
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="24" className="h-auto rounded-sm"><path fill="#DA251D" d="M0 0h900v600H0z"/><path fill="#FF0" d="M450 150 L523 381 L309 231 L591 231 L377 381 z"/></svg>;
};

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (nextLocale: string) => {
    startTransition(() => {
      if (!pathname) return;
      const newPathname = pathname.replace(new RegExp(`^\\/${locale}`), `/${nextLocale}`);
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <button onClick={() => changeLocale('en')} disabled={isPending || locale === 'en'} className="opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed">
        <FlagIcon countryCode="gb" />
      </button>
      <button onClick={() => changeLocale('vi')} disabled={isPending || locale === 'vi'} className="opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed">
        <FlagIcon countryCode="vn" />
      </button>
    </div>
  );
}

export const Navbar = () => {
  const t = useTranslations('Home');
  const locale = useLocale();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for scrolled background effect on desktop
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optional UX Improvement: Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { key: 'navHome', href: `/${locale}` },
    { key: 'navAbout', href: `/${locale}/about` },
    { key: 'navServices', href: `/${locale}/services` },
    { key: 'navProjects', href: `/${locale}/projects` },
    { key: 'navContact', href: `/${locale}/contact` },
    { key: 'navNews', href: `/${locale}/news` }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-colors duration-300 ease-in-out ${
          // Mobile: always solid white.
          // Desktop: transparent at top, solid white on scroll.
          isScrolled
            ? 'bg-white shadow-sm border-b border-zinc-200'
            : 'bg-white shadow-sm border-b border-zinc-200 md:bg-transparent md:shadow-none md:border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavigationLink href={`/${locale}`} className="flex-shrink-0 !gap-4">
            <Image
              src="/LOGO-TEXT-HA.png"
              alt="Hoang Anh Trading & Construction JSC Logo"
              width={150}
              height={40}
              className={`hidden md:block object-contain transition-all duration-300 ${!isScrolled ? 'md:invert' : ''}`}
              priority
            />
            <div className={`flex flex-col font-bold leading-tight transition-colors duration-300 text-zinc-900 ${!isScrolled ? 'md:text-white' : ''}`}>
              <span className="text-xs md:text-sm tracking-wider">HOÀNG ANH</span>
              <span className={`text-[10px] md:text-xs tracking-widest transition-colors duration-300 text-zinc-500 ${!isScrolled ? 'md:text-zinc-300' : ''}`}>TRADING & CONSTRUCTION JSC</span>
            </div>
          </NavigationLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className={`flex space-x-8 text-sm font-medium transition-colors duration-300 text-zinc-900 ${!isScrolled ? 'md:text-white' : ''}`}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.key} className="relative group">
                    {/* Requirement 3: Hover Effect & 5: Smooth Navigation */}
                    <NavigationLink href={item.href} className="py-2 block drop-shadow-sm">
                      {t(item.key)}
                    </NavigationLink>
                    <span
                      className={`absolute bottom-0 left-0 block h-[2px] bg-[#D4AF37] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
            <div className={`border-l pl-8 transition-colors duration-300 border-zinc-300 ${!isScrolled ? 'md:border-white/50' : ''}`}>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Requirement 2: Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-zinc-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Requirement 2 & 5: Mobile Menu (Slide-in Panel & Overlay) */}
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      {/* Slide-in Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-1/2 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 pt-20 flex flex-col h-full">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-zinc-900"
          >
            <X size={28} />
          </button>
          <ul className="flex flex-col space-y-6 text-lg font-medium text-zinc-900 mt-8">
            {navItems.map((item) => (
              <li key={item.key}>
                <NavigationLink href={item.href}>{t(item.key)}</NavigationLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 border-t border-zinc-200">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};