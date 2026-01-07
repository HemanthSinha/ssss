import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: {
    category: string;
    budget: number;
    validTill?: string;
  };
  mode: "add" | "edit";
}

export function BudgetModal({ open, onOpenChange, budget, mode }: BudgetModalProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [validTill, setValidTill] = useState<Date>();

  useEffect(() => {
    if (budget && mode === "edit") {
      setAmount(budget.budget.toString());
      setCategory(budget.category);
      if (budget.validTill) {
        setValidTill(new Date(budget.validTill));
      }
    } else {
      setAmount("");
      setCategory("");
      setValidTill(undefined);
    }
  }, [budget, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "edit") {
      toast.success("Budget updated successfully!");
    } else {
      toast.success("New budget created!");
    }
    
    onOpenChange(false);
    // Reset form
    setAmount("");
    setCategory("");
    setValidTill(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Budget" : "Add New Budget"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valid Till</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !validTill && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {validTill ? format(validTill, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={validTill}
                  onSelect={setValidTill}
                  initialFocus
                  className="pointer-events-auto"
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              {mode === "edit" ? "Update Budget" : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
