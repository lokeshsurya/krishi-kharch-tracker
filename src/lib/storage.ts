import { Crop } from '@/pages/CropsPage';
import { LaborRecord } from '@/pages/LaborPage';

const CROPS_STORAGE_KEY = 'kisan-sahyog-crops';
const LABOR_STORAGE_KEY = 'kisan-sahyog-labor';

// Crops Storage
export const getCrops = (): Crop[] => {
  const storedCrops = localStorage.getItem(CROPS_STORAGE_KEY);
  if (!storedCrops) return [];
  
  try {
    const crops = JSON.parse(storedCrops);
    // Convert date strings back to Date objects
    return crops.map((crop: any) => ({
      ...crop,
      plantationDate: crop.plantationDate ? new Date(crop.plantationDate) : undefined,
      expectedHarvestDate: crop.expectedHarvestDate ? new Date(crop.expectedHarvestDate) : undefined,
      expenses: crop.expenses.map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }))
    }));
  } catch (error) {
    console.error('Error parsing stored crops:', error);
    return [];
  }
};

export const saveCrops = (crops: Crop[]): void => {
  localStorage.setItem(CROPS_STORAGE_KEY, JSON.stringify(crops));
};

// Labor Records Storage
export const getLaborRecords = (): LaborRecord[] => {
  const storedRecords = localStorage.getItem(LABOR_STORAGE_KEY);
  if (!storedRecords) return [];
  
  try {
    const records = JSON.parse(storedRecords);
    // Convert date strings back to Date objects
    return records.map((record: any) => ({
      ...record,
      date: new Date(record.date)
    }));
  } catch (error) {
    console.error('Error parsing stored labor records:', error);
    return [];
  }
};

export const saveLaborRecords = (records: LaborRecord[]): void => {
  localStorage.setItem(LABOR_STORAGE_KEY, JSON.stringify(records));
}; 