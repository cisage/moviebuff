import "./myList.scss";
import Navbar from "../../components/navbar/Navbar";
import MovieCard from "../../components/movieCard/MovieCard";
const MyList = ({ user, setUser }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="myList">
        <div className="type">
          <span>movie</span>
        </div>
        <div className="watchList">
          {user?.watchList.map((item) => {
            return <MovieCard item={item} setUser={setUser} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyList;
