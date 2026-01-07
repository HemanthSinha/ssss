import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Upload } from "lucide-react";
import { TransactionModal } from "@/components/TransactionModal";
import { CSVUploadModal } from "@/components/CSVUploadModal";

/* ================= TYPES ================= */

type TransactionType = "income" | "expense";

interface Transaction {
  _id: string;
  category?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  description?: string;
  paymentMethod?: string;
}

/* ================= COMPONENT ================= */

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | undefined>();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  /* ---------- Fetch Transactions ---------- */
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/transactions");
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setTransactions([]);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* ---------- Search ---------- */
  const filteredTransactions = transactions.filter(
    (t) =>
      (t.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (t.category || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  /* ---------- Category Badge Colors ---------- */
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Food: "bg-primary/10 text-primary",
      Transport: "bg-accent/10 text-accent",
      Shopping: "bg-purple-500/10 text-purple-600",
      Bills: "bg-warning/10 text-warning",
      Entertainment: "bg-success/10 text-success",
      Salary: "bg-success/10 text-success",
      Freelance: "bg-success/10 text-success",
      Bonus: "bg-success/10 text-success",
    };

    return category && colors[category]
      ? colors[category]
      : "bg-muted text-muted-foreground";
  };

  /* ---------- Handlers ---------- */
  const handleAdd = () => {
    setModalMode("add");
    setSelectedTransaction(undefined);
    setIsTransactionModalOpen(true);
  };

  const handleEdit = (txn: Transaction) => {
    setModalMode("edit");
    setSelectedTransaction(txn);
    setIsTransactionModalOpen(true);
  };

  /* ================= UI ================= */

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Transactions</h1>
            <p className="text-muted-foreground">
              Track and manage all your transactions
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCSVModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </Button>
            <Button className="bg-gradient-primary" onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>

          {/* Transactions List */}
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No transactions found
                </p>
              )}

              {filteredTransactions.map((txn) => {
                const amount =
                  typeof txn.amount === "number" ? txn.amount : 0;
                const type: TransactionType =
                  txn.type === "income" ? "income" : "expense";

                return (
                  <div
                    key={txn._id}
                    onClick={() => handleEdit(txn)}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-medium mb-1">
                        {txn.description || "No description"}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {txn.date
                            ? new Date(txn.date).toLocaleDateString()
                            : "Unknown date"}
                        </span>
                        <span>•</span>

                        {/* Category */}
                        <Badge className={getCategoryColor(txn.category)}>
                          {txn.category || "Unknown"}
                        </Badge>

                        {/* Payment Method */}
                        {txn.paymentMethod && (
                          <Badge variant="outline">
                            {txn.paymentMethod}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div
                      className={`text-lg font-semibold ${
                        type === "income"
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {type === "income" ? "+" : "-"}₹
                      {amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* SINGLE Transaction Modal (IMPORTANT) */}
        <TransactionModal
          open={isTransactionModalOpen}
          onOpenChange={(open) => {
            setIsTransactionModalOpen(open);
            if (!open) fetchTransactions();
          }}
          mode={modalMode}
          transaction={selectedTransaction}
          onDeleted={fetchTransactions}
        />

        {/* CSV Upload Modal */}
        <CSVUploadModal
          open={isCSVModalOpen}
          onOpenChange={(open) => {
            setIsCSVModalOpen(open);
            if (!open) fetchTransactions();
          }}
        />
      </div>
    </AppLayout>
  );
}
