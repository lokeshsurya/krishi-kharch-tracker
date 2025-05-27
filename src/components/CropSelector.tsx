import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Crop } from '@/pages/CropsPage';

interface CropSelectorProps {
  onCropSelect: (crop: Crop) => void;
  onBack: () => void;
}

const CropSelector = ({ onCropSelect, onBack }: CropSelectorProps) => {
  const { t } = useLanguage();

  const availableCrops: Omit<Crop, 'id'>[] = [
    {
      name: 'Tomato',
      nameKey: 'tomato',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
      expenses: []
    },
    {
      name: 'Onion',
      nameKey: 'onion',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=300&fit=crop',
      expenses: []
    },
    {
      name: 'Potato',
      nameKey: 'potato',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      expenses: []
    },
    {
      name: 'Rice',
      nameKey: 'rice',
      image: 'https://images.unsplash.com/photo-1569686214164-a3a9ec7c7e1f?w=400&h=300&fit=crop',
      expenses: []
    },
    {
      name: 'Wheat',
      nameKey: 'wheat',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      expenses: []
    },
    {
      name: 'Corn',
      nameKey: 'corn',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
      expenses: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-green-800">{t.selectCrop}</h1>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-2 gap-4">
          {availableCrops.map((crop) => (
            <Card
              key={crop.name}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={() => onCropSelect(crop as Crop)}
            >
              <CardContent className="p-0">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-green-800">
                    {t[crop.nameKey as keyof typeof t] as string}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropSelector;
