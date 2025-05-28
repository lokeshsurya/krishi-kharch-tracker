import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        {t('home.title', 'Free Farming Expense Tracker for Indian Farmers')}
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            {t('home.aboutTitle', 'Simple Farm Budget Tracker')}
          </h2>
          <p className="mb-4">
            {t('home.about', 'Our Farming Expense Tracker helps Indian farmers easily manage their agricultural costs. Track expenses for seeds, fertilizers, labor, and equipment - all in one place. Perfect for both small and large farms.')}
          </p>
          <p className="mb-4">
            {t('home.features', 'This agriculture expense management tool is designed specifically for Indian farmers, with a simple interface that works in both English and Marathi. Our Kisan Kharcha App makes farm accounting easy.')}
          </p>
        </section>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            {t('home.benefitsTitle', 'Benefits of Our Farming Expense Tracker')}
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('home.benefit1', 'Easy crop-wise expense tracking')}</li>
            <li>{t('home.benefit2', 'Track labor costs and activities')}</li>
            <li>{t('home.benefit3', 'Works offline - no internet needed')}</li>
            <li>{t('home.benefit4', 'Free Marathi farmer tool')}</li>
            <li>{t('home.benefit5', 'Simple icon-based interface')}</li>
          </ul>
        </section>
      </div>

      <section className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          {t('home.startTitle', 'Start Using Our Free Farm Budget Tracker Today')}
        </h2>
        <p className="mb-4">
          {t('home.start', 'Join thousands of Indian farmers who use our Farming Expense Tracker to manage their agricultural costs better.')}
        </p>
      </section>
    </div>
  );
}
