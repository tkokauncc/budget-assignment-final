import React from "react";
import { useAuth } from "../custom-hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const { remainingTime: tokenValidTime, token, emailVerified } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (tokenValidTime != null && tokenValidTime <= 0) {
      localStorage.removeItem("budget-token");
      localStorage.removeItem("budget-app-email-verified");
      navigate("/login");
    }
  }, [tokenValidTime, navigate]);

  function handleRefreshToken() {
    axios
      .get("/refresh-token", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        localStorage.setItem("budget-token", data.data.token);
      });
  }
  return (
    <div
      style={{
        // position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      <div className="header-container">
        <Link to={"/"}>
          <div className="left">Personal Budget Tracker</div>
        </Link>
        <div className="right">
          <Link
            to="/create-category"
            style={{
              cursor: "pointer",
            }}
          >
            <span>Configure Budget</span>
          </Link>
          <Link
            to="/create-expense"
            style={{
              cursor: "pointer",
            }}
          >
            <span>Create Expense</span>
          </Link>
          <div>
            <span
              style={{
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.removeItem("budget-token");
                localStorage.removeItem("budget-app-email-verified");
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>

      {tokenValidTime < 21 && (
        <div
          style={{
            width: "100vw",
            background: "#ff3737",
            padding: "15px",
            fontSize: "larger",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <span>Token is going to expire in {tokenValidTime} seconds</span>
          <button
            style={{
              outline: "none",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={handleRefreshToken}
          >
            Refresh token
          </button>
        </div>
      )}
      {!emailVerified && (
        <div
          style={{
            height: "25px",
            textAlign: "center",
            background: "#f86d6d",
          }}
        >
          Please verify your email as soon as possible
        </div>
      )}
    </div>
  );
}

export default Header;
