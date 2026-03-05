let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart = null;

/* ---------- DISPLAY EXPENSES ---------- */
function displayExpenses() {
    let list = document.getElementById("expenseList");
    let total = 0;
    list.innerHTML = "";

    expenses.forEach((exp, index) => {
        let amount = Number(exp.amount);
        total += amount;

        let dateObj = new Date(exp.date);
        let formattedDate = dateObj.toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${exp.title}</strong><br>
            ₹${amount} | ${exp.category}<br>
            📅 ${formattedDate}<br>
            <button onclick="deleteExpense(${index})">❌ Delete</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("totalAmount").innerText = total;
}

/* ---------- SORTING ---------- */
function sortNewest() {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayExpenses();
}

function sortOldest() {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    displayExpenses();
}

/* ---------- MONTHLY SUMMARY ---------- */
function displayMonthlySummary() {
    let summary = {};
    let list = document.getElementById("monthlySummary");
    list.innerHTML = "";

    expenses.forEach(exp => {
        let amount = Number(exp.amount);
        let date = new Date(exp.date);

        let month = date.toLocaleString("en-IN", {
            month: "long",
            year: "numeric"
        });

        summary[month] = (summary[month] || 0) + amount;
    });

    for (let month in summary) {
        let li = document.createElement("li");
        li.textContent = `${month} → ₹${summary[month]}`;
        list.appendChild(li);
    }
}

/* ---------- CATEGORY CHART ---------- */
function displayChart() {
    let categoryTotals = {};

    expenses.forEach(exp => {
        let amount = Number(exp.amount);
        categoryTotals[exp.category] =
            (categoryTotals[exp.category] || 0) + amount;
    });

    let labels = Object.keys(categoryTotals);
    let data = Object.values(categoryTotals);

    let ctx = document.getElementById("expenseChart").getContext("2d");

    if (chart) chart.destroy(); // prevent duplicate chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4caf50",
                    "#9c27b0"
                ]
            }]
        }
    });
}

/* ---------- DELETE ---------- */
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    refreshUI();
}

/* ---------- NAVIGATION ---------- */
function goBack() {
    window.location.href = "add.html";
}


function refreshUI() {
    displayExpenses();
    displayMonthlySummary();
    displayChart();
}


refreshUI();
