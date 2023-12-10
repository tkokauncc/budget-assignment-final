import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function calculateRemainingTime(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (decodedToken.exp) {
      const expiresIn = decodedToken.exp - currentTime;
      return expiresIn;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
  return 0;
}

export const useAuth = () => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [token, setToken] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  useEffect(() => {
    const updateRemainingTime = () => {
      const retrievedToken = localStorage.getItem("budget-token");
      if (!retrievedToken) {
        setRemainingTime(0);
      } else {
        const remainingTime = calculateRemainingTime(retrievedToken);
        setRemainingTime(remainingTime);
        setToken(retrievedToken);
        setTimeout(() => updateRemainingTime(), 1000);
      }
    };

    updateRemainingTime();

    window.addEventListener("storage", updateRemainingTime);
    return () => {
      window.removeEventListener("storage", updateRemainingTime);
    };
  }, []);
  const emailVerifiedItem = localStorage.getItem("budget-app-email-verified");

  return { remainingTime, token, emailVerified: emailVerifiedItem == "true" };
};
