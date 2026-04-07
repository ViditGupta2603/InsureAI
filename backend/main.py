from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

app = FastAPI()

# ✅ CORS FIX (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model
model = pickle.load(open("model.pkl", "rb"))

# ✅ Home route
@app.get("/")
def home():
    return {"message": "InsureAI API Running 🚀"}

# ✅ Prediction route
@app.post("/predict")
def predict(age: int, bmi: float, children: int):

    data = np.array([[age, bmi, children]])

    result = model.predict(data)

    return {
        "predicted_cost": float(result[0])
    }