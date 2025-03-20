class BudgetPlanner {
    private budget: number = 0;
    private remaining: number = 0;
    private expenses: { name: string; amount: number; category: string }[] = [];

    constructor() {
        this.loadFromLocalStorage();
        this.attachEventListeners();
        this.updateUI();
    }

    private attachEventListeners(): void {
        document.getElementById('set-budget')?.addEventListener('click', () => this.setBudget());
        document.getElementById('add-expense')?.addEventListener('click', () => this.addExpense());
        document.getElementById('filter-category')?.addEventListener('change', () => this.updateUI());
    }

    private setBudget(): void {
        const budgetInput = document.getElementById('budget') as HTMLInputElement;
        this.budget = parseFloat(budgetInput.value) || 0;
        this.remaining = this.budget;
        this.saveToLocalStorage();
        this.updateUI();
    }

    private addExpense(): void {
        const nameInput = document.getElementById('expense-name') as HTMLInputElement;
        const amountInput = document.getElementById('expense-amount') as HTMLInputElement;
        const categoryInput = document.getElementById('expense-category') as HTMLSelectElement;

        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value) || 0;
        const category = categoryInput.value;

        if (!name || amount <= 0) {
            alert('Please enter valid expense details');
            return;
        }

        this.expenses.push({ name, amount, category });
        this.remaining -= amount;
        this.saveToLocalStorage();
        this.updateUI();
    }

    private updateUI(): void {
        document.getElementById('remaining')!.textContent = `$${this.remaining.toFixed(2)}`;
        this.updateProgressBar();
        this.renderExpenses();
    }

    private updateProgressBar(): void {
        const progressBar = document.getElementById('progress-bar') as HTMLElement;
        const percentage = this.budget > 0 ? (this.remaining / this.budget) * 100 : 0;
        progressBar.style.width = `${Math.max(0, percentage)}%`;
    }

    private renderExpenses(): void {
        const expenseList = document.getElementById('expense-list') as HTMLElement;
        const filterCategory = (document.getElementById('filter-category') as HTMLSelectElement).value;
        
        expenseList.innerHTML = '';
        this.expenses.filter(exp => filterCategory === 'all' || exp.category === filterCategory)
            .forEach((exp, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-2">${exp.name}</td>
                    <td class="p-2">$${exp.amount.toFixed(2)}</td>
                    <td class="p-2">${exp.category}</td>
                    <td class="p-2">
                        <button onclick="planner.deleteExpense(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                `;
                expenseList.appendChild(row);
            });
    }

    deleteExpense(index: number): void {
        this.remaining += this.expenses[index].amount;
        this.expenses.splice(index, 1);
        this.saveToLocalStorage();
        this.updateUI();
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('budgetPlanner', JSON.stringify({ budget: this.budget, remaining: this.remaining, expenses: this.expenses }));
    }

    private loadFromLocalStorage(): void {
        const data = localStorage.getItem('budgetPlanner');
        if (data) {
            const parsedData = JSON.parse(data);
            this.budget = parsedData.budget;
            this.remaining = parsedData.remaining;
            this.expenses = parsedData.expenses;
        }
    }
}

const planner = new BudgetPlanner();
(window as any).planner = planner;
