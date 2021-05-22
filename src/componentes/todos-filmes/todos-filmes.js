import "./todos-filmes.css";
import estrelaDourada from "../assets/images/golden-star.svg";

import { useState } from "react";

export default function TodosFilmes({
  adicionarFilme,
  nomeFiltroInput,
  todosOsFilmes,
  setTodosOsFilmes,
  setNomeInput,
  filtrarPorNomeInput,
  nomeInput,
  setNomeFiltroInput
}) {
  const [botaoAcaoSelecionado, setBotaoAcaoSelecionado] = useState(false);
  const [botaoRomanceSelecionado, setBotaoRomanceSelecionado] = useState(false);
  const [botaoFiccaoSelecionado, setBotaoFiccaoSelecionado] = useState(false);
  const [botaoTerrorSelecionado, setBotaoTerrorSelecionado] = useState(false);

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

  const todosOsFilmesFiltrado = filtrarFilmes(
    nomeFiltroInput,
    botaoFiccaoSelecionado,
    botaoAcaoSelecionado,
    botaoRomanceSelecionado,
    botaoTerrorSelecionado
  );

  function filtrarFilmes(
    nome,
    botaoFiccaoSelecionado,
    botaoAcaoSelecionado,
    botaoRomanceSelecionado,
    botaoTerrorSelecionado
  ) {
    const acao = botaoAcaoSelecionado ? "action" : "";
    const romance = botaoRomanceSelecionado ? "romance" : "";
    const ficcao = botaoFiccaoSelecionado ? "science fiction" : "";
    const terror = botaoTerrorSelecionado ? "horror" : "";

    if (nome) {
      return todosOsFilmes.filter((filmes) => filmes.title.includes(nome));
    } else if (
      botaoFiccaoSelecionado ||
      botaoAcaoSelecionado ||
      botaoRomanceSelecionado ||
      botaoTerrorSelecionado
    ) {
      return todosOsFilmes.filter((filmes) =>
        filmes.categories.find(
          (categoria) =>
            categoria === acao ||
            categoria === romance ||
            categoria === terror ||
            categoria === ficcao
        )
      );
    } else {
      return todosOsFilmes;
    }
  }

  return (
    <div className="filmes">
      <h2>Filmes</h2>
      <div className="pesquisar-filmes">
          <input
            id="pesquisar"
            placeholder="Pesquise filmes..."
            value={nomeInput}
            onChange={(e) => setNomeInput(e.target.value)}
            onKeyPress={(e) => filtrarPorNomeInput(e)}
          />
          <button onClick={() => setNomeFiltroInput(nomeInput)}>
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="6.84448"
                cy="6.84448"
                r="5.99243"
                stroke="white"
                strokeWidth="1.00001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.4"
                d="M11.0122 11.3232L13.3616 13.6665"
                stroke="white"
                strokeWidth="1.00001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      <div className="filtro-buttons">
        <button
          onClick={() => {
            setBotaoAcaoSelecionado(false);
            setBotaoRomanceSelecionado(false);
            setBotaoFiccaoSelecionado(false);
            setBotaoTerrorSelecionado(false);
          }}
          className={
            !botaoAcaoSelecionado &&
            !botaoFiccaoSelecionado &&
            !botaoRomanceSelecionado &&
            !botaoTerrorSelecionado
              ? "button-selecionado"
              : ""
          }
        >
          Todos
        </button>
        <button
          onClick={() => setBotaoAcaoSelecionado(!botaoAcaoSelecionado)}
          className={botaoAcaoSelecionado ? "button-selecionado" : ""}
        >
          Ação
        </button>
        <button
          onClick={() => setBotaoRomanceSelecionado(!botaoRomanceSelecionado)}
          className={botaoRomanceSelecionado ? "button-selecionado" : ""}
        >
          Romance
        </button>
        <button
          onClick={() => setBotaoFiccaoSelecionado(!botaoFiccaoSelecionado)}
          className={botaoFiccaoSelecionado ? "button-selecionado" : ""}
        >
          Ficção científica
        </button>
        <button
          onClick={() => setBotaoTerrorSelecionado(!botaoTerrorSelecionado)}
          className={botaoTerrorSelecionado ? "button-selecionado" : ""}
        >
          Terror
        </button>
      </div>
      <div className="lista-todos-filmes">
        {todosOsFilmesFiltrado.map((filme) => {
          return (
            <div
            key={todosOsFilmesFiltrado.indexOf(filme)}
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
