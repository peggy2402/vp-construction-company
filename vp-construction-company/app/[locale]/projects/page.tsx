"use client";

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Custom hook for Intersection Observer
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
        observer.current?.unobserve(entry.target);
      }
    }, options);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry?.isIntersecting];
};


export default function ProjectsPage() {
  const t = useTranslations('Home');
  const tProjects = useTranslations('Projects');
  const tPagination = useTranslations('Pagination');
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4; // Hiển thị 4 dự án mỗi trang

  // This would typically come from a CMS or database
  const allProjects = [
    { id: 1, slug: 'the-onyx-tower', title: tProjects('project1Title'), type: "Commercial", image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, slug: 'lumina-residences', title: tProjects('project2Title'), type: "Residential", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop" },
    { id: 3, slug: 'horizon-industrial-park', title: tProjects('project3Title'), type: "Industrial", image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?q=80&w=1200&auto=format&fit=crop" },
    { id: 4, slug: 'glass-pavilion-gallery', title: tProjects('project4Title'), type: "Renovation", image: "https://nhomkinhgiathai.vn/wp-content/uploads/2024/10/IMG_1113.jpg" },
    // Add more projects here
    { id: 5, slug: 'the-vertex-plaza', title: tProjects('project5Title'), type: "Commercial", image: "https://tse1.mm.bing.net/th/id/OIP.Z3ZoNaVZxpMyUsALpnfM9AHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 6, slug: 'serenity-gardens', title: tProjects('project6Title'), type: "Residential", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop" },
    { id: 7, slug: 'project-7', title: t('project1Title'), type: "Commercial", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop" },
    { id: 8, slug: 'project-8', title: t('project2Title'), type: "Residential", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
  ];

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506937510043-871b99b9e8a7?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-10 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl font-sans">
            {tProjects('title')}
          </h1>
          <p className="text-lg text-zinc-300 font-serif max-w-3xl mx-auto">{tProjects('subtitle')}</p>
        </div>
      </header>

      <section className="py-20 md:py-28 bg-zinc-950 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full mb-16">
            {currentProjects.map((project, index) => {
              const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
              return (
                <Link
                  key={project.id}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <div
                    ref={ref as any}
                    className={`h-full w-full transition-all duration-1000 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-2 block drop-shadow-md">{tProjects(project.type as any)}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center space-x-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tPagination('previous')}
              </button>
              <span className="text-zinc-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tPagination('next')}
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}