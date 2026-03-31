// This is a dynamic page for a single news article.

// You can generate metadata dynamically based on the article slug
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server'; // Correct import
type Props = {
  params: {
    slug?: string;
    locale?: string;
  };
};
function formatSlug(slug?: string) {
  if (!slug) return 'News';

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params; 

  const formattedTitle = (slug ?? 'news')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const article = {
    title: formattedTitle,
    description: `Detailed information about ${formattedTitle}`,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
  };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://hoanganhgroup.vercel.app';

  const url = `${siteUrl}/${locale}/news/${slug}`;

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: 'article',
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return <div>Loading...</div>; // Or a not-found component
  }

  const t = await getTranslations('News');

  const formattedTitle = formatSlug(slug);

  // In a real app, you would fetch the full article content here
  const articleContent = {
    title: formattedTitle,
    author: 'Hoang Anh Group', // This could also be dynamic
    publishedDate: new Date().toLocaleDateString('vi-VN'),
    content: `
      <p>Đây là đoạn mở đầu cho bài viết về <strong>${params.slug}</strong>. Nội dung này sẽ được lấy từ một CMS hoặc database trong một ứng dụng thực tế.</p>
      <p>Trong một ứng dụng thực tế, bạn sẽ sử dụng slug "${params.slug}" để truy vấn cơ sở dữ liệu và lấy ra nội dung bài viết tương ứng, bao gồm cả văn bản, hình ảnh, và các định dạng khác.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
      <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop" alt="Article image" class="my-8 rounded-md" />
      <h2>Một tiêu đề phụ</h2>
      <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
    `,
  };

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32">
        <article className="prose lg:prose-xl prose-zinc">
          <h1>{articleContent.title}</h1>
          <div className="text-sm text-zinc-500 mb-8">
            <span>Đăng bởi {articleContent.author}</span> | <span>{articleContent.publishedDate}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: articleContent.content }} />
        </article>
      </div>
    </div>
  );
}