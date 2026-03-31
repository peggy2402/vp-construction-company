
"use client";

import { useTranslations } from 'next-intl';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavigationLink } from './NavigationLink';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-white text-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ABOUT US */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">{t('aboutUs')}</h3>
            <p className="text-sm text-gray-600">
              {t('aboutUsText')}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><NavigationLink href="/about">{t('linkAbout')}</NavigationLink></li>
              <li><NavigationLink href="/services">{t('linkServices')}</NavigationLink></li>
              <li><NavigationLink href="/projects">{t('linkProjects')}</NavigationLink></li>
              <li><NavigationLink href="/contact">{t('linkContact')}</NavigationLink></li>
            </ul>
          </div>

          {/* TUYENQUANG HEADQUARTERS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">{t('nghean')}</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>{t('addressNgheAn')}</p>
              <p><strong>{t('phone')}:</strong> {t('phoneNumber')}</p>
              <p><strong>{t('fax')}:</strong> {t('faxNumber')}</p>
              <p><strong>{t('email')}:</strong> {t('emailAddress')}</p>
            </div>
          </div>

          {/* CENTRAL REPRESENTATIVE OFFICE */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider uppercase">{t('central')}</h3>
            <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{t('addressVPGD1')}</strong></p>
                <p>{t('addressVPGD1NgheAn')}</p>
                <p><strong>{t('addressVPGD2')}</strong></p>
                <p>{t('addressVPGD2TuyenQuang')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500"><FaLinkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-red-600"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><FaYoutube size={20} /></a>
            </div>
          <p className="text-sm text-gray-500 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>

      </div>
    </footer>
  );
}
