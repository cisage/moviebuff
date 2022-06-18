import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home type="movie" />} />
          <Route path="series/*" element={<Home type="series" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
