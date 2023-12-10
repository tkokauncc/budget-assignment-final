import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import CategoryBudgetPieChart from "../components/CategoryBudgetPieChart";
import BudgetExpenseBarChart from "../components/BudgetExpenseBarChart";
import ExpenseHistoryChart from "../components/ExpenseHistoryChart";
import { useAuth } from "../custom-hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      axios
        .get("/api/expenses", {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setExpenses(data.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
          if (err.response.status == 401) {
            navigate("/login");
          }
        });
      axios
        .get("/api/categories", {
          headers: {
            Authorization: token,
          },
        })
        .then((data) => {
          setCategories(data.data);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
          if (err.response.status == 401) {
            navigate("/login");
          }
        });
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="home_page">
        {categories && categories.length ? (
          <CategoryBudgetPieChart categories={categories} />
        ) : (
          <></>
        )}
        {categories.length && expenses.length ? (
          <BudgetExpenseBarChart categories={categories} expenses={expenses} />
        ) : (
          <></>
        )}
        {categories.length && expenses.length ? (
          <ExpenseHistoryChart categories={categories} expenses={expenses} />
        ) : (
          <></>
        )}
        {!categories.length && <div>No Categories found, please add them</div>}
        {!expenses.length && <div>No Expenses found, please add them</div>}
      </div>
    </>
  );
};

export default Home;
