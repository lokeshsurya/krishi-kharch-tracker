
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { LaborRecord } from '@/pages/LaborPage';

interface AddLaborDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (laborData: Omit<LaborRecord, 'id'>) => void;
  editingRecord?: LaborRecord | null;
}

const AddLaborDialog = ({ isOpen, onClose, onSave, editingRecord }: AddLaborDialogProps) => {
  const { t } = useLanguage();
  const [laborerName, setLaborerName] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [task, setTask] = useState('');
  const [customTask, setCustomTask] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const predefinedTasks = [
    { key: 'plowing', label: t.plowing },
    { key: 'sowing', label: t.sowing },
    { key: 'weeding', label: t.weeding },
    { key: 'harvesting', label: t.harvesting },
    { key: 'spraying', label: t.spraying },
    { key: 'watering', label: t.watering },
    { key: 'transport', label: t.transport },
    { key: 'custom', label: t.customTask }
  ];

  useEffect(() => {
    if (editingRecord) {
      setLaborerName(editingRecord.laborerName);
      setDate(editingRecord.date);
      setTask(editingRecord.task);
      setAmount(editingRecord.amount.toString());
      setNotes(editingRecord.notes || '');
    } else {
      // Reset form for new record
      setLaborerName('');
      setDate(new Date());
      setTask('');
      setCustomTask('');
      setAmount('');
      setNotes('');
    }
  }, [editingRecord, isOpen]);

  const handleSave = () => {
    if (!laborerName || !amount || (!task && !customTask)) return;

    const finalTask = task === 'custom' ? customTask : task;

    onSave({
      laborerName,
      date,
      task: finalTask,
      amount: parseFloat(amount),
      notes: notes || undefined
    });

    // Reset form
    setLaborerName('');
    setDate(new Date());
    setTask('');
    setCustomTask('');
    setAmount('');
    setNotes('');
  };

  const isTaskFromPredefined = predefinedTasks.some(t => t.label === task);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingRecord ? t.edit : t.addLabor}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Laborer Name */}
          <div>
            <Label htmlFor="laborerName">{t.laborerName}</Label>
            <Input
              id="laborerName"
              value={laborerName}
              onChange={(e) => setLaborerName(e.target.value)}
              placeholder={t.enterLaborerName}
            />
          </div>

          {/* Date */}
          <div>
            <Label>{t.date}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : t.selectDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Task */}
          <div>
            <Label>{t.taskPerformed}</Label>
            <Select value={isTaskFromPredefined ? task : 'custom'} onValueChange={setTask}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectTask} />
              </SelectTrigger>
              <SelectContent>
                {predefinedTasks.map((taskOption) => (
                  <SelectItem key={taskOption.key} value={taskOption.label}>
                    {taskOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Task Input */}
          {(task === t.customTask || !isTaskFromPredefined) && (
            <div>
              <Label htmlFor="customTask">{t.customTask}</Label>
              <Input
                id="customTask"
                value={!isTaskFromPredefined ? task : customTask}
                onChange={(e) => {
                  if (!isTaskFromPredefined) {
                    setTask(e.target.value);
                  } else {
                    setCustomTask(e.target.value);
                  }
                }}
                placeholder={t.enterTask}
              />
            </div>
          )}

          {/* Amount */}
          <div>
            <Label htmlFor="amount">{t.amountPaid}</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t.enterAmount}
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">{t.notes} ({t.optional})</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.enterNotes}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!laborerName || !amount || (!task && !customTask)}
            >
              {t.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLaborDialog;
