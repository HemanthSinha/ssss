import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { aiInsights } from "@/lib/dummy-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Insights() {
  const savingsData = [
    { category: "Food", potential: 150 },
    { category: "Transport", potential: 95 },
    { category: "Shopping", potential: 80 },
    { category: "Entertainment", potential: 40 },
  ];

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "positive":
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <TrendingUp className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold mb-1">AI Insights</h1>
            <p className="text-muted-foreground">Personalized recommendations to improve your finances</p>
          </div>
        </div>

        {/* Savings Potential Chart */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle>Potential Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar 
                  dataKey="potential" 
                  fill="hsl(var(--success))" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="shadow-card border-0 hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {getImpactIcon(insight.impact)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                    <p className="text-muted-foreground mb-3">{insight.description}</p>
                    {insight.savings > 0 && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                        <TrendingUp className="w-4 h-4" />
                        Save ₹{insight.savings}/month
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="shadow-card border-0 bg-gradient-accent text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Total Savings Potential</h3>
                <p className="opacity-90">By following these recommendations</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">₹365</div>
                <div className="opacity-90">per month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
