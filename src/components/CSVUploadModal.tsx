import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface CSVUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CSVUploadModal({
  open,
  onOpenChange,
}: CSVUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/upload-transactions",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("CSV uploaded and stored in database!");
      onOpenChange(false);
      setFile(null);
      setFileName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload CSV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload CSV File</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label htmlFor="csv-upload" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">
                Choose CSV File
              </span>
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          {fileName && (
            <p className="text-sm text-muted-foreground">
              Selected: {fileName}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || loading}
            className="bg-gradient-primary"
          >
            {loading ? "Uploading..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
