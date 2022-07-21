import "./myList.scss";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import MovieCard from "../../components/movieCard/MovieCard";
const MyList = ({ user }) => {
  const [dummyUser, setDummyUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/mov/users/isLoggedIn",
        { withCredentials: true }
      );
      setDummyUser(res.data.user);
    };

    getUser();
  }, []);
  return (
    <>
      <Navbar user={user} />
      <div className="myList">
        <div className="type">
          <span>movie</span>
        </div>
        <div className="watchList">
          {dummyUser?.watchList.map((item) => {
            return <MovieCard item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyList;
