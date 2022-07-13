import { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const signUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/mov/users/signup",
        data: {
          name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          passwordConfirm: passwordConfirmRef.current.value,
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
    <div className="register">
      <div className="wrapper">
        <form className="ui form">
          <h2 class="ui dividing header">SignUp</h2>
          <div className="field">
            <label>Name</label>
            <div className="two fields">
              <div className="field">
                <input
                  ref={firstNameRef}
                  type="text"
                  name="first-name"
                  placeholder="First Name"
                />
              </div>
              <div className="field">
                <input
                  ref={lastNameRef}
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
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
          <div className="field">
            <label>Retype Password</label>
            <input
              ref={passwordConfirmRef}
              type="password"
              name="rpassword"
              placeholder="••••••••••••"
            />
          </div>
          <button class="ui primary button" type="submit" onClick={signUp}>
            SignUp
          </button>
          <Link to="/login" className="link">
            <button className="ui red button" type="submit">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
