import "./login.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signIn = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/mov/users/login",
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        withCredentials: true,
      });

      if (res.data.status === "success") {
        alert("Logged in successfully");
        window.setTimeout(() => {
          window.location.assign("/");
          //to navigate to '/' after 1 sec
        }, 1000);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="login">
      <div className="wrapper">
        <form className="ui form">
          <h2 class="ui dividing header">Login</h2>
          <div className="field">
            <label>Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="abc@xmail.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="••••••••••••"
            />
          </div>
          <Link to="/forgotPassword">
            <div className="forgot-password">
              <span>Forgot password?</span>
            </div>
          </Link>
          <button class="ui primary button" type="submit" onClick={signIn}>
            Login
          </button>
          <Link to="/signup">
            <button className="ui red button" type="submit">
              SignUp
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
