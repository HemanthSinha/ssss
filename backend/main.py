from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import pandas as pd
import io, os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI()

# 🔹 CORS (React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 MongoDB connection
client = MongoClient(os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017"))
db = client["financeDB"]
transactions = db["transactions"]

# 🔹 Root (optional)
@app.get("/")
def root():
    return {"status": "Backend running"}

# 🔹 Upload CSV (SAFE)
@app.post("/upload-transactions")
async def upload_csv(file: UploadFile = File(...)):
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))

    records = []
    for _, row in df.iterrows():
        try:
            amount = float(row.get("amount", 0))
        except:
            amount = 0.0

        record = {
            "date": (
                row.get("date")
                if isinstance(row.get("date"), str)
                else datetime.utcnow().isoformat()
            ),
            "category": row.get("category", "Unknown"),
            "description": row.get("description", ""),
            "paymentMethod": row.get("paymentMethod", ""),
            "amount": abs(amount),
            "type": "income" if amount > 0 else "expense",
        }

        records.append(record)

    if records:
        transactions.insert_many(records)

    return {"message": f"Uploaded {len(records)} transactions."}

# 🔹 Get all transactions
@app.get("/transactions")
def get_transactions():
    data = list(transactions.find({}, {"_id": 0}))
    return data

# 🔹 Add single transaction (USED BY MODAL)
@app.post("/add-transaction")
def add_transaction(txn: dict):
    # Defensive cleanup
    try:
        amount = float(txn.get("amount", 0))
    except:
        amount = 0.0

    record = {
        "date": txn.get("date", datetime.utcnow().isoformat()),
        "category": txn.get("category", "Unknown"),
        "description": txn.get("description", ""),
        "paymentMethod": txn.get("paymentMethod", ""),
        "amount": abs(amount),
        "type": txn.get("type", "expense"),
    }

    transactions.insert_one(record)
    return {"status": "success"}
