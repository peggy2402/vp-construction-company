"use client";

import { useEffect, useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Thêm state cho mobile menu
  const locale = useLocale();
  const tHome = useTranslations('Home');
  const tAbout = useTranslations('About');
  const tProjects = useTranslations('Projects');
  const tFooter = useTranslations('Footer');
  const tNews = useTranslations('News');
  const tDocs = useTranslations('Docs');
  
  // Dữ liệu Dự án nổi bật
  const projectItems = [
    { src: '/du-an-cao-toc-tuyen-quang-ha-giang-giai-doan1.jpg', alt: tHome('projectTuyenQuangAlt'), slug: 'du-an-cao-toc-tuyen-quang-ha-giang' },
    { src: '/du-an-cau-tinh-huc.jpg', alt: tHome('projectTinhHucAlt'), slug: 'du-an-cau-tinh-huc' }
  ];

  // Dữ liệu Hình ảnh công trường
  const constructionItems = [
    { src: '/du-an-cao-toc-tuyen-quang-ha-giang-giai-doan1.jpg', alt: tHome('constructionImage1') },
    { src: '/du-an-cau-tinh-huc.jpg', alt: tHome('constructionImage2') }
  ];

  // Dữ liệu Tài liệu liên quan (BẠN CÓ THỂ THÊM/SỬA LINK Ở ĐÂY)
  const documentItems = [
    { title: tDocs('docDegree'), type: 'PDF', size: '4363 KB', link: '/BANGCAP.pdf', iconColor: 'text-red-500' },
    { title: tDocs('docCalibration'), type: 'PDF', size: '8143 KB', link: '/HIEUCHUANTHIETBI.pdf', iconColor: 'text-red-500' },
    { title: tDocs('docContract1'), type: 'PDF', size: '3506 KB', link: '/HD1.pdf', iconColor: 'text-red-500' },
    { title: tDocs('docContract2'), type: 'PDF', size: '3724 KB', link: '/HD2.pdf', iconColor: 'text-blue-500' },
    { title: tDocs('docContract3'), type: 'PDF', size: '3719 KB', link: '/HD3.pdf', iconColor: 'text-blue-500' },
  ];

  // --- Scroll Animation Logic ---
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const whyRef = useRef(null);
  const newsRef = useRef(null);
  const docsRef = useRef(null); // Ref mới cho phần Tài liệu
  const projectsRef = useRef(null);

  const [isHeroVisible, setHeroVisible] = useState(false);
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [isWhyVisible, setWhyVisible] = useState(false);
  const [isNewsVisible, setNewsVisible] = useState(false);
  const [isDocsVisible, setDocsVisible] = useState(false); // State mới cho phần Tài liệu
  const [isProjectsVisible, setProjectsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setHeroVisible(true);
            if (entry.target === aboutRef.current) setAboutVisible(true);
            if (entry.target === whyRef.current) setWhyVisible(true);
            if (entry.target === newsRef.current) setNewsVisible(true);
            if (entry.target === docsRef.current) setDocsVisible(true); // Cập nhật state khi scroll tới
            if (entry.target === projectsRef.current) setProjectsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, aboutRef, whyRef, newsRef, docsRef, projectsRef].forEach(
      (ref) => ref.current && observer.observe(ref.current)
    );

    return () => observer.disconnect();
  }, []);

  // Xử lý scroll cho Header và nút Back to top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen relative">
      

      {/* --- HERO SECTION --- */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 max-w-[1400px] mx-auto px-4 lg:px-8 overflow-hidden">
        <div 
          ref={heroRef} 
          className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          
          {/* Background watermark */}
          <div className="absolute left-0 top-0 opacity-5 pointer-events-none z-0 overflow-hidden w-full">
            <h1 className="text-[60px] md:text-[80px] lg:text-[120px] font-black leading-none whitespace-nowrap">HOÀNG ANH</h1>
          </div>

          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-800 mb-4 sm:mb-6 leading-tight uppercase">
              {tHome('heroSubheading')}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {tAbout('intro2')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <span className="font-bold text-lg sm:text-xl">{tHome('serviceTestMaterial')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <span className="font-bold text-lg sm:text-xl">{tHome('serviceInspect')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gray-50 p-3 sm:p-2 rounded-3xl sm:rounded-full w-full sm:w-max shadow-sm border border-gray-100">
              <button className="w-full sm:w-auto bg-blue-800 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-900 transition uppercase tracking-wide text-sm sm:text-base whitespace-nowrap">
                {tHome('fastContact')}
              </button>
              <div className="flex items-center justify-center gap-2 pr-0 sm:pr-6 pb-2 sm:pb-0">
                <div className="bg-green-600 text-white p-2 shrink-0 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                </div>
                <span className="font-bold text-xl sm:text-2xl">{tFooter('phoneNumber')}</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition (Responsive version) */}
          <div className="w-full lg:w-1/2 relative h-[320px] sm:h-[450px] lg:h-[500px] mt-6 lg:mt-0">
             <div className="absolute right-0 top-0 w-[80%] h-[200px] sm:h-[280px] lg:h-[320px] bg-blue-100 rounded-lg overflow-hidden border-4 border-white shadow-xl rotate-2 z-10 transition-all duration-500 ease-out hover:scale-105 hover:-rotate-1 hover:z-30 cursor-pointer">
                <img src="/du-an-cao-toc-tuyen-quang-ha-giang-giai-doan1.jpg" className="w-full h-full object-cover" alt={tHome('constructionImage1')} />
             </div>
             <div className="absolute left-0 lg:left-auto lg:right-24 top-[100px] sm:top-[160px] lg:top-[180px] w-[80%] h-[200px] sm:h-[280px] lg:h-[320px] bg-gray-200 rounded-lg overflow-hidden border-4 border-blue-800 shadow-xl z-20 transition-all duration-500 ease-out hover:scale-105 hover:z-30 cursor-pointer">
                <img src="/du-an-cau-tinh-huc.jpg" className="w-full h-full object-cover" alt={tHome('constructionImage2')} />
             </div>
          </div>
        </div>
      </section>

      {/* --- VỀ SÔNG HỒNG --- */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div 
          ref={aboutRef}
          className={`max-w-[1400px] mx-auto px-4 lg:px-8 transition-all duration-1000 ease-out delay-100 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionTitle title={tAbout('title')} />
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 sm:mt-10">
            <div className="w-full lg:w-1/2 space-y-4 text-gray-700 text-justify text-sm sm:text-base">
              <p>{tAbout('intro1_part1')}</p>
              <p>{tAbout('intro1_part2')}</p>
              <p>{tAbout('intro1_part3')}</p>
              <p>{tAbout('intro2')}</p>
            </div>
            <div className="w-full lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop" alt="Công trình xây dựng" className="w-full h-auto object-cover rounded shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* --- LÝ DO NÊN CHỌN & HÌNH ẢNH --- */}
      <section className="py-12 sm:py-16">
        <div 
          ref={whyRef}
          className={`max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 transition-all duration-1000 ease-out delay-100 ${isWhyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Lý do */}
          <div className="w-full lg:w-1/2">
            <SectionTitle title={tHome('whyChooseUs')} align="left" />
            <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
              <div>
                <h4 className="text-red-600 font-bold text-base sm:text-lg uppercase flex items-center gap-2">
                  <span className="text-xl">—</span> {tHome('reason1Title')}
                </h4>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">{tHome('reason1Desc')}</p>
              </div>
              <div>
                <h4 className="text-red-600 font-bold text-base sm:text-lg uppercase flex items-center gap-2">
                  <span className="text-xl">—</span> {tHome('reason2Title')}
                </h4>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">{tHome('reason2Desc')}</p>
              </div>
            </div>
          </div>
          
          {/* Hình ảnh công trường */}
          <div className="w-full lg:w-1/2 overflow-hidden">
             <SectionTitle title={tHome('constructionImages')} align="left" />
             
             {/* Lưới Hình ảnh công trường */}
             <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {constructionItems.map((item, i) => (
                  <div key={i} className="aspect-[4/3] rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <img src={item.src} className="w-full h-full object-cover hover:scale-105 transition-transform" alt={item.alt} />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- TIN TỨC NỔI BẬT --- */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div 
          ref={newsRef}
          className={`max-w-[1400px] mx-auto px-4 lg:px-8 transition-all duration-1000 ease-out delay-100 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionTitle title={tNews('title')} />
          
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Tin 1 */}
            <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop" className="w-full h-48 sm:h-56 object-cover" alt="Tin tức" />
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm uppercase line-clamp-2">{tNews('news1Title')}</h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{tNews('news1Desc')}</p>
              </div>
            </div>
            {/* Tin 2 */}
            <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=600&auto=format&fit=crop" className="w-full h-48 sm:h-56 object-cover" alt="Tin tức" />
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm uppercase line-clamp-2">{tNews('news2Title')}</h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{tNews('news2Desc')}</p>
              </div>
            </div>
            {/* Tin 3 */}
            <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop" className="w-full h-48 sm:h-56 object-cover" alt="Tin tức" />
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm uppercase line-clamp-2">{tNews('news3Title')}</h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{tNews('news3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CÁC TÀI LIỆU LIÊN QUAN (MỚI BỔ SUNG) --- */}
      <section className="py-12 sm:py-16 bg-white">
        <div 
          ref={docsRef}
          className={`max-w-[1400px] mx-auto px-4 lg:px-8 transition-all duration-1000 ease-out delay-100 ${isDocsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionTitle title={tDocs('title')} />
          
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {documentItems.map((doc, i) => (
              <a href={doc.link} key={i} className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 ${doc.iconColor}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-center mb-2 line-clamp-2">{doc.title}</h3>
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium bg-gray-100 px-2 py-1 rounded">{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
                <div className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  {tDocs('download')} 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SLIDER DỰ ÁN NỔI BẬT --- */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div 
          ref={projectsRef}
          className={`max-w-[1400px] mx-auto px-4 lg:px-8 transition-all duration-1000 ease-out delay-100 ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionTitle title={tProjects('title')} />
          
          {/* Lưới Dự án đã thực hiện */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectItems.map((item, i) => (
              <Link href={`/${locale}/projects/${item.slug}`} key={i} className="block aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer border border-gray-100">
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out" 
                  alt={item.alt} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 className="text-white text-xl sm:text-2xl font-bold drop-shadow-md">{item.alt}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FLOATING ACTION BUTTONS --- */}
      <div className="fixed bottom-6 right-4 md:bottom-10 md:right-6 flex flex-col gap-3 z-[99]">
        <a href="https://zalo.me/0383886368" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition pointer-events-auto">
          <span className="font-bold text-xs sm:text-sm">Zalo</span>
        </a>
        <a href={`tel:${tFooter('phoneNumber')}`} className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition animate-bounce pointer-events-auto">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
        </a>
        {scrolled && (
          <button onClick={scrollToTop} className="w-8 h-8 sm:w-10 sm:h-10 mt-2 sm:mt-4 bg-gray-500/50 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
        )}
      </div>

    </div>
  );
}

// Component nhỏ hỗ trợ render tiêu đề Section có viền trang trí
function SectionTitle({ title, align = 'center' }: { title: string, align?: 'center' | 'left' }) {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 uppercase tracking-wide">
        {title}
      </h2>
      <div className="flex items-center gap-2 mt-2 sm:mt-3">
         <div className="h-[1px] w-8 sm:w-12 bg-gray-300"></div>
         <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border border-gray-400 rotate-45"></div>
         <div className="h-[1px] w-8 sm:w-12 bg-gray-300"></div>
      </div>
    </div>
  );
}