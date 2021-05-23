import "./top-filmes.css";
import estrelaDourada from "../assets/images/golden-star.svg";
import { useRef } from "react";

export default function TopFilmes({
  adicionarFilme,
  todosOsFilmes,
  setTodosOsFilmes,
}) {
  const topFilmes = useRef(todosOsFilmes.slice(0, 5));

  function mudarFavorito(filme) {
    const filmeFavorito = todosOsFilmes.map((filmeTop) => {
      if (filmeTop.title === filme.title) {
        filmeTop.isStarred = !filmeTop.isStarred;
        return filmeTop;
      } else {
        return filmeTop;
      }
    });
    setTodosOsFilmes(filmeFavorito);
  }

  return (
    <div className="top-filmes">
      <h2>Top Filmes</h2>
      <div className="lista-top-filmes">
        {topFilmes.current.map((filme) => {
          return (
            <div key={topFilmes.current.indexOf(filme)}
              className="card-filme"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3) 100%), url(${filme.backgroundImg}) center center / cover no-repeat`,
              }}
            >
              <svg
                onClick={() => mudarFavorito(filme)}
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill={filme.isStarred ? "#FFFFFF" : ""}
                  d="M10 2L11.7961 7.52786H17.6085L12.9062 10.9443L14.7023 16.4721L10 13.0557L5.29772 16.4721L7.09383 10.9443L2.39155 7.52786H8.20389L10 2Z"
                  stroke="white"
                  strokeOpacity="0.83"
                />
              </svg>
              <div className="card-bottom">
                <div className="nome-avaliacao">
                  <h4>{filme.title}</h4>
                  <div className="avaliacao">
                    <img src={estrelaDourada} />
                    <span>{filme.starsCount}</span>
                  </div>
                </div>
                <button onClick={() => adicionarFilme(filme)}>
                  Sacola <span>R$ {`${filme.price}`.replace(".", ",")}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
