"use client";

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const t = useTranslations('About');

  // --- Scroll Animation Logic ---
  const introRef = useRef(null);
  const philosophyRef = useRef(null);
  const diffRef = useRef(null);
  const galleryRef = useRef(null);
  const conclusionRef = useRef(null);
  const [isIntroVisible, setIntroVisible] = useState(false);
  const [isPhilosophyVisible, setPhilosophyVisible] = useState(false);
  const [isDiffVisible, setDiffVisible] = useState(false);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const [isConclusionVisible, setConclusionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === introRef.current) setIntroVisible(true);
            if (entry.target === philosophyRef.current) setPhilosophyVisible(true);
            if (entry.target === diffRef.current) setDiffVisible(true);
            if (entry.target === galleryRef.current) setGalleryVisible(true);
            if (entry.target === conclusionRef.current) setConclusionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }
    );
    [introRef, philosophyRef, diffRef, galleryRef, conclusionRef].forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

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
      <section className="py-20 bg-zinc-900 relative z-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div
            ref={introRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 transition-all duration-1000 ease-out ${isIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Giới thiệu */}
            <div>
              <div className="w-16 h-[2px] bg-[#D4AF37] mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 font-serif leading-relaxed mb-6">
                {t('intro1_part1')}
              </p>
              <p className="text-zinc-400 font-serif leading-relaxed mb-6">
                {t('intro1_part2')}
              </p>
              <p className="text-zinc-400 font-serif leading-relaxed mb-6">
                {t('intro1_part3')}
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
          <div
            ref={philosophyRef}
            className={`text-center max-w-4xl mx-auto mb-24 transition-all duration-1000 ease-out ${isPhilosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3 className="text-2xl md:text-3xl font-light tracking-wider text-white mb-8 font-sans">
              {t('titlePhilosophy')}
            </h3>
            <p className="text-zinc-400 font-serif text-lg md:text-xl leading-relaxed italic">
              {t('philosophy')}
            </p>
          </div>

          {/* Điểm khác biệt / Differences */}
          <div
            ref={diffRef}
            className={`mb-24 transition-all duration-1000 ease-out ${isDiffVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
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

          {/* --- GALLERY SECTION: CERTIFICATES & EQUIPMENT --- */}
          <div
            ref={galleryRef}
            className={`mb-24 transition-all duration-1000 ease-out ${isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold tracking-[0.1em] text-white uppercase font-sans mb-4">
                {t('galleryTitle')}
              </h3>
              <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto"></div>
            </div>

            {/* Certificates */}
            <div className="mb-16">
              <h4 className="text-xl text-[#D4AF37] font-serif mb-8 text-center">{t('certSubtitle')}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ảnh Chứng chỉ */}
                {[
                  { src: '/CC-ISO-NGUYENDINHHANH.jpg', alt: t('certHanh') },
                  { src: '/CC-ISO-Thong2.jpg', alt: t('certThong') },
                ].map((cert, idx) => (
                  <div key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-zinc-800">
                    <img src={cert.src} alt={cert.alt} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                      <p className="text-white font-semibold tracking-wider">{cert.alt}</p>
                    </div>
                  </div>
                ))}

                {/* File DOCX: Công bố năng lực (Thay thế cho ảnh đã xóa) */}
                <a 
                  href="/GCN-LAS 40.009 - mới.docx" 
                  download
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm border-2 border-dashed border-[#D4AF37]/50 bg-zinc-800/50 hover:bg-zinc-800 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-16 h-16 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-base">GCN LAS 40.009</h5>
                  <p className="text-zinc-400 text-sm font-serif leading-relaxed mb-6">
                    Công bố thông tin về<br/>năng lực hoạt động thí nghiệm<br/>chuyên ngành xây dựng
                  </p>
                  <span className="inline-block text-xs font-semibold text-zinc-900 bg-[#D4AF37] px-4 py-2 rounded-sm group-hover:bg-[#f2ce5e] transition-colors duration-300">
                    TẢI XUỐNG (.DOCX)
                  </span>
                </a>

              </div>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="text-xl text-[#D4AF37] font-serif mb-8 text-center">{t('equipSubtitle')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { src: '/may-PIT.jpg', alt: t('equipPIT'), pdf: '/may-PIT.pdf' },
                  { src: '/PDA-Hà-lan-Hoang-Anh.jpg', alt: t('equipPDA'), pdf: '/PDA-Hà-lan.pdf' },
                ].map((equip, idx) => (
                  <div key={idx} className="group flex flex-col items-center">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 bg-zinc-800 mb-4 shadow-lg">
                      <img src={equip.src} alt={equip.alt} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2 text-center">{equip.alt}</h5>
                    {equip.pdf && (
                      <a href={equip.pdf} target="_blank" rel="noopener noreferrer" className="text-sm text-[#D4AF37] hover:text-[#f2ce5e] transition-colors flex items-center gap-2 mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        {t('viewPdf')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kết luận & Slogan */}
          <div
            ref={conclusionRef}
            className={`bg-[#D4AF37] text-zinc-950 p-12 md:text-center rounded-sm relative overflow-hidden transition-all duration-1000 ease-out ${isConclusionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
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