import { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

/* ================= TYPES ================= */

type TransactionType = "income" | "expense";

interface Transaction {
  _id?: string;
  category?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  description?: string;
  paymentMethod?: string;
}

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  transaction?: Transaction;
  onDeleted?: () => void;
}

/* ================= OPTIONS ================= */

const CATEGORY_OPTIONS: { label: string; type: TransactionType }[] = [
  { label: "Food", type: "expense" },
  { label: "Transport", type: "expense" },
  { label: "Shopping", type: "expense" },
  { label: "Bills", type: "expense" },
  { label: "Entertainment", type: "expense" },
  { label: "Salary", type: "income" },
  { label: "Freelance", type: "income" },
  { label: "Bonus", type: "income" },
];

const PAYMENT_OPTIONS = [
  "UPI",
  "Credit Card",
  "Debit Card",
  "Cash",
  "Net Banking",
];

/* ================= COMPONENT ================= */

export function TransactionModal({
  open,
  onOpenChange,
  mode,
  transaction,
  onDeleted,
}: TransactionModalProps) {
  const [form, setForm] = useState<Transaction>({
    category: "Food",
    amount: 0,
    type: "expense",
    date: new Date().toISOString(),
    description: "",
    paymentMethod: "UPI",
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /* ---------- Prefill on Edit ---------- */
  useEffect(() => {
    if (transaction) {
      const dateObj = transaction.date
        ? new Date(transaction.date)
        : new Date();

      setForm({
        _id: transaction._id,
        category: transaction.category ?? "Food",
        amount: typeof transaction.amount === "number" ? transaction.amount : 0,
        type: transaction.type ?? "expense",
        date: dateObj.toISOString(),
        description: transaction.description ?? "",
        paymentMethod: transaction.paymentMethod ?? "UPI",
      });

      setSelectedDate(dateObj);
    }
  }, [transaction, open]);

  /* ---------- Save ---------- */
  const handleSubmit = async () => {
    try {
      const url =
        mode === "add"
          ? "http://127.0.0.1:8000/add-transaction"
          : "http://127.0.0.1:8000/update-transaction";

      const res = await fetch(url, {
        method: mode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success(
        mode === "add"
          ? "Transaction added successfully"
          : "Transaction updated successfully"
      );

      onOpenChange(false);
    } catch {
      toast.error("Failed to save transaction");
    }
  };

  /* ---------- Delete (FIXED) ---------- */
  const handleDelete = async () => {
    if (!transaction?._id) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/delete-transaction/${transaction._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      toast.success("Transaction deleted");
      onDeleted?.(); // 🔥 refresh list
      onOpenChange(false);
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Transaction" : "Edit Transaction"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date */}
          <div className="space-y-1">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => {
                    if (!d) return;
                    setSelectedDate(d);
                    setForm({ ...form, date: d.toISOString() });
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => {
                const match = CATEGORY_OPTIONS.find(
                  (c) => c.label === value
                );
                setForm({
                  ...form,
                  category: value,
                  type: match?.type ?? "expense",
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c.label} value={c.label}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-1">
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              value={form.amount ?? 0}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-1">
            <Label>Payment Method</Label>
            <Select
              value={form.paymentMethod}
              onValueChange={(v) =>
                setForm({ ...form, paymentMethod: v })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              value={form.description ?? ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between mt-4">
          {mode === "edit" && (
            <Button
              variant="destructive"
              type="button"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
