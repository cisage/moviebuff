import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import { useRef } from "react";
import axios from "axios";

const Profile = ({ user }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const currentPasswordRef = useRef(null);
  console.log(user);

  const saveDetails = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/api/mov/users/updateMe",
        data: {
          name: firstNameRef.current.value,
          email: emailRef.current.value,
        },
        withCredentials: true,
      });

      if (res.data.status === "success") {
        alert("Saved details successfully");
        window.setTimeout(() => {
          window.location.assign("/");
          //to navigate to '/' after 1 sec
        }, 1000);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const savePassword = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/api/mov/users/updatePassword",
        data: {
          passwordCurrent: currentPasswordRef.current.value,
          password: passwordRef.current.value,
          passwordConfirm: passwordConfirmRef.current.value,
        },
        withCredentials: true,
      });

      if (res.data.status === "success") {
        alert("updated password successfully");
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
    <div className="profile">
      <Navbar user={user} />
      <div className="wrapper">
        <div className="side-bar">
          <div className="side-bar-item">
            <div className="menuicon">
              <SettingsOutlinedIcon />
            </div>
            <span>MY PROFILE</span>
          </div>
          <div className="side-bar-item">
            <div className="menuicon">
              <LegendToggleIcon />
            </div>
            <span>MY STATISTICS</span>
          </div>
        </div>

        <div className="content">
          <form className="ui form">
            <h2 class="ui dividing header">My Profile</h2>
            <div className="field">
              <label>Name</label>
              <div className="field">
                <input
                  ref={firstNameRef}
                  type="text"
                  name="first-name"
                  placeholder={user.name}
                />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder={user.email}
              />
            </div>
            <button class="ui red button" type="submit" onClick={saveDetails}>
              Save Details
            </button>
          </form>

          <form className="ui form">
            <h2 class="ui dividing header">Password Change</h2>
            <div className="field">
              <label>Current Password</label>
              <input
                ref={currentPasswordRef}
                type="password"
                name="cpassword"
                placeholder="••••••••••••"
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
            <button class="ui red button" type="submit" onClick={savePassword}>
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
