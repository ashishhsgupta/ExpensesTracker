import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Menulist from "../CustomPage/Menulist";


const API_BASE = "http://localhost:4002/expanse/api/v1";
const COLORS = ["#00C49F", "#FF8042"];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getTransactions`);
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };


  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expanse" || t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

 
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  return (
    <div className="d-flex">
      <div className="dashboard-container">
        <Menulist />
      </div>

      <div className="container mt-2 mb-4">
        <h4 className="text-center mb-4">Dashboard Overview</h4>

<div className="border rounded p-4">
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Total Income</h5>
              <h4 className="text-success">₹{totalIncome.toFixed(2)}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Total Expense</h5>
              <h4 className="text-danger">₹{totalExpense.toFixed(2)}</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Balance</h5>
              <h4 className={balance >= 0 ? "text-success" : "text-danger"}>
                ₹{balance.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        <div className="row">
         
          <div className="col-md-6">
            <h5 className="text-center mb-3">Income vs Expense (Pie Chart)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          
          <div className="col-md-6">
            <h5 className="text-center mb-3">Income vs Expense (Bar Chart)</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
