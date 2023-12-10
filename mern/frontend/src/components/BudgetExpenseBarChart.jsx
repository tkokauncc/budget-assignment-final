import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
function BudgetExpenseBarChart({ categories, expenses }) {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    if (categories && expenses) {
      var data = categories.map((x) => {
        const expensesInThisCategory = expenses.filter(
          (y) =>
            y.category._id == x._id &&
            new Date(expenses[0].date).getMonth() + 1 == month
        );
        const totalExpenses = expensesInThisCategory.reduce(
          (acc, cur) => acc + cur.amount,
          0
        );
        return [x.name, x.budget, totalExpenses];
      });
      data.unshift(["value", "budget", "expense"]);
      setChartData(data);
    }
  }, [categories, expenses, month]);

  const options = {
    title: "Budget Expense Comparison this year",
    chartArea: { width: "50%" },
  };
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div
      style={{
        background: "#eff0f4",
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        borderBottom: "1px solid black",
      }}
    >
      <div
        style={{
          width: "65%",
          margin: "auto",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "40px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span style={{ fontSize: "larger" }}>Select a month here: </span>
        <select
          value={month.toString()}
          onChange={(e) => {
            setMonth(Number(e.target.value));
          }}
          style={{
            padding: "5px",
          }}
        >
          {monthsArr.map((monthName, i) =>
            i < currentMonth ? (
              <option value={i + 1}>{monthName}</option>
            ) : (
              <></>
            )
          )}
        </select>
      </div>
      <div>
        {chartData ? (
          <Chart
            chartType="BarChart"
            width="80%"
            style={{
              margin: "auto",
            }}
            height="400px"
            data={chartData}
            options={options}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}

export default BudgetExpenseBarChart;
