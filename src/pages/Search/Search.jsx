import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents, loading } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h2>Busca</h2>
      <div>
        {loading && <p>Carregando...</p>}
        {documents && documents.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/" className="btn btn-dark">
              Voltar!
            </Link>
          </div>
        )}
        {documents &&
          documents.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
