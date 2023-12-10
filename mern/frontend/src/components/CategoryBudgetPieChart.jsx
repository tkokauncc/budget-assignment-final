import React, { useMemo } from "react";
import Chart from "react-google-charts";

function CategoryBudgetPieChart({ categories }) {
  const categoriesData = useMemo(() => {
    let result = categories.map((x) => [x.name, x.budget]);
    result.unshift(["Category", "Budget"]);
    return result;
  }, [categories]);

  const options = {
    title: "Category Budget Visualization",
  };

  return (
    <div
      style={{
        background: "#eff0f4",
        padding: "30px 0px",
        borderBottom: "1px solid black",
      }}
    >
      <Chart
        chartType="PieChart"
        data={categoriesData}
        options={options}
        width={"80%"}
        style={{
          margin: "auto",
        }}
        height={"400px"}
      />
    </div>
  );
}

export default CategoryBudgetPieChart;
