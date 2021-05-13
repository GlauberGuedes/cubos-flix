import './asside-sacola.css';
import mais from "../assets/images/plus-icon.svg";
import menos from "../assets/images/minus-icon.svg";
import lixeira from "../assets/images/trash-icon.svg";
import sacolaImg from "../assets/images/bag-icon.svg";
import figuraSacola from "../assets/images/person-illustration.svg";
import cupomSacola from "../assets/images/coupon-icon.svg";

export default function AssideSacola ({setCupomAplicado, sacola, adicionarFilmeSacola, adicionarFilme, inputDesconto, valorTotal, cupomAplicado, setValorTotal, setAdicionarFilmeSacola}) {
    
    function inputDesconto(e) {
        if(e.key !== "Enter") return;
        if(e.target.value === "htmlnaoelinguagem" && !cupomAplicado) {
          setCupomAplicado(true);
          const localCupom = true;
          localStorage.setItem('cupom', localCupom);
        }
        return;
      }

    function retirarFilme (filme) {
        const jaTemOFilme = adicionarFilmeSacola.find(adicionar => adicionar.title === filme.title);
        if(jaTemOFilme) {
          const adicionarFilmeAlterado = adicionarFilmeSacola.map(filmeDaSacola => {
            if(filmeDaSacola.title === filme.title) {
              filmeDaSacola.quantidade = filmeDaSacola.quantidade - 1;
                if(cupomAplicado) {
                  const novoValor = valorTotal - (0.9 * filmeDaSacola.price);
                  localStorage.setItem('valor', novoValor);
                  setValorTotal(valorTotalAnterior => valorTotalAnterior - (0.9 * filmeDaSacola.price));
                } else {
                  const novoValor = valorTotal - filmeDaSacola.price;
                  localStorage.setItem('valor', novoValor);
                  setValorTotal(valorTotalAnterior => valorTotalAnterior - filmeDaSacola.price);
                }
              return filmeDaSacola;
            } else {
              return filmeDaSacola;
            }
          });
      
          setAdicionarFilmeSacola(adicionarFilmeAlterado);
          const arrayFilmeSacola = adicionarFilmeAlterado;
          localStorage.setItem('filme', JSON.stringify(arrayFilmeSacola));
        }
      }
    
    return (
        <div className="asside-sacola">
          <div className="sacola">
            <img src={sacolaImg}/>
            <h2>Sacola</h2>
          </div>
          <div className="conteudo-sacola">
            <h2>Sua sacola está vazia</h2>
            <p>Adicione filmes agora</p>
            <div className="figura-sacola" style={{display: !sacola ? "" : "none"}}>
              <img src={figuraSacola}/>
            </div>
            {adicionarFilmeSacola.map(filmeSacola => {
              return (
                <div className="filme-sacola" style={{display: !sacola || filmeSacola.quantidade === 0 ? "none" : ""}} >
                  <div className="imagem-valor">
                    <img id="imagem-filme" src={filmeSacola.backgroundImg}/>
                    <div className="nome-valor">
                    <p>{filmeSacola.title}</p>
                    <p>R$ {filmeSacola.price}</p>
                    </div>
                  </div>
                  <div className="quantidade">
                    <button onClick={() => adicionarFilme(filmeSacola)}><img src={mais}/></button>
                    <p>{filmeSacola.quantidade}</p>
                    <button onClick={() => retirarFilme(filmeSacola)}><img src={filmeSacola.quantidade === 1 ? lixeira : menos}/></button>
                  </div>
                </div>
              )             
            })}           
            <div className="cupom-sacola">
              <label forHTML="cupom">Insira seu cupom</label>
              <div className="input-cupom">
                <input onKeyPress={(e) => inputDesconto(e)} id="cupom" placeholder="Cupom de desconto"/>
                <img src={cupomSacola}/>
              </div>
            </div>
            <div className="botao-confirmar-dados" style={{display: sacola ? "" : "none"}}>
              <button>
                Confirme seus dados <span>R$ {valorTotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
          </div>
    )
}