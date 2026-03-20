import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;


//Color Pallete: https://colorhunt.co/palette/fff8f0c085528c5a3c4b2e2b