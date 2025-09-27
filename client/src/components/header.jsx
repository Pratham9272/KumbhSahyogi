import { useLanguage } from '@/hooks/use-language';

export default function Header({ onSOSClick }) {
  const { t, toggleLanguage } = useLanguage();

  return (
    <header className="bg-white shadow-lg border-b-2 border-kumbh-orange sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-kumbh-orange text-white p-2 rounded-full">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 9.5V11.5L21 9ZM3 9L9 11.5V9.5L3 7V9ZM12 7.5C12.8 7.5 13.5 8.2 13.5 9S12.8 10.5 12 10.5 10.5 9.8 10.5 9 11.2 7.5 12 7.5Z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-kumbh-text" data-testid="app-title">
                {t('app.title')}
              </h1>
              <p className="text-sm text-gray-600 font-devanagari hidden sm:block" data-testid="app-subtitle">
                {t('app.subtitle.hindi')}
              </p>
            </div>
          </div>

          {/* Language Toggle and SOS */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="bg-kumbh-light text-kumbh-text px-3 py-1 rounded-full text-sm font-medium border border-kumbh-orange hover:bg-kumbh-orange hover:text-white transition-colors"
              data-testid="button-language-toggle"
            >
              {t('nav.language')}
            </button>
            
            <button 
              onClick={onSOSClick}
              className="sos-pulse bg-kumbh-emergency text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-red-600 transition-all"
              data-testid="button-sos-header"
            >
              {t('nav.sos')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
