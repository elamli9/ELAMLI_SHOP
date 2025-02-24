import { useState, useEffect } from 'react';

    function useDarkMode() {
      const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);

      useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode.toString());
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDarkMode]);

      return [isDarkMode, setIsDarkMode];
    }

    export default useDarkMode;
