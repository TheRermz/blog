import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, image, body, tags);
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Título
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do post"
          />
        </label>

        <label htmlFor="image">
          Imagem
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL da imagem"
          />
        </label>

        <label htmlFor="body">
          Conteúdo
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Conteúdo do post"
          ></textarea>
        </label>
        <label htmlFor="tags">
          Tags
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separe as tags por vírgula"
          />
        </label>

        <button className="btn">Cadastrar</button>
        {/* {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Carregando...
          </button>
        )}
        {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  );
};

export default CreatePost;
