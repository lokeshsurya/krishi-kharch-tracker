
import { Sprout, Users, Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { t, language, selectLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleCropsClick = () => {
    console.log('Navigating to My Crops');
    navigate('/crops');
  };

  const handleLaborClick = () => {
    console.log('Navigating to My Labor');
    navigate('/labor');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'mr' : 'en';
    selectLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Language Switch */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              {t.welcome}
            </h1>
            <p className="text-lg text-green-600">
              {t.chooseAction}
            </p>
          </div>
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="icon"
            className="ml-4 border-green-300 text-green-700 hover:bg-green-50"
          >
            <Languages className="w-5 h-5" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <button
            onClick={handleCropsClick}
            className="w-full bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-green-100 group-hover:bg-green-200 rounded-full p-4 transition-colors duration-200">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-2xl font-semibold text-green-800">
                {t.myCrops}
              </span>
            </div>
          </button>

          <button
            onClick={handleLaborClick}
            className="w-full bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-300 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-green-100 group-hover:bg-green-200 rounded-full p-4 transition-colors duration-200">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-2xl font-semibold text-green-800">
                {t.myLabor}
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-green-600">
          <p className="text-sm">FarmAssist v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
