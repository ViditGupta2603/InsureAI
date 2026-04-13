import { useState } from "react";
import "./App.css";

export default function App() {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [children, setChildren] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const predict = async () => {
    if (!age || !bmi || !children) {
      setError("⚠️ Fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/predict?age=${age}&bmi=${bmi}&children=${children}`,
        { method: "POST" }
      );

      const data = await res.json();
      const cost = data.predicted_cost.toFixed(2);

      setResult(`💰 ₹ ${cost}`);

      // add to history
      setHistory((prev) => [cost, ...prev]);

    } catch {
      setError("❌ API Error");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 InsureAI</h1>
        <p>Smart Insurance Predictor</p>

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
          placeholder="Children"
          value={children}
          onChange={(e) => setChildren(e.target.value)}
        />

        <button onClick={predict}>
          {loading ? "Loading..." : "Predict Cost"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && <h2>{result}</h2>}

        <h3>Prediction History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>₹ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}