import "./movieCard.scss";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import dropdownItems from "../../utils/movieStatus";

const MovieCard = ({ item, setUser }) => {
  const [movie, setMovie] = useState({});
  const baseURL = "https://image.tmdb.org/t/p/original/";
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/mov/movies/${item.movie_id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0YTJjYjNlOTRkMmNhZDBiZDRjZCIsImlhdCI6MTY1NjU4NjU3MywiZXhwIjoxNjU4NDg3MzczfQ.iA641RVd2FuHW4aP_JlOzkoJsoddn0CGvayZmJMIPCo",
            },
          }
        );
        setMovie(res.data.movie);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [item]);

  const handleButtonClick = (e) => {
    setIsActive(!isActive);
  };

  const updateMovieInWatchList = async (e) => {
    console.log(e.target.textContent);
    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/api/mov/users/updateMovieInWatchList",
        data: {
          movie_id: item.movie_id,
          movie_status: e.target.textContent,
        },
        withCredentials: true,
      });
      if (res.data.status === "success") {
        setUser(res.data.user);
        setIsActive(!isActive);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const deleteMovieInWatchList = async (e) => {
    try {
      const res = await axios({
        method: "delete",
        url: "http://localhost:5000/api/mov/users/deleteMovieInWatchList",
        data: {
          movie_id: item.movie_id,
        },
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setUser(res.data.user);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="movieCard">
      <div className="thumbnail">
        <img src={baseURL + movie?.imgFeatured} alt="" />
      </div>
      <div className="info">
        <div className="movie_name">
          <span>{movie?.title}</span>
        </div>
        <div className="item_info">
          <div className="year_age-rating">
            <span>{movie?.year}</span>
            <span className="limit">{`+${movie?.limit}`}</span>
          </div>
          <div className="genre">
            <span>{movie?.genre}</span>
          </div>
        </div>
      </div>
      <div className="dropdown">
        <div
          className="dropdown_btn"
          style={{ top: isActive ? "75px" : "0px" }}
          onClick={handleButtonClick}
        >
          <span>{item?.movie_status}</span>
          <ArrowDropDownIcon />
        </div>
        {isActive && (
          <div className="dropdown_content">
            {dropdownItems.map((ditem) => {
              return (
                <div className="dropdown_item" onClick={updateMovieInWatchList}>
                  {ditem}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="deleteButton" onClick={deleteMovieInWatchList}>
        <DeleteIcon className="icon" />
      </div>
    </div>
  );
};

export default MovieCard;
