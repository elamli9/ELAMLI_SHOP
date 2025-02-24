import { useState, useEffect } from 'react';
    import i18n from '../i18n';

    function useLanguage() {
      const [language, setLanguage] = useState(i18n.language);

      useEffect(() => {
        i18n.changeLanguage(language);
        document.body.dir = i18n.dir();
      }, [language]);

      return [language, setLanguage];
    }

    export default useLanguage;
