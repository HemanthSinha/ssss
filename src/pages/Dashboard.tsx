import { ElementType, useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Transaction = {
  _id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 🔹 Fetch data from backend (MongoDB)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Failed to fetch transactions", err));
  }, []);

  // 🔹 Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpense;

  // 🔹 Monthly spending trend
  const monthlyData: Record<string, number> = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + t.amount;
  });

  const spendingTrendsData = Object.entries(monthlyData).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  // 🔹 Category distribution
  const categoryMap: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

  const categoryDistributionData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#7c3aed",
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Total Income"
            value={totalIncome}
            icon={TrendingUp}
            positive
          />
          <StatCard
            title="Total Expenses"
            value={totalExpense}
            icon={TrendingDown}
          />
          <StatCard
            title="Savings"
            value={savings}
            icon={Wallet}
            positive={savings >= 0}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spendingTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {categoryDistributionData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

// 🔹 Reusable card
function StatCard({
  title,
  value,
  icon: Icon,
  positive,
}: {
  title: string;
  value: number;
  icon: ElementType;
  positive?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">₹{value}</div>
        <p
          className={`text-sm ${
            positive ? "text-success" : "text-primary"
          }`}
        >
          Live from database
        </p>
      </CardContent>
    </Card>
  );
}
