import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Crop } from '@/pages/CropsPage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CropDetailsFormProps {
  crop: Crop;
  onSave: (crop: Crop) => void;
  onSkip: () => void;
  onBack: () => void;
}

const CropDetailsForm = ({ crop, onSave, onSkip, onBack }: CropDetailsFormProps) => {
  const { t } = useLanguage();
  const [season, setSeason] = useState('');
  const [plantationDate, setPlantationDate] = useState<Date>();
  const [expectedHarvestDate, setExpectedHarvestDate] = useState<Date>();

  const seasons = [
    { value: 'kharif', label: t.kharif },
    { value: 'rabi', label: t.rabi },
    { value: 'zaid', label: t.zaid },
    { value: 'yearRound', label: t.yearRound },
  ];

  const handleSave = () => {
    onSave({
      ...crop,
      season: season || undefined,
      plantationDate,
      expectedHarvestDate
    });
  };

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

        {/* Selected Crop Display */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-green-800">
                  {t[crop.nameKey as keyof typeof t] as string}
                </h2>
                <p className="text-green-600 text-sm">{t.optional}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season" className="text-green-800">
                {t.season} ({t.optional})
              </Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="border-green-300 focus:border-green-500">
                  <SelectValue placeholder={t.selectSeason} />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Plantation Date */}
            <div className="space-y-2">
              <Label className="text-green-800">
                {t.plantationDate} ({t.optional})
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-green-300",
                      !plantationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {plantationDate ? format(plantationDate, "PPP") : t.selectDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={plantationDate}
                    onSelect={setPlantationDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Expected Harvest Date */}
            <div className="space-y-2">
              <Label className="text-green-800">
                {t.expectedHarvestDate} ({t.optional})
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-green-300",
                      !expectedHarvestDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expectedHarvestDate ? format(expectedHarvestDate, "PPP") : t.selectDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={expectedHarvestDate}
                    onSelect={setExpectedHarvestDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
          >
            {t.skip}
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsForm;
