import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [children, setChildren] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!age || !bmi || !children) {
      alert("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/predict?age=${age}&bmi=${bmi}&children=${children}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();
      setResult(`💰 ₹ ${data.predicted_cost.toFixed(2)}`);
    } catch (error) {
      setResult("❌ Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 InsureAI</h1>
        <p>Smart Insurance Predictor</p>

        <div className="input-group">
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter BMI"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Children"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
        </div>

        <button onClick={predict} disabled={loading}>
          {loading ? "Processing..." : "Predict Cost"}
        </button>

        {result && <h2 className="result-display">{result}</h2>}
      </div>
    </div>
  );
}