import { useState } from "react";
import "./App.css";
import Demo from "./features/demo/Demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
