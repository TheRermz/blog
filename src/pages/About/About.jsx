import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o mini<span>Blog</span>
      </h2>
      <p>
        Este é um projeto feito com react no front-end e firebase no backend
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
