import React from 'react';
import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">{t('privacyPolicy')}</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {t('privacyPolicyContent')}
      </p>
    </div>
  );
}

export default PrivacyPolicy;
