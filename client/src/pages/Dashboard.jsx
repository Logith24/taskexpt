import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import "../styles/dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    const filtered = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(filtered);
  };

  const total = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <div className="summary-card">
          <h2>Total Expenses</h2>
          <h1>₹ {total}</h1>
        </div>

        <ExpenseForm addExpense={addExpense} />

        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      </div>
    </div>
  );
}

export default Dashboard;