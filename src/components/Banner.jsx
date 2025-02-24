import React from 'react';
import { useTranslation } from 'react-i18next';

function Banner({ scrollToProducts, bannerImageUrl, accentColor }) {
  const { t } = useTranslation();

  const bannerStyle = {
    backgroundImage: `url(${bannerImageUrl || 'https://via.placeholder.com/1200x400'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: accentColor || '#007bff',
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div className="relative text-white rounded-lg shadow-md mb-8 overflow-hidden" style={bannerStyle}>
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4">{t('bannerTitle')}</h2>
        <p className="text-xl">{t('bannerSubtitle')}</p>
        <button onClick={scrollToProducts} className={`mt-6 font-bold py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline`} style={buttonStyle}>
          {t('bannerButton')}
        </button>
      </div>
    </div>
  );
}

export default Banner;
