import React from 'react';
    import { useTranslation } from 'react-i18next';
    import { Link } from 'react-router-dom';

    function Footer() {
      const { t } = useTranslation();

      return (
        <footer className="bg-gray-200 dark:bg-gray-800 py-4 mt-8">
          <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('socialMedia.facebook')}</a>
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('socialMedia.twitter')}</a>
              <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('socialMedia.instagram')}</a>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 dark:text-gray-300">{t('contactUs')}: <a href="mailto:info@example.com" className="hover:text-primary">info@example.com</a></p>
            </div>
            <div className="mt-2">
              <Link to="/about" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('aboutUs')}</Link> | <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('privacyPolicy')}</a> | <a href="#" className="text-gray-500 dark:text-gray-300 hover:text-primary">{t('termsOfService')}</a>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 dark:text-gray-300">&copy; {new Date().getFullYear()} {t('websiteTitle')}. {t('allRightsReserved')}.</p>
            </div>
          </div>
        </footer>
      );
    }

    export default Footer;
