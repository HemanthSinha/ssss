from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
import io, os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MongoDB ----------------
client = MongoClient(os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017"))
db = client["financeDB"]

transactions = db["transactions"]
budgets = db["budgets"]

# ---------------- Root ----------------
@app.get("/")
def root():
    return {"status": "Backend running"}

# =================================================
# TRANSACTIONS (UNCHANGED + FIXED)
# =================================================

@app.post("/upload-transactions")
async def upload_csv(file: UploadFile = File(...)):
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))

    records = []
    income_categories = {"salary", "freelance", "bonus", "income"}

    for _, row in df.iterrows():
        try:
            amount = float(row.get("amount", 0))
        except:
            amount = 0.0

        category = str(row.get("category", "")).strip()

        txn_type = (
            "income"
            if category.lower() in income_categories
            else "expense"
        )

        records.append({
            "date": row.get("date", datetime.utcnow().isoformat()),
            "category": category or "Unknown",
            "description": row.get("description", ""),
            "paymentMethod": row.get("paymentMethod", ""),
            "amount": abs(amount),
            "type": txn_type,
        })

    if records:
        transactions.insert_many(records)

    return {"inserted": len(records)}


# 🔥 FIX: _id IS NOW RETURNED AS STRING (REQUIRED FOR EDIT/DELETE)
@app.get("/transactions")
def get_transactions():
    data = list(transactions.find())
    for t in data:
        t["_id"] = str(t["_id"])
    return data

@app.post("/add-transaction")
def add_transaction(txn: dict):
    transactions.insert_one({
        "date": txn.get("date", datetime.utcnow().isoformat()),
        "category": txn.get("category", "Unknown"),
        "description": txn.get("description", ""),
        "paymentMethod": txn.get("paymentMethod", ""),
        "amount": abs(float(txn.get("amount", 0))),
        "type": txn.get("type", "expense"),
    })
    return {"status": "success"}

@app.put("/update-transaction")
def update_transaction(txn: dict):
    txn_id = txn.get("_id")
    if not txn_id:
        return {"error": "Transaction ID required"}

    transactions.update_one(
        {"_id": ObjectId(txn_id)},
        {"$set": {
            "date": txn.get("date"),
            "category": txn.get("category"),
            "description": txn.get("description"),
            "paymentMethod": txn.get("paymentMethod"),
            "amount": abs(float(txn.get("amount", 0))),
            "type": txn.get("type", "expense"),
        }}
    )
    return {"status": "updated"}

@app.delete("/delete-transaction/{txn_id}")
def delete_transaction(txn_id: str):
    transactions.delete_one({"_id": ObjectId(txn_id)})
    return {"status": "deleted"}

# =================================================
# BUDGETS (FULLY FIXED + EXTENDED)
# =================================================

@app.get("/budgets")
def get_budgets():
    all_budgets = list(budgets.find())
    all_txns = list(transactions.find())

    result = []
    for b in all_budgets:
        spent = sum(
            t.get("amount", 0)
            for t in all_txns
            if t.get("category") == b.get("category")
            and t.get("type") == b.get("type", "expense")
        )

        expired = False
        if b.get("validTill"):
            try:
                expired = datetime.fromisoformat(b["validTill"]) < datetime.utcnow()
            except:
                expired = False

        result.append({
            "_id": str(b["_id"]),
            "category": b.get("category"),
            "budget": b.get("budget", 0),
            "type": b.get("type", "expense"),
            "spent": spent,
            "validTill": b.get("validTill"),
            "expired": expired,
        })

    return result

@app.post("/add-budget")
def add_budget(budget: dict):
    budgets.insert_one({
        "category": budget["category"],
        "budget": float(budget["budget"]),
        "type": budget.get("type", "expense"),
        "validTill": budget.get("validTill"),
        "createdAt": datetime.utcnow().isoformat(),
    })
    return {"status": "success"}

@app.put("/update-budget")
def update_budget(budget: dict):
    budgets.update_one(
        {"_id": ObjectId(budget["_id"])},
        {"$set": {
            "category": budget["category"],
            "budget": float(budget["budget"]),
            "type": budget["type"],
            "validTill": budget.get("validTill"),
            "updatedAt": datetime.utcnow().isoformat(),
        }}
    )
    return {"status": "updated"}

@app.delete("/delete-budget/{budget_id}")
def delete_budget(budget_id: str):
    budgets.delete_one({"_id": ObjectId(budget_id)})
    return {"status": "deleted"}
