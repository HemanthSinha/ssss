import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { predictionsData } from "@/lib/dummy-data";

export default function Predictions() {
  const { nextDay, nextWeek, nextMonth, insights } = predictionsData;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Predictions</h1>
            <p className="text-muted-foreground">Smart forecasts for your finances</p>
          </div>
          <Button className="bg-gradient-primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Update Forecast
          </Button>
        </div>

        {/* AI Insights */}
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <Card key={index} className="shadow-card border-0 bg-gradient-hero">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {insight.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-warning mt-1" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-success mt-1" />
                  )}
                  <p className="text-sm leading-relaxed">{insight.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Day Prediction */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Next Day
              <span className="text-sm font-normal text-muted-foreground">Tomorrow's Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Expected Spending</p>
                <p className="text-2xl font-bold text-foreground">₹{nextDay.expectedSpending}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Top Category</p>
                <p className="text-2xl font-bold text-primary">{nextDay.topCategory}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                <p className="text-2xl font-bold text-success">{nextDay.confidence}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Week Prediction */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Next Week
              <span className="text-sm font-normal text-muted-foreground">7-Day Outlook</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={nextWeek.dailyForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Expected</p>
                  <p className="text-2xl font-bold">₹{nextWeek.totalExpected}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Avg Daily Spend</p>
                  <p className="text-2xl font-bold">₹{nextWeek.avgDaily}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Month Prediction */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Next Month
              <span className="text-sm font-normal text-muted-foreground">30-Day Projection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={nextMonth.categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="predicted" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Projection</p>
                <p className="text-2xl font-bold">₹{nextMonth.totalProjection}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Expected Income</p>
                <p className="text-2xl font-bold text-success">₹{nextMonth.expectedIncome}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Net Savings</p>
                <p className={`text-2xl font-bold ${nextMonth.netSavings > 0 ? 'text-success' : 'text-warning'}`}>
                  ₹{nextMonth.netSavings}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
