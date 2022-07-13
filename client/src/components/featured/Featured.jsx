import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./featured.scss";

export default function Featured({ type }) {
  const [featuredMovie, setFeaturedMovie] = useState({});
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const getFeaturedMovie = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/mov/movies/random`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0YTJjYjNlOTRkMmNhZDBiZDRjZCIsImlhdCI6MTY1NjU4NjU3MywiZXhwIjoxNjU4NDg3MzczfQ.iA641RVd2FuHW4aP_JlOzkoJsoddn0CGvayZmJMIPCo",
          },
        }
      );
      setFeaturedMovie(res.data.movie[0]);
    };

    getFeaturedMovie();
  }, [type]);

  return (
    <div className="featured">
      {/* {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
        </div>
      )} */}
      {console.log(featuredMovie)}
      <img src={baseURL + featuredMovie?.imgFeatured} alt="" />
      <div className="movie__name">
        <span>{featuredMovie?.title}</span>
      </div>
      <div className="info">
        {/* <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
        /> */}
        <span className="desc">{featuredMovie?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
