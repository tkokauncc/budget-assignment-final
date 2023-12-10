import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../custom-hooks/useAuth";
import Header from "../components/Header";

const CreateCategoryPage = () => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(token);
      const response = await axios.post(
        "/api/category",
        {
          name,
          budget,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setName("");
      setBudget("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        // width: "100vw",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <div
        style={{
          background: "#eff0f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>Create Category</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="budget">Budget:</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
