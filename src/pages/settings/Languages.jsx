import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/layout/Button';

function Languages() {
  const { i18n } = useTranslation();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.body.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div>
      <Button type="primary" onClick={() => switchLanguage('en')}>
        English
      </Button>
      <Button type="primary" onClick={() => switchLanguage('fa')}>
        فارسی
      </Button>
    </div>
  );
}

export default Languages;
