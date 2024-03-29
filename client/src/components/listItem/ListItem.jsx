import "./listItem.scss";
import { Add, ThumbUpAltOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import dropdownItems from "../../utils/movieStatus";

export default function ListItem({ user, item, index, setUser }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const baseURL = "https://image.tmdb.org/t/p/original/";

  const addToWatchList = async (e) => {
    console.log(movie);
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/mov/users/addToWatchList",
        data: {
          movie_id: movie._id,
          movie_status: dropdownItems[0],
        },
        withCredentials: true,
      });
      if (res.data.status === "success") {
        if (res.data.user) {
          setUser(res.data.user);
          alert("added movie to watch list");
        } else {
          alert("movie already in watch list");
        }
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/mov/movies/${item}`
        );
        setMovie(res.data.movie);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [item]);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 245 - 50 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={baseURL + movie?.imgFeatured} alt="" />
      {isHovered && (
        <>
          <div className="itemInfo">
            <div className="row1">
              <span>{movie?.title}</span>
              <div className="icons">
                {user && (
                  <>
                    <div className="icon-wrapper" onClick={addToWatchList}>
                      <Add className="icon" />
                    </div>
                    <ThumbUpAltOutlined className="icon" />
                  </>
                )}
              </div>
            </div>
            <div className="itemInfoTop">
              <span className="limit">{`+${movie?.limit}`}</span>
              <span>{movie?.year}</span>
            </div>
            <div className="desc">{movie?.desc.split(".")[0]}</div>
            <div className="genre">{movie?.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
