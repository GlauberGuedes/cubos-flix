import './top-filmes.css';
import estrela from "../assets/images/star.svg";
import estrelaDourada from "../assets/images/golden-star.svg";

export default function TopFilmes ({topFilmes, adicionarFilme}) {
    return (
        <div className="top-filmes">
            <h2>Top Filmes</h2>
            <div className="lista-top-filmes">
              {topFilmes.current.map(filme => {
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