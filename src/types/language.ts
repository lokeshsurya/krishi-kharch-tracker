export type Language = 'en' | 'mr';

export interface Translations {
  greeting: string;
  selectLanguage: string;
  english: string;
  marathi: string;
  welcome: string;
  myCrops: string;
  myLabor: string;
  chooseAction: string;
  addCrop: string;
  selectCrop: string;
  cropDetails: string;
  season: string;
  plantationDate: string;
  expectedHarvestDate: string;
  save: string;
  skip: string;
  viewDetails: string;
  backToDashboard: string;
  optional: string;
  selectDate: string;
  tomato: string;
  onion: string;
  potato: string;
  rice: string;
  wheat: string;
  corn: string;
  // New expense-related translations
  addExpense: string;
  expenses: string;
  totalExpenses: string;
  expenseCategory: string;
  fertilizer: string;
  seeds: string;
  fuel: string;
  labor: string;
  irrigation: string;
  other: string;
  custom: string;
  date: string;
  amount: string;
  notes: string;
  delete: string;
  noExpenses: string;
  selectCategory: string;
  enterAmount: string;
  enterNotes: string;
  // New labor-related translations
  addLabor: string;
  laborerName: string;
  taskPerformed: string;
  amountPaid: string;
  totalLaborCost: string;
  noLaborRecords: string;
  edit: string;
  enterLaborerName: string;
  enterTask: string;
  selectTask: string;
  plowing: string;
  sowing: string;
  weeding: string;
  harvesting: string;
  spraying: string;
  watering: string;
  transport: string;
  customTask: string;
  selectSeason: string;
  kharif: string;
  rabi: string;
  zaid: string;
  yearRound: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    greeting: "🙏 Namaste",
    selectLanguage: "Please select your preferred language",
    english: "English",
    marathi: "मराठी",
    welcome: "Welcome to Krishi Kharch",
    myCrops: "🪴 My Crops",
    myLabor: "👷‍♂️ My Labor",
    chooseAction: "What would you like to manage today?",
    addCrop: "Add Crop",
    selectCrop: "Select a Crop",
    cropDetails: "Crop Details",
    season: "Season",
    plantationDate: "Plantation Date",
    expectedHarvestDate: "Expected Harvest Date",
    save: "Save",
    skip: "Skip",
    viewDetails: "View Details",
    backToDashboard: "Back to Dashboard",
    optional: "Optional",
    selectDate: "Select date",
    tomato: "Tomato",
    onion: "Onion",
    potato: "Potato",
    rice: "Rice",
    wheat: "Wheat",
    corn: "Corn",
    // New expense-related translations
    addExpense: "Add Expense",
    expenses: "Expenses",
    totalExpenses: "Total Expenses",
    expenseCategory: "Expense Category",
    fertilizer: "Fertilizer",
    seeds: "Seeds",
    fuel: "Fuel",
    labor: "Labor",
    irrigation: "Irrigation",
    other: "Other",
    custom: "Custom",
    date: "Date",
    amount: "Amount",
    notes: "Notes",
    delete: "Delete",
    noExpenses: "No expenses recorded yet",
    selectCategory: "Select category",
    enterAmount: "Enter amount",
    enterNotes: "Enter notes (optional)",
    // New labor-related translations
    addLabor: "Add Labor",
    laborerName: "Laborer Name",
    taskPerformed: "Task Performed",
    amountPaid: "Amount Paid (₹)",
    totalLaborCost: "Total Labor Cost",
    noLaborRecords: "No labor records yet",
    edit: "Edit",
    enterLaborerName: "Enter laborer name",
    enterTask: "Enter task",
    selectTask: "Select task",
    plowing: "Plowing",
    sowing: "Sowing",
    weeding: "Weeding",
    harvesting: "Harvesting",
    spraying: "Spraying",
    watering: "Watering",
    transport: "Transport",
    customTask: "Custom Task",
    selectSeason: "Select season",
    kharif: "Kharif (July-October)",
    rabi: "Rabi (October-March)",
    zaid: "Zaid (March-July)",
    yearRound: "Year Round"
  },
  mr: {
    greeting: "🙏 नमस्ते",
    selectLanguage: "कृपया आपली पसंतीची भाषा निवडा",
    english: "English",
    marathi: "मराठी",
    welcome: "कृषी खर्च मध्ये आपले स्वागत आहे",
    myCrops: "🪴 माझी पिके",
    myLabor: "👷‍♂️ माझे मजूर",
    chooseAction: "आज आपण काय व्यवस्थापित करू इच्छिता?",
    addCrop: "पीक जोडा",
    selectCrop: "पीक निवडा",
    cropDetails: "पिकाचे तपशील",
    season: "हंगाम",
    plantationDate: "लागवडीची तारीख",
    expectedHarvestDate: "अपेक्षित कापणीची तारीख",
    save: "जतन करा",
    skip: "वगळा",
    viewDetails: "तपशील पहा",
    backToDashboard: "डॅशबोर्डवर परत",
    optional: "पर्यायी",
    selectDate: "तारीख निवडा",
    tomato: "टमाटर",
    onion: "कांदा",
    potato: "बटाटा",
    rice: "तांदूळ",
    wheat: "गहू",
    corn: "मका",
    // New expense-related translations
    addExpense: "खर्च जोडा",
    expenses: "खर्च",
    totalExpenses: "एकूण खर्च",
    expenseCategory: "खर्चाचा प्रकार",
    fertilizer: "खत",
    seeds: "बियाणे",
    fuel: "इंधन",
    labor: "मजूर",
    irrigation: "पाणी",
    other: "इतर",
    custom: "सानुकूल",
    date: "तारीख",
    amount: "रक्कम",
    notes: "टिप्पण्या",
    delete: "हटवा",
    noExpenses: "अजून कोणताही खर्च नोंदविला नाही",
    selectCategory: "प्रकार निवडा",
    enterAmount: "रक्कम टाका",
    enterNotes: "टिप्पणी टाका (पर्यायी)",
    // New labor-related translations
    addLabor: "मजूर जोडा",
    laborerName: "मजुराचे नाव",
    taskPerformed: "केलेले काम",
    amountPaid: "दिलेली रक्कम (₹)",
    totalLaborCost: "एकूण मजुरी खर्च",
    noLaborRecords: "अजून कोणतेही मजूर रेकॉर्ड नाही",
    edit: "संपादित करा",
    enterLaborerName: "मजुराचे नाव टाका",
    enterTask: "काम टाका",
    selectTask: "काम निवडा",
    plowing: "नांगरणी",
    sowing: "पेरणी",
    weeding: "निंदणी",
    harvesting: "कापणी",
    spraying: "फवारणी",
    watering: "पाणी देणे",
    transport: "वाहतूक",
    customTask: "इतर काम",
    selectSeason: "हंगाम निवडा",
    kharif: "खरीप (जुलै-ऑक्टोबर)",
    rabi: "रब्बी (ऑक्टोबर-मार्च)",
    zaid: "झायद (मार्च-जुलै)",
    yearRound: "वर्षभर"
  }
};
