"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import { useTransition } from 'react';

// --- Language Switcher Component with Flag Icons ---
const FlagIcon = ({ countryCode }: { countryCode: 'gb' | 'vn' }) => {
  // Simple SVGs for flags to avoid external dependencies
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

export default function Home() {
  const t = useTranslations('Home');

  const navItems = ['navHome', 'navAbout', 'navServices', 'navProjects', 'navContact', 'navNews'];

  const services = [
    {
      title: t('serviceResidentialTitle'),
      desc: t('serviceResidentialDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    },
    {
      title: t('serviceCommercialTitle'),
      desc: t('serviceCommercialDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    },
    {
      title: t('serviceIndustrialTitle'),
      desc: t('serviceIndustrialDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    },
    {
      title: t('serviceRenovationTitle'),
      desc: t('serviceRenovationDesc'),
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h12m-6-6v6m0-12v6" />
    }
  ];

  const projects = [
    { id: 1, title: t('project1Title'), type: "Commercial", image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, title: t('project2Title'), type: "Residential", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop" },
    { id: 3, title: t('project3Title'), type: "Industrial", image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1200&auto=format&fit=crop" },
    { id: 4, title: t('project4Title'), type: "Renovation", image: "https://nhomkinhgiathai.vn/wp-content/uploads/2024/10/IMG_1113.jpg" },
  ];

  return (
    <div className="bg-zinc-900 font-sans text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      
      {/* --- WHITE NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            {/* Dùng Logo dạng text theo yêu cầu */}
            <Image
              src="/LOGO-TEXT-HA.png"
              alt="VP Construction Logo"
              width={160}
              height={50}
              className="object-contain invert"
              style={{ height: 'auto' }}
            />
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-10 text-[13px] tracking-[0.2em] font-medium text-zinc-900">
              {navItems.map((item) => (
                <li key={item} className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                  {t(item)}
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image: Sleek glass and steel building */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
        />
        {/* Overlays for cinematic deep contrast */}
        <div className="absolute inset-0 z-10 bg-slate-900/50 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto mt-24 flex flex-col items-center">
          <h2 className="text-[#D4AF37] tracking-[0.35em] text-xs md:text-sm font-semibold mb-6 uppercase drop-shadow-lg font-sans">
            {t('heroSubheading')}
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white mb-10 leading-[1.1] tracking-tighter drop-shadow-2xl">
            {t('heroHeading1')}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">
              {t('heroHeading2')}
            </span>
          </h1>
          <button className="group relative px-8 py-4 bg-[#D4AF37] hover:bg-[#b5952f] text-zinc-950 font-bold tracking-[0.15em] text-[13px] transition-all duration-300 overflow-hidden">
            <span className="relative z-10">{t('heroButton')}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </header>

      {/* --- SERVICES SECTION --- */}
      <section className="py-28 bg-zinc-900 border-t border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6 text-white">
              <span dangerouslySetInnerHTML={{ __html: t('servicesTitle').replace('CORE', 'CORE').replace('SERVICES', '<span class="font-bold">SERVICES</span>') }} />
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto"></div>
            <p className="mt-8 text-zinc-400 font-serif max-w-2xl mx-auto text-lg leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {services.map((service, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center p-8 border border-white/5 bg-zinc-800/20 hover:bg-zinc-800/50 transition-colors duration-500">
                {/* Blueprint technical icon style */}
                <div className="mb-6 p-4 rounded-full bg-slate-800/50 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-[0.15em] text-white mb-4 uppercase">{service.title}</h3>
                <p className="text-zinc-400 font-serif text-[15px] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS GALLERY --- */}
      <section className="py-28 bg-zinc-950">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-white mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('projectsTitle').replace('FEATURED', 'FEATURED').replace('PROJECTS', '<span class="font-bold">PROJECTS</span>') }} />
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37]"></div>
          </div>
          <button className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors uppercase mt-8 md:mt-0 font-sans">
            {t('projectsButton')}
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
          {projects.map((project) => (
            <div key={project.id} className="relative aspect-[4/3] group overflow-hidden bg-zinc-900 cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title}
                className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-2 block drop-shadow-md">
                  {t(project.type as any)}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
