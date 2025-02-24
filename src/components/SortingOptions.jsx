import React from 'react';
    import { useTranslation } from 'react-i18next';

    function SortingOptions({ onSortChange }) {
      const { t } = useTranslation();

      return (
        <div className="mb-4">
          <label htmlFor="sort" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">{t('sortBy')}:</label>
          <select
            id="sort"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">{t('relevance')}</option>
            <option value="priceLowToHigh">{t('priceLowToHigh')}</option>
            <option value="priceHighToLow">{t('priceHighToLow')}</option>
          </select>
        </div>
      );
    }

    export default SortingOptions;
