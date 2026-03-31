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

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for hide/show navbar on scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Requirement 4: Hide/Show Navbar on Scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Don't hide if mobile menu is open
        if (isMenuOpen) {
          setIsVisible(true);
          return;
        }
        // Hide on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Thêm đường dẫn href cho từng menu để NavigationLink hoạt động
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
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Requirement 1: Reduced Header Height (py-3) */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavigationLink href={`/${locale}`} className="flex-shrink-0 !gap-3">
            <Image
              src="/LOGO-TEXT-HA.png"
              alt="Hoang Anh Trading & Construction JSC Logo"
              width={150} // Slightly smaller logo
              height={40}
              className="object-contain"
              priority // Important for LCP
            />
            <div className="flex flex-col font-bold leading-tight text-zinc-900">
              <span className="text-xs tracking-wider">HOÀNG ANH</span>
              <span className="text-[10px] tracking-widest text-zinc-500">GROUP</span>
            </div>
          </NavigationLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 text-sm font-medium text-zinc-900">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.key} className="relative group">
                    {/* Requirement 3: Hover Effect & 5: Smooth Navigation */}
                    <NavigationLink href={item.href} className="py-2 block">
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
            <div className="border-l border-zinc-300 pl-8">
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

      {/* Requirement 2: Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 pt-24 flex flex-col h-full">
          <ul className="flex flex-col space-y-6 text-lg font-semibold text-zinc-900">
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