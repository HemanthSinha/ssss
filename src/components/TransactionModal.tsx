import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionModal({
  open,
  onOpenChange,
}: TransactionModalProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category) {
      toast.error("Amount and category are required");
      return;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      toast.error("Invalid amount");
      return;
    }

    const payload = {
      date: date.toISOString(),
      category,
      description,
      paymentMethod,
      amount: Math.abs(numericAmount),
      type: category === "Income" ? "income" : "expense",
    };

    try {
      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:8000/add-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add transaction");
      }

      toast.success("Transaction added successfully!");
      onOpenChange(false);

      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setPaymentMethod("");
      setDate(new Date());
    } catch (err) {
      console.error(err);
      toast.error("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
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
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Entertainment">
                  Entertainment
                </SelectItem>
                <SelectItem value="Income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="e.g., Grocery shopping"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Payment */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Credit Card">
                  Credit Card
                </SelectItem>
                <SelectItem value="Debit Card">
                  Debit Card
                </SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Net Banking">
                  Net Banking
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
