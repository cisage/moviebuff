import "./listItem.scss";
import { Add, ThumbUpAltOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ListItem({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const baseURL = "https://image.tmdb.org/t/p/original/";

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
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
              </div>
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
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
