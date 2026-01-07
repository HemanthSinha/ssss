from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import pandas as pd
import io, os, joblib
from dotenv import load_dotenv
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

load_dotenv()

app = FastAPI()

# -------------------------------
# CORS
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# MongoDB
# -------------------------------
client = MongoClient(os.getenv("MONGO_URI"))
db = client["financeDB"]
transactions = db["transactions"]

# -------------------------------
# ML MODEL GLOBALS
# -------------------------------
scaler = MinMaxScaler()
encoder = LabelEncoder()
model = None

# -------------------------------
# 1️⃣ Upload CSV → Store in MongoDB
# -------------------------------
@app.post("/upload-transactions")
async def upload_csv(file: UploadFile = File(...)):
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))

    # Save to DB
    data = df.to_dict(orient="records")
    transactions.insert_many(data)

    return {"message": f"Uploaded {len(data)} transactions."}


# -------------------------------
# 2️⃣ Get all transactions
# -------------------------------
@app.get("/transactions")
def get_transactions():
    data = list(transactions.find({}, {"_id": 0}))
    return data


# -------------------------------
# 3️⃣ Train ML Model on stored data
# -------------------------------
@app.post("/train-model")
def train_model():
    global model, scaler, encoder

    data = list(transactions.find({}, {"_id": 0}))
    df = pd.DataFrame(data)

    if df.empty:
        return {"error": "No data in database"}

    # Encode category
    df["category_type"] = encoder.fit_transform(df["category_type"])

    # Feature Columns
    X = df[["category_type", "day_of_week", "month", "is_weekend", "is_festival"]]
    y = df["amount"]

    # Scale features
    X_scaled = scaler.fit_transform(X)

    # Train model
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)

    model = RandomForestRegressor()
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, "finance_model.pkl")
    joblib.dump(scaler, "scaler.pkl")
    joblib.dump(encoder, "encoder.pkl")

    return {"message": "Model trained successfully!"}


# -------------------------------
# 4️⃣ Predict future spending
# -------------------------------
@app.post("/predict")
def predict(category_type: str, day_of_week: int, month: int, is_weekend: int, is_festival: int):
    global model, scaler, encoder

    if model is None:
        model = joblib.load("finance_model.pkl")
        scaler = joblib.load("scaler.pkl")
        encoder = joblib.load("encoder.pkl")

    # Convert category
    category_num = encoder.transform([category_type])[0]

    X = [[category_num, day_of_week, month, is_weekend, is_festival]]
    X_scaled = scaler.transform(X)

    prediction = model.predict(X_scaled)[0]

    return {"predicted_amount": round(float(prediction), 2)}
