import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import CreateCategoryPage from "./pages/CreateCategory";
import CreateExpensePage from "./pages/CreateExpense";
import About from "./pages/About";
function App() {
  return (
    <div>
      <div className="App" style={{ overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-category" element={<CreateCategoryPage />} />
          <Route path="/create-expense" element={<CreateExpensePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
