"use client";

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const tFooter = useTranslations('Footer');

  // --- Scroll Animation Logic ---
  const introRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [isIntroVisible, setIntroVisible] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  
  // --- Form State ---
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === introRef.current) setIntroVisible(true);
            if (entry.target === infoRef.current) setInfoVisible(true);
            if (entry.target === formRef.current) setFormVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    [introRef, infoRef, formRef].forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({ status: 'success', message: 'Tin nhắn đã được gửi thành công!' });
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setFormState({ status: 'error', message: errorData.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.' });
      }
    } catch (error) {
      setFormState({ status: 'error', message: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    }
  };



  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen selection:bg-[#D4AF37] selection:text-zinc-900">
      {/* --- HERO SECTION --- */}
      <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587560699334-cc4ff6349094?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 z-10 bg-slate-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-2xl font-sans">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-serif leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-20 bg-zinc-900 relative z-20 overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          {/* Intro Text */}
          <div
            ref={introRef}
            className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ease-out ${
              isIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-zinc-400 font-serif text-lg leading-relaxed">
              {t('intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div
              ref={infoRef}
              className={`lg:col-span-5 bg-zinc-800/30 border border-white/5 p-8 md:p-12 rounded-sm transition-all duration-1000 ease-out ${
                isInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-2xl font-bold tracking-[0.1em] text-white mb-8 uppercase font-sans">{t('infoTitle')}</h2>
              <div className="space-y-6 font-serif text-zinc-300">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tFooter('nghean')}</h3>
                    <p className="text-sm text-zinc-400">{tFooter('addressNgheAn')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tFooter('phone')}</h3>
                    <a href={`tel:${tFooter('phoneNumber')}`} className="text-sm text-zinc-400 hover:text-[#D4AF37] transition-colors">{tFooter('phoneNumber')}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tFooter('email')}</h3>
                    <a href={`mailto:${tFooter('emailAddress')}`} className="text-sm text-zinc-400 hover:text-[#D4AF37] transition-colors">{tFooter('emailAddress')}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              ref={formRef}
              className={`lg:col-span-7 transition-all duration-1000 ease-out delay-200 ${
                isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="text-2xl font-bold tracking-[0.1em] text-white mb-8 uppercase font-sans">{t('formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Floating Label Input: Name */}
                  <div className="relative z-0">
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="peer block w-full appearance-none border-0 border-b-2 border-zinc-600 bg-transparent py-2.5 px-0 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0" placeholder=" " />
                    <label htmlFor="name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#D4AF37]">
                      {t('formName')}
                    </label>
                  </div>
                  {/* Floating Label Input: Email */}
                  <div className="relative z-0">
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="peer block w-full appearance-none border-0 border-b-2 border-zinc-600 bg-transparent py-2.5 px-0 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0" placeholder=" " />
                    <label htmlFor="email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#D4AF37]">
                      {t('formEmail')}
                    </label>
                  </div>
                </div>
                {/* Floating Label Input: Phone */}
                <div className="relative z-0">
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="peer block w-full appearance-none border-0 border-b-2 border-zinc-600 bg-transparent py-2.5 px-0 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0" placeholder=" " />
                  <label htmlFor="phone" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#D4AF37]">
                    {t('formPhone')}
                  </label>
                </div>
                {/* Floating Label Textarea: Message */}
                <div className="relative z-0 pt-4">
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} required className="peer block w-full appearance-none border-0 border-b-2 border-zinc-600 bg-transparent py-2.5 px-0 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-0" placeholder=" "></textarea>
                  <label htmlFor="message" className="absolute top-7 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#D4AF37]">
                    {t('formMessage')}
                  </label>
                </div>
                <div>
                  <button type="submit" disabled={formState.status === 'loading'} className="group relative mt-4 w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#b5952f] text-zinc-950 font-bold tracking-[0.15em] text-[13px] transition-all duration-300 overflow-hidden disabled:bg-zinc-500 disabled:cursor-not-allowed">
                    <span className="relative z-10">{formState.status === 'loading' ? 'ĐANG GỬI...' : t('formButton')}</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  </button>
                </div>
                {formState.message && (
                  <p className={`mt-4 text-sm ${formState.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {formState.message}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <iframe
            className="w-full h-[400px] rounded-sm"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.999393791771!2d105.7001946758838!3d18.66472096578059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139ceb80a23846d%3A0x20f330548d1e338d!2zMTcgS2hhdSBEZSwgVHLGsOG7nW5nIFRoaSwgVHAuIFZpbmgsIE5naOG7hyBBbg!5e0!3m2!1svi!2s!4v1721290000000!5m2!1svi!2s"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ trụ sở công ty Hoàng Anh"
          ></iframe>
        </div>
      </section>
    </div>
  );
}