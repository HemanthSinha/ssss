import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Upload } from "lucide-react";
import { TransactionModal } from "@/components/TransactionModal";
import { CSVUploadModal } from "@/components/CSVUploadModal";

type Transaction = {
  _id?: string;
  id?: string;
  description?: string;
  category?: string;
  amount?: number;
  type?: "income" | "expense";
  date?: string;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Safe fetch
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/transactions");

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Transaction fetch error:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Safe search
  const filteredTransactions = transactions.filter((t) => {
    const desc = t.description ?? "";
    const cat = t.category ?? "";
    return (
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Food: "bg-primary/10 text-primary",
      Transport: "bg-accent/10 text-accent",
      Shopping: "bg-purple-500/10 text-purple-600",
      Bills: "bg-warning/10 text-warning",
      Entertainment: "bg-success/10 text-success",
      Income: "bg-success/10 text-success",
    };
    return category && colors[category]
      ? colors[category]
      : "bg-muted text-muted-foreground";
  };

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
            <Button
              className="bg-gradient-primary"
              onClick={() => setIsTransactionModalOpen(true)}
            >
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

          {/* List */}
          <CardContent>
            {loading && (
              <p className="text-center text-muted-foreground">
                Loading transactions...
              </p>
            )}

            {!loading && filteredTransactions.length === 0 && (
              <p className="text-center text-muted-foreground">
                No transactions found
              </p>
            )}

            <div className="space-y-4">
              {filteredTransactions.map((t, index) => {
                const amount =
                  typeof t.amount === "number" ? t.amount : 0;

                const formattedDate =
                  t.date && !isNaN(Date.parse(t.date))
                    ? new Date(t.date).toLocaleDateString()
                    : "N/A";

                return (
                  <div
                    key={t._id || t.id || index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium mb-1">
                        {t.description || "No description"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <Badge
                          variant="secondary"
                          className={getCategoryColor(t.category)}
                        >
                          {t.category || "Unknown"}
                        </Badge>
                      </div>
                    </div>

                    <div
                      className={`text-lg font-semibold ${
                        t.type === "income"
                          ? "text-success"
                          : "text-foreground"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}₹
                      {amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <TransactionModal
          open={isTransactionModalOpen}
          onOpenChange={(open) => {
            setIsTransactionModalOpen(open);
            if (!open) fetchTransactions();
          }}
        />

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
