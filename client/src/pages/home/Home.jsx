import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    //cant mark useEffect as async
    const getLists = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/mov/lists`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0YTJjYjNlOTRkMmNhZDBiZDRjZCIsImlhdCI6MTY1NjU4NjU3MywiZXhwIjoxNjU4NDg3MzczfQ.iA641RVd2FuHW4aP_JlOzkoJsoddn0CGvayZmJMIPCo",
          },
        });
        setLists(res.data.lists);
      } catch (err) {
        console.log(err);
      }
    };

    getLists();
  }, [type]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => {
        return <List list={list} />;
      })}
      <span className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ea dolore
        molestiae fugiat, dolorem, modi assumenda aliquam ducimus sequi
        temporibus voluptates! Reprehenderit eum eius officiis impedit sequi
        modi, fugiat molestias quia ea blanditiis adipisci autem est voluptate
        quam laudantium saepe, quod animi hic earum optio? Amet quo iste modi
        autem asperiores. Optio eum culpa atque eaque! Repellendus harum,
        distinctio veniam cumque quis vitae ex repudiandae cupiditate? Dolor
        tempora explicabo cumque incidunt pariatur quasi obcaecati blanditiis
        unde optio. Itaque, facilis. A atque debitis explicabo consequuntur?
        Omnis dolor non corrupti tenetur, aperiam commodi dolorum consequuntur
        corporis. Ratione soluta quasi, magnam voluptates non omnis quia dolore
        aperiam ut voluptas eius minus explicabo totam quidem modi facere optio
        commodi consequuntur provident expedita dignissimos tempore sunt aliquid
        vero. Iste dignissimos laboriosam, aliquid quas dicta ipsam, corrupti
        nihil temporibus vero inventore eos maxime nostrum non dolores aliquam
        obcaecati praesentium debitis quod excepturi maiores? Culpa a sed facere
        commodi aliquam expedita veniam, maiores unde vitae excepturi, labore id
        voluptates dolorum, illum error perspiciatis laborum et nulla corrupti
        dolores impedit quibusdam eveniet soluta? Ab hic consequuntur incidunt
        nemo ratione voluptates similique? Commodi, corrupti. Exercitationem
        provident, labore amet deserunt corrupti praesentium nam? Repellat qui,
        corporis expedita a eos totam.
      </span>
    </div>
  );
};

export default Home;
