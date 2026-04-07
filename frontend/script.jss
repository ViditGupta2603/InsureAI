async function predict() {

    let age = document.getElementById("age").value;
    let bmi = document.getElementById("bmi").value;
    let children = document.getElementById("children").value;

    let resultBox = document.getElementById("result");
    let errorBox = document.getElementById("error");
    let loader = document.getElementById("loader");

    resultBox.innerText = "";
    errorBox.innerText = "";

    // validation
    if (!age || !bmi || !children) {
        errorBox.innerText = "⚠️ Please fill all fields";
        return;
    }

    try {
        loader.style.display = "block";

        let response = await fetch(
            `http://127.0.0.1:8000/predict?age=${age}&bmi=${bmi}&children=${children}`,
            { method: "POST" }
        );

        let data = await response.json();

        loader.style.display = "none";

        resultBox.innerText = "💰 ₹ " + data.predicted_cost.toFixed(2);

    } catch (error) {
        loader.style.display = "none";
        errorBox.innerText = "❌ Server error. Check backend.";
    }
}