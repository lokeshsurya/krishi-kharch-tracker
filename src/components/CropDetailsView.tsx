
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Crop, Expense } from '@/pages/CropsPage';
import AddExpenseDialog from '@/components/AddExpenseDialog';

interface CropDetailsViewProps {
  crop: Crop;
  onUpdate: (crop: Crop) => void;
  onBack: () => void;
}

const CropDetailsView = ({ crop, onUpdate, onBack }: CropDetailsViewProps) => {
  const { t } = useLanguage();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString()
    };
    
    const updatedCrop = {
      ...crop,
      expenses: [...crop.expenses, newExpense]
    };
    
    onUpdate(updatedCrop);
    setIsAddExpenseOpen(false);
  };

  const handleDeleteExpense = (expenseId: string) => {
    const updatedCrop = {
      ...crop,
      expenses: crop.expenses.filter(expense => expense.id !== expenseId)
    };
    onUpdate(updatedCrop);
  };

  const totalExpenses = crop.expenses.reduce((sum, expense) => sum + expense.amount, 0);

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
          <h1 className="text-2xl font-bold text-green-800">{t.cropDetails}</h1>
        </div>

        {/* Crop Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-green-800">
                  {t[crop.nameKey as keyof typeof t] as string}
                </h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {crop.season && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t.season}:</span>
                <span className="font-medium">{crop.season}</span>
              </div>
            )}
            {crop.plantationDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t.plantationDate}:</span>
                <span className="font-medium">{format(crop.plantationDate, "PPP")}</span>
              </div>
            )}
            {crop.expectedHarvestDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t.expectedHarvestDate}:</span>
                <span className="font-medium">{format(crop.expectedHarvestDate, "PPP")}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Expense Button */}
        <Button
          onClick={() => setIsAddExpenseOpen(true)}
          className="w-full mb-6 bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-xl"
          size="lg"
        >
          <Plus className="w-6 h-6 mr-2" />
          {t.addExpense}
        </Button>

        {/* Expenses List */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">{t.expenses}</CardTitle>
          </CardHeader>
          <CardContent>
            {crop.expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">{t.noExpenses}</p>
            ) : (
              <div className="space-y-3">
                {crop.expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-green-800">{expense.category}</span>
                        <span className="font-bold text-green-700">₹{expense.amount}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {format(expense.date, "PPP")}
                      </div>
                      {expense.notes && (
                        <div className="text-sm text-gray-500 mt-1">{expense.notes}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-green-800">{t.totalExpenses}:</span>
              <span className="text-xl font-bold text-green-700">₹{totalExpenses}</span>
            </div>
          </CardContent>
        </Card>

        {/* Add Expense Dialog */}
        <AddExpenseDialog
          open={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onSave={handleAddExpense}
        />
      </div>
    </div>
  );
};

export default CropDetailsView;
