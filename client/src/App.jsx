import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/profile/Profile";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/mov/users/isLoggedIn",
        { withCredentials: true }
      );
      setUser(res.data.user);
    };

    getUser();
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home type="movies" user={user} />} />
          <Route path="series/*" element={<Home type="series" user={user} />} />
          <Route path="signup/*" element={<Register />} />
          <Route path="login/*" element={<Login />} />
          <Route path="profile/*" element={<Profile user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
