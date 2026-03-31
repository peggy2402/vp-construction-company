"use client";

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');

  const services = [
    t('service1'),
    t('service2'),
    t('service3'),
    t('service4'),
    t('service5'),
  ];

  const differences = [
    { text: t('diff1'), icon: "⚡" },
    { text: t('diff2'), icon: "🎯" },
    { text: t('diff3'), icon: "🤝" },
    { text: t('diff4'), icon: "💎" },
  ];

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      
      {/* --- HERO SECTION FOR ABOUT --- */}
      <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          // Bạn có thể thay đổi đường dẫn ảnh này sang ảnh công trường của bạn
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-10 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-[#D4AF37] tracking-[0.35em] text-sm md:text-base font-semibold mb-4 uppercase drop-shadow-lg font-sans">
            {t('subtitle')}
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl font-sans">
            {t('title')}
          </h1>
        </div>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-20 bg-zinc-900 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Giới thiệu */}
            <div>
              <div className="w-16 h-[2px] bg-[#D4AF37] mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 font-serif leading-relaxed mb-6">
                {t('intro1')}
              </p>
              <p className="text-zinc-400 font-serif leading-relaxed">
                {t('intro2')}
              </p>
            </div>

            {/* Danh sách dịch vụ */}
            <div className="bg-zinc-800/30 border border-white/5 p-8 md:p-12 rounded-sm">
              <h3 className="text-xl font-bold tracking-[0.1em] text-white mb-8 uppercase font-sans">{t('titleServices')}</h3>
              <ul className="space-y-4">
                {services.map((service, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[#D4AF37] mr-4 text-lg mt-1">✓</span>
                    <span className="text-zinc-300 font-serif leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Triết lý / Philosophy */}
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h3 className="text-2xl md:text-3xl font-light tracking-wider text-white mb-8 font-sans">
              {t('titlePhilosophy')}
            </h3>
            <p className="text-zinc-400 font-serif text-lg md:text-xl leading-relaxed italic">
              {t('philosophy')}
            </p>
          </div>

          {/* Điểm khác biệt / Differences */}
          <div className="mb-24">
            <h3 className="text-2xl font-bold tracking-[0.1em] text-center text-white mb-12 uppercase font-sans">
              {t('diffTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differences.map((diff, idx) => (
                <div key={idx} className="group p-8 border border-white/5 bg-zinc-800/20 hover:bg-zinc-800/50 transition-colors duration-300 flex flex-col items-center text-center">
                  <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                    {diff.icon}
                  </div>
                  <p className="text-zinc-300 font-serif leading-relaxed text-sm md:text-base">
                    {diff.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Kết luận & Slogan */}
          <div className="bg-[#D4AF37] text-zinc-950 p-12 md:text-center rounded-sm relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <p className="text-lg font-serif mb-6 opacity-90">
                {t('conclusion')}
              </p>
              <h4 className="text-xl md:text-2xl font-bold tracking-[0.1em] uppercase font-sans">
                {t('slogan')}
              </h4>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}