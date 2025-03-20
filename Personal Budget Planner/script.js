// Personal Budget Planner - TypeScript
document.addEventListener("DOMContentLoaded", function () {
    var budgetInput = document.getElementById("budget");
    var setBudgetBtn = document.getElementById("set-budget");
    var remainingEl = document.getElementById("remaining");
    var progressBar = document.getElementById("progress-bar");
    var expenseName = document.getElementById("expense-name");
    var expenseAmount = document.getElementById("expense-amount");
    var expenseCategory = document.getElementById("expense-category");
    var addExpenseBtn = document.getElementById("add-expense");
    var expenseList = document.getElementById("expense-list");
    var filterCategory = document.getElementById("filter-category");
    var toggleDarkMode = document.getElementById("toggle-dark-mode");
    var totalBudget = 0;
    var remainingBudget = 0;
    var expenses = [];
    function updateUI() {
        remainingEl.textContent = "$".concat(remainingBudget);
        progressBar.style.width = "".concat((remainingBudget / totalBudget) * 100, "%");
    }
    setBudgetBtn.addEventListener("click", function () {
        totalBudget = Number(budgetInput.value);
        remainingBudget = totalBudget;
        updateUI();
    });
    addExpenseBtn.addEventListener("click", function () {
        var name = expenseName.value;
        var amount = Number(expenseAmount.value);
        var category = expenseCategory.value;
        if (!name || amount <= 0)
            return;
        expenses.push({ name: name, amount: amount, category: category });
        remainingBudget -= amount;
        updateExpenseList();
        updateUI();
    });
    function updateExpenseList() {
        expenseList.innerHTML = "";
        expenses.forEach(function (expense, index) {
            var row = document.createElement("tr");
            row.innerHTML = "\n                <td class='p-2'>".concat(expense.name, "</td>\n                <td class='p-2'>$").concat(expense.amount, "</td>\n                <td class='p-2'>").concat(expense.category, "</td>\n                <td class='p-2'><button class='bg-red-500 text-white px-2 py-1 rounded' data-index='").concat(index, "'>Delete</button></td>\n            ");
            expenseList.appendChild(row);
        });
    }
    expenseList.addEventListener("click", function (e) {
        var target = e.target;
        if (target.tagName === "BUTTON") {
            var index = Number(target.getAttribute("data-index"));
            remainingBudget += expenses[index].amount;
            expenses.splice(index, 1);
            updateExpenseList();
            updateUI();
        }
    });
    filterCategory.addEventListener("change", function () {
        var category = filterCategory.value;
        updateExpenseList();
        if (category !== "all") {
            expenses = expenses.filter(function (expense) { return expense.category === category; });
        }
    });
    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });
});
