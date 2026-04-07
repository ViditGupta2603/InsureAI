async function predict() {

    const age = document.getElementById("age").value;
    const bmi = document.getElementById("bmi").value;
    const children = document.getElementById("children").value;

    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
    const loader = document.getElementById("loader");

    // reset
    resultDiv.innerText = "";
    errorDiv.innerText = "";

    if (!age || !bmi || !children) {
        errorDiv.innerText = "Please fill all fields";
        return;
    }

    loader.style.display = "block";

    try {
        const response = await fetch(`http://127.0.0.1:8000/predict?age=${age}&bmi=${bmi}&children=${children}`, {
            method: "POST"
        });

        const data = await response.json();

        loader.style.display = "none";

        resultDiv.innerText = "Predicted Cost: ₹ " + data.predicted_cost.toFixed(2);

    } catch (error) {
        loader.style.display = "none";
        errorDiv.innerText = "Error connecting to API";
    }
}