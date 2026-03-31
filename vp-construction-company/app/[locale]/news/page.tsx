"use client";

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function NewsListPage() {
  const t = useTranslations('News');
  const tPagination = useTranslations('Pagination');
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // Số bài viết trên mỗi trang

  // In a real app, this data would come from a CMS or database
  const articles = [
    {
      slug: 'khoi-cong-du-an-the-onyx-tower',
      title: 'Khởi công dự án The Onyx Tower',
      excerpt: 'Hoang Anh Group chính thức khởi công dự án phức hợp thương mại The Onyx Tower, hứa hẹn trở thành biểu tượng mới của thành phố.',
      date: '2024-07-15',
      category: 'Dự án',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
    },
    {
      slug: 'ap-dung-cong-nghe-xay-dung-xanh',
      title: 'Áp dụng công nghệ xây dựng xanh trong các dự án mới',
      excerpt: 'Chúng tôi cam kết phát triển bền vững bằng việc áp dụng các công nghệ và vật liệu thân thiện với môi trường.',
      date: '2024-07-10',
      category: 'Công nghệ',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
    },
    {
      slug: 'hoan-thanh-khu-dan-cu-lumina',
      title: 'Hoàn thành và bàn giao khu dân cư Lumina Residences',
      excerpt: 'Dự án Lumina Residences đã chính thức được bàn giao cho cư dân, mang đến một không gian sống đẳng cấp và hiện đại.',
      date: '2024-07-01',
      category: 'Dự án',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    },
    {
      slug: 'hoi-thao-an-toan-lao-dong',
      title: 'Hội thảo An toàn lao động trong xây dựng',
      excerpt: 'Buổi hội thảo nhằm nâng cao nhận thức và kỹ năng về an toàn lao động cho toàn thể cán bộ công nhân viên.',
      date: '2024-06-20',
      category: 'Sự kiện',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2132&auto=format&fit=crop',
    },
  ];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  // Filtering and Sorting Logic
  const filteredAndSortedArticles = useMemo(() => {
    let articlesResult = [...articles];

    // Filter by category
    if (selectedCategory !== 'All') {
      articlesResult = articlesResult.filter(a => a.category === selectedCategory);
    }

    // Sort by date
    articlesResult.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return articlesResult;
  }, [selectedCategory, sortOrder, articles]);

  // Pagination logic on filtered data
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredAndSortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      <header className="bg-zinc-950 border-b border-white/10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-zinc-300 font-serif max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </header>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold mr-2 text-zinc-300">{t('allCategories')}:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category ? 'bg-[#D4AF37] text-zinc-900 font-semibold' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-semibold text-zinc-300">{t('sortBy')}:</label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-1.5 border border-zinc-700 bg-zinc-800 text-zinc-200 rounded-md text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              >
                <option value="newest">{t('newest')}</option>
                <option value="oldest">{t('oldest')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {currentArticles.map((article, index) => (
              <Link key={article.slug} href={`/${locale}/news/${article.slug}`} className="group flex flex-col">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-zinc-400 mb-2">{new Date(article.date).toLocaleDateString(locale)}</p>
                  <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-zinc-400 font-serif text-base leading-relaxed mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto">
                    <span className="font-bold text-sm text-[#D4AF37] tracking-wider">
                      {t('readMore')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="flex justify-center items-center space-x-2 mt-10">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-zinc-700 rounded-md text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tPagination('previous')}
              </button>
              {renderPageNumbers().map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border border-zinc-700 rounded-md ${currentPage === number ? 'bg-[#D4AF37] text-zinc-900 font-bold' : 'text-zinc-300 hover:bg-zinc-800'}`}
                >
                  {number}
                </button>
              ))}
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