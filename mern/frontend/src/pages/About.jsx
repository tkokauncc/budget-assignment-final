import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <div
        style={{
          background: "#c9c1c1",
          borderRadius: "8px",
          width: "500px",
          padding: "30px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Welcome to the Personal Budget App!
        </h2>
        <p>
          Our app simplifies personal finance management, offering an intuitive
          interface and powerful tools to help you effectively manage your
          finances.
        </p>
        <p>
          Budgeting is made easy—you can set up budgets for various categories
          like groceries, transportation, entertainment, and more. This helps
          you understand where your money goes, empowering you to reach your
          financial goals.
        </p>
        <p>
          Tracking expenses is effortless. Simply log your expenses with details
          like amount spent, date, and category. You can even monitor recurring
          expenses for better planning.
        </p>
        <p>
          Visualize your data through graphs and charts. These visual
          representations provide insights into spending patterns, budget
          progress, and expense trends, enabling smarter financial decisions.
        </p>
        <p>
          Your financial data is secured with encryption and stringent privacy
          measures, ensuring confidentiality and peace of mind.
        </p>
        <p>
          Take charge of your finances today with the Personal Budget App. Start
          managing budgets, tracking expenses, and visualizing financial
          progress for a secure and better future.
        </p>
      </div>
    </div>
  );
};

export default About;
