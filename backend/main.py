from fastapi import FastAPI
import pickle
import numpy as np

app = FastAPI()

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.get("/")
def home():
    return {"message": "Insurance Prediction API Running 🚀"}

@app.post("/predict")
def predict(age: int, bmi: float, children: int):
    # Input ko array me convert karo
    data = np.array([[age, bmi, children]])
    
    # Prediction
    result = model.predict(data)
    
    return {"predicted_cost": float(result[0])}