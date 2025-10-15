import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/layout/Button';
import DateInput from '../../components/common/DateInput';

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
    <div className="flex gap-5">
      <Button type="primary" onClick={() => switchLanguage('en')}>
        English
      </Button>
      <Button type="primary" onClick={() => switchLanguage('fa')}>
        فارسی
      </Button>
      <DateInput />
    </div>
  );
}

export default Languages;
