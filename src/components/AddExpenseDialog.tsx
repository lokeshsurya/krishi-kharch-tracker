
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Expense } from '@/pages/CropsPage';

interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: Omit<Expense, 'id'>) => void;
}

const AddExpenseDialog = ({ open, onClose, onSave }: AddExpenseDialogProps) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const expenseCategories = [
    { value: 'fertilizer', label: t.fertilizer },
    { value: 'seeds', label: t.seeds },
    { value: 'fuel', label: t.fuel },
    { value: 'labor', label: t.labor },
    { value: 'irrigation', label: t.irrigation },
    { value: 'other', label: t.other }
  ];

  const handleSave = () => {
    if (!category || !date || !amount) return;

    onSave({
      category: expenseCategories.find(cat => cat.value === category)?.label || category,
      date,
      amount: parseFloat(amount),
      notes: notes || undefined
    });

    // Reset form
    setCategory('');
    setDate(undefined);
    setAmount('');
    setNotes('');
  };

  const isValid = category && date && amount && parseFloat(amount) > 0;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-green-800">{t.addExpense}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-green-800">{t.expenseCategory}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-green-300">
                <SelectValue placeholder={t.selectCategory} />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-green-800">{t.date}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-green-300",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : t.selectDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label className="text-green-800">{t.amount} (₹)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t.enterAmount}
              className="border-green-300 focus:border-green-500"
            />
          </div>

          {/* Notes Input */}
          <div className="space-y-2">
            <Label className="text-green-800">{t.notes} ({t.optional})</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.enterNotes}
              className="border-green-300 focus:border-green-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
            >
              {t.skip}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isValid}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              {t.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
