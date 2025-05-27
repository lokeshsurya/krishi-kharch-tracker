
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { LaborRecord } from '@/pages/LaborPage';
import { format } from 'date-fns';

interface LaborListProps {
  laborRecords: LaborRecord[];
  totalLaborCost: number;
  onAddLabor: () => void;
  onEditLabor: (record: LaborRecord) => void;
  onDeleteLabor: (id: string) => void;
}

const LaborList = ({ 
  laborRecords, 
  totalLaborCost, 
  onAddLabor, 
  onEditLabor, 
  onDeleteLabor 
}: LaborListProps) => {
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
          <h1 className="text-2xl font-bold text-green-800">{t.myLabor}</h1>
        </div>

        {/* Total Labor Cost */}
        {laborRecords.length > 0 && (
          <Card className="mb-6 bg-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold">{t.totalLaborCost}</h2>
                <p className="text-2xl font-bold">₹{totalLaborCost.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Labor Button */}
        <Button
          onClick={onAddLabor}
          className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-xl"
          size="lg"
        >
          <Plus className="w-6 h-6 mr-2" />
          {t.addLabor}
        </Button>

        {/* Labor Records */}
        {laborRecords.length === 0 ? (
          <div className="text-center py-12 text-green-600">
            <p className="text-lg">{t.noLaborRecords}</p>
            <p className="text-sm mt-2">{t.addLabor} to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {laborRecords.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 text-lg">
                        {record.laborerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(record.date, 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditLabor(record)}
                        className="text-green-600 hover:bg-green-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteLabor(record.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t.taskPerformed}:</span>
                      <span className="text-sm font-medium">{record.task}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t.amount}:</span>
                      <span className="text-sm font-bold text-green-600">
                        ₹{record.amount.toLocaleString()}
                      </span>
                    </div>
                    {record.notes && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">{t.notes}: </span>
                        <span className="text-xs text-gray-700">{record.notes}</span>
                      </div>
                    )}
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

export default LaborList;
