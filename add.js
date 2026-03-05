let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    let title = document.getElementById("title").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if (title === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    let expense = {
        title,
        amount,               
        category,
        date: new Date().toISOString() 
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense Added ✅");

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}

function goToView() {
    window.location.href = "view.html";
}
