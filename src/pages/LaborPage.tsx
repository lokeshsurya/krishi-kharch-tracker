
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import LaborList from '@/components/LaborList';
import AddLaborDialog from '@/components/AddLaborDialog';

export interface LaborRecord {
  id: string;
  laborerName: string;
  date: Date;
  task: string;
  amount: number;
  notes?: string;
}

const LaborPage = () => {
  const { t } = useLanguage();
  const [laborRecords, setLaborRecords] = useState<LaborRecord[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<LaborRecord | null>(null);

  const handleAddLabor = () => {
    setEditingRecord(null);
    setIsAddDialogOpen(true);
  };

  const handleEditLabor = (record: LaborRecord) => {
    setEditingRecord(record);
    setIsAddDialogOpen(true);
  };

  const handleSaveLabor = (laborData: Omit<LaborRecord, 'id'>) => {
    if (editingRecord) {
      // Update existing record
      setLaborRecords(prev => prev.map(record =>
        record.id === editingRecord.id
          ? { ...laborData, id: editingRecord.id }
          : record
      ));
    } else {
      // Add new record
      setLaborRecords(prev => [...prev, { ...laborData, id: Date.now().toString() }]);
    }
    setIsAddDialogOpen(false);
    setEditingRecord(null);
  };

  const handleDeleteLabor = (id: string) => {
    setLaborRecords(prev => prev.filter(record => record.id !== id));
  };

  const totalLaborCost = laborRecords.reduce((total, record) => total + record.amount, 0);

  return (
    <>
      <LaborList
        laborRecords={laborRecords}
        totalLaborCost={totalLaborCost}
        onAddLabor={handleAddLabor}
        onEditLabor={handleEditLabor}
        onDeleteLabor={handleDeleteLabor}
      />
      <AddLaborDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveLabor}
        editingRecord={editingRecord}
      />
    </>
  );
};

export default LaborPage;
