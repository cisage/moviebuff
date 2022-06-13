import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured type="movies"/>
      <List/>
      <List/>
      <List/>
      <List/>
      <span className="lorem">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptate, ipsam, asperiores commodi ipsa at dignissimos assumenda vero dolores voluptates cupiditate quaerat non maxime doloribus beatae, eligendi aliquam modi libero.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptate, ipsam, asperiores commodi ipsa at dignissimos assumenda vero dolores voluptates cupiditate quaerat non maxime doloribus beatae, eligendi aliquam modi libero.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eos ratione nostrum laborum quas voluptates itaque cupiditate, consectetur sed numquam vitae ipsum et facilis. Sed assumenda quis ad et? Voluptas!
      </span>
    </div>
  );
};

export default Home;