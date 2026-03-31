"use client";

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function ServicesPage() {
  const t = useTranslations('Home'); // Re-using home translations for services
  const tAbout = useTranslations('About');

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

  const labServices = [
    tAbout('service1'),
    tAbout('service2'),
    tAbout('service3'),
    tAbout('service4'),
    tAbout('service5'),
  ];

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-10 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl font-sans">
            {t('navServices')}
          </h1>
        </div>
      </header>

      <section className="py-20 md:py-28 bg-zinc-900 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6 text-white font-sans">
              <span dangerouslySetInnerHTML={{ __html: t('servicesTitle').replace('CORE', 'CORE').replace('SERVICES', '<span class="font-bold">SERVICES</span>') }} />
            </h2>
            <p className="mt-8 text-zinc-400 font-serif max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {services.map((service, idx) => (
              <div key={idx} className="group flex flex-col items-start text-left p-8 border border-white/5 bg-zinc-800/20 hover:bg-zinc-800/50 transition-colors duration-500">
                <div className="mb-6 p-4 rounded-full bg-slate-800/50 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-10 h-10">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-[0.15em] text-white mb-4 uppercase font-sans">
                  {service.title}
                </h3>
                <p className="text-zinc-400 font-serif text-[15px] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-800/30 border border-white/5 p-8 md:p-12 rounded-sm">
              <h3 className="text-xl font-bold tracking-[0.1em] text-white mb-8 uppercase font-sans">{tAbout('titleServices')}</h3>
              <ul className="columns-1 md:columns-2 space-y-4">
                {labServices.map((service, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#D4AF37] mr-4 text-lg mt-1">✓</span>
                    <span className="text-zinc-300 font-serif leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </section>
    </div>
  );
}