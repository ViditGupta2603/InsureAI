const historyList = document.getElementById("historyList");
const toast = document.getElementById("toast");
const loader = document.getElementById("loader");
const resultDiv = document.getElementById("result");
const button = document.querySelector("button");

let chart;

// 🚀 MAIN FUNCTION
async function predict() {

    const age = document.getElementById("age").value;
    const bmi = document.getElementById("bmi").value;
    const children = document.getElementById("children").value;

    // reset
    resultDiv.innerText = "";

    if (!age || !bmi || !children) {
        showToast("⚠️ Fill all fields");
        return;
    }

    if (age < 0 || bmi < 0 || children < 0) {
        showToast("❌ Invalid input");
        return;
    }

    try {
        button.disabled = true;
        loader.style.display = "block";

        const response = await fetch(
            `http://127.0.0.1:8000/predict?age=${age}&bmi=${bmi}&children=${children}`,
            { method: "POST" }
        );

        const data = await response.json();

        loader.style.display = "none";
        button.disabled = false;

        const cost = data.predicted_cost.toFixed(2);

        resultDiv.innerText = "💰 ₹ " + cost;

        // save + update UI
        addToHistory(cost);
        updateChart(cost);

    } catch (error) {
        loader.style.display = "none";
        button.disabled = false;
        showToast("❌ API Error");
        console.log(error);
    }
}

// 🔔 TOAST
function showToast(msg) {
    toast.innerText = msg;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

// 📜 HISTORY
function addToHistory(cost) {
    let item = document.createElement("li");
    item.innerText = "₹ " + cost;

    historyList.prepend(item);
}

// 📊 CHART
function updateChart(cost) {

    if (!chart) {
        const ctx = document.getElementById("chart").getContext("2d");

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Prediction",
                    data: [],
                    borderColor: "#00c6ff",
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: { color: 'white' }
                    },
                    x: {
                        ticks: { color: 'white' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                }
            }
        });
    }

    chart.data.labels.push("Run " + (chart.data.labels.length + 1));
    chart.data.datasets[0].data.push(cost);
    chart.update();
}

// 🌙 THEME TOGGLE
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};