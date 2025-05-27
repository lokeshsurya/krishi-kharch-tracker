
import { Language } from '@/types/language';
import { translations } from '@/types/language';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            {translations.en.greeting}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {translations.en.selectLanguage}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onLanguageSelect('en')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            {translations.en.english}
          </button>
          
          <button
            onClick={() => onLanguageSelect('mr')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            {translations.en.marathi}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
