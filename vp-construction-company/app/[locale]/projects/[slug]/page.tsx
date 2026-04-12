import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// Mock data for projects (in a real app, this would come from a database/CMS)
const getProjectDetails = async (slug: string, locale: string) => {
  const projectsData = [
    {
      slug: 'du-an-cao-toc-tuyen-quang-ha-giang',
      titleKey: 'projectTuyenQuangTitle',
      descriptionKey: 'projectTuyenQuangDesc',
      typeKey: 'Industrial',
      mainImage: '/du-an-cao-toc-tuyen-quang-ha-giang-giai-doan1.jpg',
      gallery: [
        '/du-an-cao-toc-tuyen-quang-ha-giang-giai-doan1.jpg',
      ],
      details: {
        location: 'Tuyên Quang - Hà Giang',
        client: 'Ban QLDA',
        area: 'Quy mô lớn',
        year: '2024',
      },
    },
    {
      slug: 'du-an-cau-tinh-huc',
      titleKey: 'projectTinhHucTitle',
      descriptionKey: 'projectTinhHucDesc',
      typeKey: 'Commercial',
      mainImage: '/du-an-cau-tinh-huc.jpg',
      gallery: [
        '/du-an-cau-tinh-huc.jpg',
      ],
      details: {
        location: 'Tuyên Quang',
        client: 'UBND Tỉnh Tuyên Quang',
        area: 'Quy mô lớn',
        year: '2023',
      },
    },
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
  const { slug, locale } = await params;
  const project = await getProjectDetails(slug, locale);

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
  const { slug, locale } = await params;
  const project = await getProjectDetails(slug, locale);

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
