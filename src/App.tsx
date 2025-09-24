import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/ProductListPage/ProductList";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage"; // <-- Import the page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
