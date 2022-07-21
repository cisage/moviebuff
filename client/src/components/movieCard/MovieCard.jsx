import "./movieCard.scss";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const MovieCard = ({ item }) => {
  const [movie, setMovie] = useState({});
  const baseURL = "https://image.tmdb.org/t/p/original/";
  const [isActive, setIsActive] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("Plan to Watch");
  const dropdownItems = [
    "Plan to Watch",
    "Dropped",
    "On Hold",
    "Completed",
    "Currently Watching",
  ];

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/mov/movies/${item}`,
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
          <span>{selectedDropdown}</span>
          <ArrowDropDownIcon />
        </div>
        {isActive && (
          <div className="dropdown_content">
            {dropdownItems.map((item) => {
              return (
                <div
                  className="dropdown_item"
                  onClick={(e) => {
                    setSelectedDropdown(e.target.textContent);
                    setIsActive(!isActive);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
