import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;


//Color Pallete: https://colorhunt.co/palette/fff8f0c085528c5a3c4b2e2b