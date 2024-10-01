const expenseAmount = document.getElementById('expenseAmount');
const expenseDescription = document.getElementById('expenseDescription');
const expenseCategory = document.getElementById('expenseCategory');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseList = document.getElementById('expenseList');

function addExpense()
{
    const amount = expenseAmount.value;
    const description = expenseDescription.value;
    const category = expenseCategory.value;

    if(amount === '' || description === '')
    {
        alert('fill in all fields');
        return;
    }
    
    const expense = {
        id: Date.now(),
        amount,
        description,
        category
    };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);

    localStorage.setItem('expenses',JSON.stringify(expenses));
    displayExpenses();
    resetForm();


}

function displayExpenses()
{
    expenseList.innerHTML = '';
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense =>
    {
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${expense.amount} - ${expense.description} (${expense.category})
                        <span>
                            <button class="btn btn-sm btn-danger me-2" onclick="deleteExpense(${expense.id})" >Delete</button>
                            <button class="btn btn-sm btn-warning" onclick="editExpense(${expense.id})" >Edit</button>
                        </span>`;
        expenseList.appendChild(li);      

    });
    
}

function deleteExpense(id) {
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    expenses = expenses.filter(expense => expense.id !== id);

    
    localStorage.setItem('expenses', JSON.stringify(expenses));

    
    displayExpenses();
}
function editExpense(id) {
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    
    const expenseToEdit = expenses.find(expense => expense.id === id);

    
    expenseAmount.value = expenseToEdit.amount;
    expenseDescription.value = expenseToEdit.description;
    expenseCategory.value = expenseToEdit.category;

    
    expenses = expenses.filter(expense => expense.id !== id);

    
    localStorage.setItem('expenses', JSON.stringify(expenses));
}


function resetForm() {
    expenseAmount.value = '';
    expenseDescription.value = '';
    expenseCategory.value = 'fuel';  // Reset to the default category
}


addExpenseBtn.addEventListener('click', addExpense);


window.onload = displayExpenses;



