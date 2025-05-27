
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { Crop } from '@/pages/CropsPage';

interface CropsListProps {
  crops: Crop[];
  onAddCrop: () => void;
  onViewCrop: (crop: Crop) => void;
}

const CropsList = ({ crops, onAddCrop, onViewCrop }: CropsListProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-green-800">{t.myCrops}</h1>
        </div>

        {/* Add Crop Button */}
        <Button
          onClick={onAddCrop}
          className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-xl"
          size="lg"
        >
          <Plus className="w-6 h-6 mr-2" />
          {t.addCrop}
        </Button>

        {/* Crops Grid */}
        {crops.length === 0 ? (
          <div className="text-center py-12 text-green-600">
            <p className="text-lg">{t.addCrop} to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {crops.map((crop) => (
              <Card key={crop.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-green-800 mb-2">
                      {t[crop.nameKey as keyof typeof t] as string}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 border-green-300 hover:bg-green-50"
                      onClick={() => onViewCrop(crop)}
                    >
                      {t.viewDetails}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsList;
