import { useLanguage } from '@/hooks/useLanguage';
import { useState, useEffect } from 'react';
import CropsList from '@/components/CropsList';
import CropSelector from '@/components/CropSelector';
import CropDetailsForm from '@/components/CropDetailsForm';
import CropDetailsView from '@/components/CropDetailsView';
import { getCrops, saveCrops } from '@/lib/storage';

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

  // Load saved crops on mount
  useEffect(() => {
    const savedCrops = getCrops();
    setCrops(savedCrops);
  }, []);

  // Save crops whenever they change
  useEffect(() => {
    if (crops.length > 0) {
      saveCrops(crops);
    }
  }, [crops]);

  const handleAddCrop = () => {
    setCurrentView('selector');
  };

  const handleCropSelect = (crop: Omit<Crop, 'id'>) => {
    // Create a temporary ID for the selected crop
    const tempCrop: Crop = {
      ...crop,
      id: `temp-${Date.now()}`,
      expenses: []
    };
    setSelectedCrop(tempCrop);
    setCurrentView('details');
  };

  const handleViewCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentView('view');
  };

  const handleSaveCrop = (cropData: Crop) => {
    const newCrop: Crop = {
      ...cropData,
      id: Date.now().toString(),
      expenses: []
    };
    
    const updatedCrops = [...crops, newCrop];
    setCrops(updatedCrops);
    saveCrops(updatedCrops); // Explicitly save to localStorage
    
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleSkip = () => {
    if (selectedCrop) {
      const newCrop: Crop = {
        ...selectedCrop,
        id: Date.now().toString(),
        expenses: []
      };
      
      const updatedCrops = [...crops, newCrop];
      setCrops(updatedCrops);
      saveCrops(updatedCrops); // Explicitly save to localStorage
    }
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCrop(null);
  };

  const handleUpdateCrop = (updatedCrop: Crop) => {
    const updatedCrops = crops.map(crop => 
      crop.id === updatedCrop.id ? updatedCrop : crop
    );
    setCrops(updatedCrops);
    saveCrops(updatedCrops); // Explicitly save to localStorage
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
