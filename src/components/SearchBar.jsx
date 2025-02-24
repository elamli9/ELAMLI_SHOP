import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative flex items-center">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        id="search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchBar;
