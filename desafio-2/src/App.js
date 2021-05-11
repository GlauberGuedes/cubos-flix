
import './App.css';
import Movies from "./data";
import logo from "./assets/images/logo.svg";
import fotoPerfil from "./assets/images/profile.jpg";
import cupom from "./assets/images/coupon-circle-icon.svg";
import relogio from "./assets/images/time-icon.svg";
import favoritos from "./assets/images/bookmark-icon.svg";
import Promocoes from "./assets/images/promotion-icon.svg";
import dinheiro from "./assets/images/money.png";
import estrela from "./assets/images/star.svg";
import estrelaDourada from "./assets/images/golden-star.svg";
import sacola from "./assets/images/bag-icon.svg";
import figuraSacola from "./assets/images/person-illustration.svg";
import cupomSacola from "./assets/images/coupon-icon.svg";
import mais from "./assets/images/plus-icon.svg";
import menos from "./assets/images/minus-icon.svg";
import lixeira from "./assets/images/trash-icon.svg";
import {useEffect, useState, useRef} from "react";



function App() {
const topFilme = Movies.slice(0, 5);
const [topFilmes, setTopFilmes] = useState(topFilme);
const [todosOsFilmes, setTodosOsFilmes] = useState(Movies);
const [nomeInput, setNomeInput] = useState("");
const [nomeFiltroInput, setNomeFiltroInput] = useState("");
const [filtroBotao, setFiltroBotao] = useState("");
const [botaoAcaoSelecionado, setBotaoAcaoSelecionado] = useState(false);
const [botaoRomanceSelecionado, setBotaoRomanceSelecionado] = useState(false);
const [botaoFiccaoSelecionado, setBotaoFiccaoSelecionado] = useState(false);
const [botaoTerrorSelecionado, setBotaoTerrorSelecionado] = useState(false);
const [cupom, setCupom] = useState(false);
const [tempoCupom, setTempoCupom] = useState(20);
const intervalId = useRef();

const minutos = `${Math.floor(tempoCupom / 60)}`.padStart(2,"0");
const segundos = `${tempoCupom % 60}`.padStart(2,"0");

useEffect (() => {
  if(tempoCupom !== 0) {
    intervalId.current = setInterval(() => {
      setTempoCupom(tempoAnterior => tempoAnterior - 1);
    },1000);
    return () => {
      clearInterval(intervalId.current);
    }
  }
},[tempoCupom]);


const todosOsFilmesFiltrado = filtrarFilmes(nomeFiltroInput, filtroBotao);

function filtrarPorNomeInput (e) {
  if(e.key !== "Enter") return;
  setNomeFiltroInput(nomeInput);

}

function filtrarFilmes (nome, nomeBotao) {
  if (nome) {
    return todosOsFilmes.filter(filmes => filmes.title.includes(nome));
  } else if (nomeBotao) {
    return todosOsFilmes.filter(filmes => filmes.categories.find(categoria => categoria === nomeBotao));
  } else {
    return todosOsFilmes;
  }
}

useEffect (() => {
  if(!botaoAcaoSelecionado && !botaoFiccaoSelecionado && !botaoRomanceSelecionado && !botaoTerrorSelecionado) {
    return setFiltroBotao("");
  }
},[botaoAcaoSelecionado,botaoFiccaoSelecionado,botaoRomanceSelecionado,botaoTerrorSelecionado]);

  return (
    <div className="container">
      <header>
        <div className="logo-pesquisa">
        <img src={logo}/>
        <div className="pesquisar">
          <input id="pesquisar" placeholder = "Pesquise filmes..." value={nomeInput} onChange={(e) => setNomeInput(e.target.value)} onKeyPress={(e) => filtrarPorNomeInput(e)}/>
          <button onClick={() => setNomeFiltroInput(nomeInput)}><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.84448" cy="6.84448" r="5.99243" stroke="white" stroke-width="1.00001" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M11.0122 11.3232L13.3616 13.6665" stroke="white" stroke-width="1.00001" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></button>
        </div>

        </div>
        <div className="favorito">
          <img src={favoritos}/>
          <p>Favoritos</p>
        </div>
        <div className="favorito">
          <img src={Promocoes}/>
          <p>Promoções</p>
        </div>
        <div className="favorito">
          <p>Bem vindo Dina</p>
          <img src={fotoPerfil} width="56px" height="56px"/>
        </div>
      </header>
      <div className="main">
        <div className="conteudo">
          <div onClick={() => setCupom(true)} className="cupom" style={{display: `${cupom || tempoCupom === 0 ? "none" : ""}`}}>
            <div className="titulo-cupom">
              <h1>APROVEITE AGORA</h1>
              <div className="numero-cupom">
                <img src={cupom}/>
                <p>CUPOM: htmlnaoelinguagem</p>
              </div>
            </div>
            <div className="tempo-cupom">
              <h3>FINALIZA EM:</h3>
              <div className="tempo">
                <img src={relogio}/>
                {minutos} : {segundos}
              </div>
            </div>
            <img id="dinheiro" src={dinheiro}/>
          </div>
          <div className="top-filmes">
            <h2>Top Filmes</h2>
            <div className="lista-top-filmes">
              {topFilmes.map(filme => {
                return (
                  <div className="card-filme" style= {{backgroundImage: `url(${filme.backgroundImg})`}}>
                    <img  id="estrela" src={estrela}/>
                    <div className="card-bottom">
                    <div className="nome-avaliacao">
                      <h4>{filme.title}</h4>
                      <div className="avaliacao">
                        <img src={estrelaDourada}/>
                        <span>{filme.starsCount}</span>
                      </div>
                    </div>
                    <button>Sacola <span>R$ {`${filme.price}`.replace(".",",")}</span></button>
                    </div>
                  </div>
                )
              })}
              </div>
              <div className="filmes">
                <h2>Filmes</h2>
                <div className="filtro-buttons">
                  <button onClick={() => {
                    setFiltroBotao("");
                    setBotaoAcaoSelecionado(false);
                    setBotaoRomanceSelecionado(false);
                    setBotaoFiccaoSelecionado(false);
                    setBotaoTerrorSelecionado(false);
                    }} className={!botaoAcaoSelecionado && !botaoFiccaoSelecionado && !botaoRomanceSelecionado && !botaoTerrorSelecionado ? "button-selecionado" : ""}>Todos</button>
                  <button onClick={() => {
                    setFiltroBotao("action");
                    setBotaoAcaoSelecionado(!botaoAcaoSelecionado);
                    setBotaoRomanceSelecionado(false);
                    setBotaoFiccaoSelecionado(false);
                    setBotaoTerrorSelecionado(false);
                    }} className={botaoAcaoSelecionado ? "button-selecionado" : ""}>Ação</button>
                  <button onClick={() => {
                    setFiltroBotao("romance");
                    setBotaoRomanceSelecionado(!botaoRomanceSelecionado);
                    setBotaoAcaoSelecionado(false);
                    setBotaoFiccaoSelecionado(false);
                    setBotaoTerrorSelecionado(false);
                    }} className={botaoRomanceSelecionado ? "button-selecionado" : ""}>Romance</button>
                  <button onClick={() => {
                    setFiltroBotao("science fiction");
                    setBotaoFiccaoSelecionado(!botaoFiccaoSelecionado);
                    setBotaoRomanceSelecionado(false);
                    setBotaoAcaoSelecionado(false);
                    setBotaoTerrorSelecionado(false);
                    }} className={botaoFiccaoSelecionado ? "button-selecionado" : ""}>Ficção científica</button>
                  <button onClick={() => {
                    setFiltroBotao("horror");
                    setBotaoTerrorSelecionado(!botaoTerrorSelecionado);
                    setBotaoRomanceSelecionado(false);
                    setBotaoFiccaoSelecionado(false);
                    setBotaoAcaoSelecionado(false);
                    }} className={botaoTerrorSelecionado ? "button-selecionado" : ""}>Terror</button>
                </div>
                <div className="lista-todos-filmes">
                  {todosOsFilmesFiltrado.map(filme => {
                    return (
                      <div className="card-filme" style= {{backgroundImage: `url(${filme.backgroundImg})`}}>
                        <img  id="estrela" src={estrela}/>
                        <div className="card-bottom">
                        <div className="nome-avaliacao">
                          <h4>{filme.title}</h4>
                          <div className="avaliacao">
                            <img src={estrelaDourada}/>
                            <span>{filme.starsCount}</span>
                          </div>
                        </div>
                        <button>Sacola <span>R$ {`${filme.price}`.replace(".",",")}</span></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>
        </div>
        <div className="asside">
          <div className="asside-sacola">
          <div className="sacola">
            <img src={sacola}/>
            <h2>Sacola</h2>
          </div>
          <div className="conteudo-sacola">
            <h2>Sua sacola está vazia</h2>
            <p>Adicione filmes agora</p>
            <div className="figura-sacola" style={{display: "none"}}>
              <img src={figuraSacola}/>
            </div>
            <div className="filme-sacola">
              <div className="imagem-valor">
                <img id="imagem-filme"/>
                <div className="nome-valor">
                  <p>Joker</p>
                  <p>R$2,49</p>
                </div>
              </div>
              <div className="quantidade">
                <button><img src={mais}/></button>
                <p>1</p>
                <button><img src={lixeira}/></button>
              </div>
            </div>
            <div className="cupom-sacola">
              <label forHTML="cupom">Insira seu cupom</label>
              <div className="input-cupom">
                <input id="cupom" placeholder="Cupom de desconto"/>
                <img src={cupomSacola}/>
              </div>
            </div>
            <div className="botao-confirmar-dados">
              <button>
                Confirme seus dados <span>R$4,98</span>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
