export const transactionsData = [
  { id: 1, date: "2025-01-20", category: "Food", description: "Grocery Store", amount: -85.50 },
  { id: 2, date: "2025-01-19", category: "Transport", description: "Uber Ride", amount: -15.20 },
  { id: 3, date: "2025-01-18", category: "Income", description: "Salary", amount: 3500.00 },
  { id: 4, date: "2025-01-17", category: "Shopping", description: "Amazon Purchase", amount: -124.99 },
  { id: 5, date: "2025-01-16", category: "Bills", description: "Electricity Bill", amount: -75.00 },
  { id: 6, date: "2025-01-15", category: "Food", description: "Restaurant Dinner", amount: -65.30 },
  { id: 7, date: "2025-01-14", category: "Entertainment", description: "Movie Tickets", amount: -28.00 },
  { id: 8, date: "2025-01-13", category: "Transport", description: "Gas Station", amount: -45.00 },
  { id: 9, date: "2025-01-12", category: "Shopping", description: "Clothing Store", amount: -89.99 },
  { id: 10, date: "2025-01-11", category: "Food", description: "Coffee Shop", amount: -12.50 },
];

export const budgetsData = [
  { category: "Food", budget: 1000, spent: 1063.30, color: "hsl(221 83% 53%)" },
  { category: "Transport", budget: 200, spent: 105.20, color: "hsl(173 58% 39%)" },
  { category: "Shopping", budget: 300, spent: 214.98, color: "hsl(262 83% 58%)" },
  { category: "Bills", budget: 400, spent: 75.00, color: "hsl(38 92% 50%)" },
  { category: "Entertainment", budget: 150, spent: 28.00, color: "hsl(142 76% 36%)" },
];

export const spendingTrendsData = [
  { month: "Jul", amount: 1250 },
  { month: "Aug", amount: 1450 },
  { month: "Sep", amount: 1320 },
  { month: "Oct", amount: 1680 },
  { month: "Nov", amount: 1420 },
  { month: "Dec", amount: 1850 },
  { month: "Jan", amount: 1390 },
];

export const categoryDistributionData = [
  { name: "Food", value: 363, color: "hsl(221 83% 53%)" },
  { name: "Transport", value: 105, color: "hsl(173 58% 39%)" },
  { name: "Shopping", value: 215, color: "hsl(262 83% 58%)" },
  { name: "Bills", value: 75, color: "hsl(38 92% 50%)" },
  { name: "Entertainment", value: 28, color: "hsl(142 76% 36%)" },
];

export const aiInsights = [
  {
    id: 1,
    title: "Reduce Dining Expenses",
    description: "You spent ₹363 on food this month, which is 27% more than last month. Consider meal prepping to save ₹150+",
    impact: "high",
    savings: 150,
  },
  {
    id: 2,
    title: "Shopping Pattern Alert",
    description: "Your shopping expenses increased by 45% this month. Setting a weekly limit could help you save ₹80",
    impact: "medium",
    savings: 80,
  },
  {
    id: 3,
    title: "Great Job on Bills!",
    description: "You're well under budget for bills this month. Keep up the excellent management!",
    impact: "positive",
    savings: 0,
  },
  {
    id: 4,
    title: "Transport Optimization",
    description: "Consider carpooling or public transport for daily commute. Potential monthly savings: ₹95",
    impact: "medium",
    savings: 95,
  },
];

export const predictionsData = {
  nextDay: {
    expectedSpending: 285,
    topCategory: "Food",
    confidence: 87,
  },
  nextWeek: {
    totalExpected: 1890,
    avgDaily: 270,
    dailyForecast: [
      { day: "Mon", amount: 250 },
      { day: "Tue", amount: 280 },
      { day: "Wed", amount: 310 },
      { day: "Thu", amount: 265 },
      { day: "Fri", amount: 340 },
      { day: "Sat", amount: 225 },
      { day: "Sun", amount: 220 },
    ],
  },
  nextMonth: {
    totalProjection: 8450,
    expectedIncome: 12000,
    netSavings: 3550,
    categoryBreakdown: [
      { category: "Food", predicted: 2200 },
      { category: "Transport", predicted: 1100 },
      { category: "Shopping", predicted: 1800 },
      { category: "Bills", predicted: 2400 },
      { category: "Entertainment", predicted: 950 },
    ],
  },
  insights: [
    {
      message: "Your spending is expected to rise by 8% next week compared to this week.",
      trend: "up",
    },
    {
      message: "Dining expenses may decrease next month if you maintain your meal prep routine.",
      trend: "down",
    },
    {
      message: "Weekend spending typically increases by 15% - plan ahead to stay on track.",
      trend: "up",
    },
    {
      message: "Bill payments are due in 5 days. Budget allocated: ₹2,400.",
      trend: "down",
    },
  ],
};
