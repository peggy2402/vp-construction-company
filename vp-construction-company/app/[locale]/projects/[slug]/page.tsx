import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string; locale: string };
};

// Mock data for projects (in a real app, this would come from a database/CMS)
const getProjectDetails = async (slug: string, locale: string) => {
  const projectsData = [
    {
      slug: 'the-onyx-tower',
      titleKey: 'project1Title',
      descriptionKey: 'project1Description',
      typeKey: 'Commercial',
      mainImage: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1506937510043-871b99b9e8a7?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523217592521-0492c24e2db1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop',
      ],
      details: {
        location: 'Trung tâm thành phố',
        client: 'Tập đoàn ABC',
        area: '50,000 m²',
        year: '2023',
      },
    },
    {
      slug: 'lumina-residences',
      titleKey: 'project2Title',
      descriptionKey: 'project2Description',
      typeKey: 'Residential',
      mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1570129477490-ba5b66970172?q=80&w=2070&auto=format&fit=crop',
      ],
      details: {
        location: 'Khu đô thị mới',
        client: 'Công ty Bất động sản XYZ',
        area: '30,000 m²',
        year: '2022',
      },
    },
    // Add details for other projects here
  ];

  const projectData = projectsData.find(p => p.slug === slug);
  if (!projectData) return null;

  // Fetch translations on the server
  const t = await getTranslations({ locale, namespace: 'Projects' });

  return {
    ...projectData,
    title: t(projectData.titleKey as any),
    description: t(projectData.descriptionKey as any),
    type: t(projectData.typeKey as any),
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectDetails(params.slug, params.locale);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.mainImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectDetails(params.slug, params.locale);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      <header className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden pt-24">
        <Image
          src={project.mainImage}
          alt={project.title}
          fill
          className="object-cover z-0 opacity-70"
          priority
        />
        <div className="absolute inset-0 z-10 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#D4AF37] tracking-[0.35em] text-sm md:text-base font-semibold mb-4 uppercase drop-shadow-lg font-sans">
            {project.type}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl font-sans">
            {project.title}
          </h1>
        </div>
      </header>

      <section className="py-20 bg-zinc-900 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">Tổng quan dự án</h2>
              <p className="text-zinc-300 font-serif text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-zinc-400 font-serif">
                <div><strong>Địa điểm:</strong> {project.details.location}</div>
                <div><strong>Khách hàng:</strong> {project.details.client}</div>
                <div><strong>Diện tích:</strong> {project.details.area}</div>
                <div><strong>Năm hoàn thành:</strong> {project.details.year}</div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-6">Thư viện ảnh</h2>
              <div className="grid grid-cols-1 gap-4">
                {project.gallery.map((imgSrc, index) => (
                  <Image
                    key={index}
                    src={imgSrc}
                    alt={`${project.title} - Gallery ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-sm shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
