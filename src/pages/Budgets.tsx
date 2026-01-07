import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { budgetsData } from "@/lib/dummy-data";
import { BudgetModal } from "@/components/BudgetModal";
import { useState } from "react";

export default function Budgets() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<typeof budgetsData[0] | undefined>();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const handleAddBudget = () => {
    setModalMode("add");
    setSelectedBudget(undefined);
    setIsBudgetModalOpen(true);
  };

  const handleEditBudget = (budget: typeof budgetsData[0]) => {
    setModalMode("edit");
    setSelectedBudget(budget);
    setIsBudgetModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Budgets</h1>
            <p className="text-muted-foreground">Monitor your spending against budgets</p>
          </div>
          <Button className="bg-gradient-primary" onClick={handleAddBudget}>
            <Plus className="w-4 h-4 mr-2" />
            Add Budget
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetsData.map((budget, index) => {
            const percentage = (budget.spent / budget.budget) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <Card 
                key={index} 
                className="shadow-card border-0 cursor-pointer hover:shadow-elegant transition-all"
                onClick={() => handleEditBudget(budget)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{budget.category}</span>
                    <span className={`text-sm font-normal ${
                      isOverBudget ? "text-destructive" : isNearLimit ? "text-warning" : "text-muted-foreground"
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-3"
                    indicatorClassName={
                      isOverBudget 
                        ? "bg-destructive" 
                        : isNearLimit 
                        ? "bg-warning" 
                        : "bg-success"
                    }
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Spent: <span className="font-semibold text-foreground">₹{budget.spent}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Budget: <span className="font-semibold text-foreground">₹{budget.budget}</span>
                    </span>
                  </div>
                  {isOverBudget && (
                    <div className="text-sm text-destructive font-medium">
                      ⚠️ Over budget by ₹{(budget.spent - budget.budget).toFixed(2)}
                    </div>
                  )}
                  {isNearLimit && !isOverBudget && (
                    <div className="text-sm text-warning font-medium">
                      ⚠️ Approaching limit
                    </div>
                  )}
                  {!isNearLimit && !isOverBudget && (
                    <div className="text-sm text-success font-medium">
                      ✓ Within budget
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <BudgetModal
          open={isBudgetModalOpen}
          onOpenChange={setIsBudgetModalOpen}
          budget={selectedBudget}
          mode={modalMode}
        />
      </div>
    </AppLayout>
  );
}
