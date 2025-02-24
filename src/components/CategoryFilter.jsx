import React from 'react';
    import { useTranslation } from 'react-i18next';

    function CategoryFilter({ categories, onCategoryChange }) {
      const { t } = useTranslation();

      return (
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">{t('category')}:</label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{t(category)}</option>
            ))}
          </select>
        </div>
      );
    }

    export default CategoryFilter;
