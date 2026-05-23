function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="expense-list">
      <h2>Expense History</h2>

      {expenses.length === 0 ? (
        <p className="empty-text">No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <div className="expense-item" key={expense.id}>
            <div className="expense-info">
              <h3>{expense.title}</h3>

              <span className="category-tag">
                {expense.category}
              </span>

              <p>₹ {expense.amount}</p>
            </div>

            <button onClick={() => deleteExpense(expense.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;