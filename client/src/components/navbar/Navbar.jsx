import "./navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Navbar = ({ user }) => {
  const Logout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        "http://localhost:5000/api/mov/users/logout",
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        window.setTimeout(() => {
          alert("successfully logged out");
          window.location.assign("/");
          //to navigate to '/' after 1 sec
        }, 1000);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link to="/" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          {user && <span>My List</span>}
        </div>
        <div className="right">
          {user ? (
            <>
              <button className="ui red button" type="submit" onClick={Logout}>
                Logout
              </button>
              <Link to="/profile">
                <img
                  src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="ui diy button" type="submit">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="ui red button" type="submit">
                  SignUp
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
