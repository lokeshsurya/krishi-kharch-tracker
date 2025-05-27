
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import CropsList from '@/components/CropsList';
import CropSelector from '@/components/CropSelector';
import CropDetailsForm from '@/components/CropDetailsForm';
import CropDetailsView from '@/components/CropDetailsView';

export interface Expense {
  id: string;
  category: string;
  date: Date;
  amount: number;
  notes?: string;
}

export interface Crop {
  id: string;
  name: string;
  nameKey: string;
  image: string;
  season?: string;
  plantationDate?: Date;
  expectedHarvestDate?: Date;
  expenses: Expense[];
}

const CropsPage = () => {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'selector' | 'details' | 'view'>('list');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const handleAddCrop = () => {
    setCurrentView('selector');
  };

  const handleCropSelect = (crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentView('details');
  };

  const handleViewCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentView('view');
  };

  const handleSaveCrop = (cropData: Crop) => {
    setCrops(prev => [...prev, { ...cropData, id: Date.now().toString(), expenses: [] }]);
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleSkip = () => {
    if (selectedCrop) {
      setCrops(prev => [...prev, { ...selectedCrop, id: Date.now().toString(), expenses: [] }]);
    }
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleUpdateCrop = (updatedCrop: Crop) => {
    setCrops(prev => prev.map(crop => 
      crop.id === updatedCrop.id ? updatedCrop : crop
    ));
    setSelectedCrop(updatedCrop);
  };

  if (currentView === 'selector') {
    return <CropSelector onCropSelect={handleCropSelect} onBack={handleBackToList} />;
  }

  if (currentView === 'details' && selectedCrop) {
    return (
      <CropDetailsForm
        crop={selectedCrop}
        onSave={handleSaveCrop}
        onSkip={handleSkip}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'view' && selectedCrop) {
    return (
      <CropDetailsView
        crop={selectedCrop}
        onUpdate={handleUpdateCrop}
        onBack={handleBackToList}
      />
    );
  }

  return <CropsList crops={crops} onAddCrop={handleAddCrop} onViewCrop={handleViewCrop} />;
};

export default CropsPage;
