"use client";

import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { NavigationLink } from "./NavigationLink";

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
    <div className="flex items-center space-x-3 border-l border-zinc-300 pl-6">
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
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        <div className="flex-shrink-0 cursor-pointer">
          <Image
            src="/LOGO-TEXT-HA.png"
            alt="Hoang Anh Trading & Construction JSC Logo"
            width={160}
            height={50}
            className="object-contain"
            style={{ height: 'auto' }}
          />
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-10 text-[13px] tracking-[0.2em] font-medium text-zinc-900">
            {navItems.map((item) => (
              <li key={item.key} className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                <NavigationLink href={item.href}>{t(item.key)}</NavigationLink>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};