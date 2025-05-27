
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSelector from '@/components/LanguageSelector';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { isLanguageSelected, selectLanguage } = useLanguage();

  if (!isLanguageSelected) {
    return <LanguageSelector onLanguageSelect={selectLanguage} />;
  }

  return <Dashboard />;
};

export default Index;
