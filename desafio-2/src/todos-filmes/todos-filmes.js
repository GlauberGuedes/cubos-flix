import './todos-filmes.css';
import estrela from "../assets/images/star.svg";
import estrelaDourada from "../assets/images/golden-star.svg";

export default function TodosFilmes ({setBotaoAcaoSelecionado, setBotaoFiccaoSelecionado, setBotaoRomanceSelecionado, setBotaoTerrorSelecionado, todosOsFilmesFiltrado, adicionarFilme, botaoAcaoSelecionado, botaoFiccaoSelecionado, botaoRomanceSelecionado,botaoTerrorSelecionado}) {
    return (
        <div className="filmes">
                <h2>Filmes</h2>
                <div className="filtro-buttons">
                  <button onClick={() => {
                    setBotaoAcaoSelecionado(false);
                    setBotaoRomanceSelecionado(false);
                    setBotaoFiccaoSelecionado(false);
                    setBotaoTerrorSelecionado(false);
                    }} className={!botaoAcaoSelecionado && !botaoFiccaoSelecionado && !botaoRomanceSelecionado && !botaoTerrorSelecionado ? "button-selecionado" : ""}>Todos</button>
                  <button onClick={() => setBotaoAcaoSelecionado(!botaoAcaoSelecionado)} className={botaoAcaoSelecionado ? "button-selecionado" : ""}>Ação</button>
                  <button onClick={() => setBotaoRomanceSelecionado(!botaoRomanceSelecionado)} className={botaoRomanceSelecionado ? "button-selecionado" : ""}>Romance</button>
                  <button onClick={() => setBotaoFiccaoSelecionado(!botaoFiccaoSelecionado)} className={botaoFiccaoSelecionado ? "button-selecionado" : ""}>Ficção científica</button>
                  <button onClick={() => setBotaoTerrorSelecionado(!botaoTerrorSelecionado)} className={botaoTerrorSelecionado ? "button-selecionado" : ""}>Terror</button>
                </div>
                <div className="lista-todos-filmes">
                  {todosOsFilmesFiltrado.map(filme => {
                    return (
                      <div className="card-filme" style= {{background: `linear-gradient(rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3) 100%), url(${filme.backgroundImg}) center center / cover no-repeat`}}>
                        <img  id="estrela" src={estrela}/>
                        <div className="card-bottom">
                        <div className="nome-avaliacao">
                          <h4>{filme.title}</h4>
                          <div className="avaliacao">
                            <img src={estrelaDourada}/>
                            <span>{filme.starsCount}</span>
                          </div>
                        </div>
                        <button onClick={() => adicionarFilme(filme)}>Sacola <span>R$ {`${filme.price}`.replace(".",",")}</span></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
    )
}