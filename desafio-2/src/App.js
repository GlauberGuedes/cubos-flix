import Cupom from "./cupom/cupom.js";
import Header from "./header/header.js";
import TopFilmes from "./top-filmes/top-filmes";
import TodosFilmes from "./todos-filmes/todos-filmes";
import AssideSacola from "./asside-sacola/asside-sacola";
import './App.css';
import Movies from "./data";
import logo from "./assets/images/logo.svg";
import fotoPerfil from "./assets/images/profile.jpg";
import favoritos from "./assets/images/bookmark-icon.svg";
import Promocoes from "./assets/images/promotion-icon.svg";
import sacolaImg from "./assets/images/bag-icon.svg";
import menu from "./assets/images/closed-menu.svg";
import fechar from "./assets/images/open-menu.svg";
import {useEffect, useState, useRef} from "react";

function App() {
const topFilme = Movies.slice(0, 5);
const topFilmes = useRef(topFilme);
const todosOsFilmes = useRef(Movies);
const [nomeInput, setNomeInput] = useState("");
const [nomeFiltroInput, setNomeFiltroInput] = useState("");
const [botaoAcaoSelecionado, setBotaoAcaoSelecionado] = useState(false);
const [botaoRomanceSelecionado, setBotaoRomanceSelecionado] = useState(false);
const [botaoFiccaoSelecionado, setBotaoFiccaoSelecionado] = useState(false);
const [botaoTerrorSelecionado, setBotaoTerrorSelecionado] = useState(false);
const [cupomExpirado, setCupomExpirado] = useState(localStorage.getItem('cupomUsado') ?? false);
const [tempoCupom, setTempoCupom] = useState(300);
const [adicionarFilmeSacola, setAdicionarFilmeSacola] = useState(JSON.parse(localStorage.getItem('filme')) ?? []);
const [sacola, setSacola] = useState(JSON.parse(localStorage.getItem('filme')) ? true : false);
const [valorTotal, setValorTotal] = useState(Number(localStorage.getItem('valor')) ?? 0);
const [cupomAplicado, setCupomAplicado] = useState(localStorage.getItem('cupom') ?? false);
const intervalId = useRef();

const minutos = `${Math.floor(tempoCupom / 60)}`.padStart(2,"0");
const segundos = `${tempoCupom % 60}`.padStart(2,"0");


useEffect (() => {
  if(tempoCupom === 0) {
    setCupomExpirado(true);
  }
  if(tempoCupom !== 0) {
    intervalId.current = setInterval(() => {
      setTempoCupom(tempoAnterior => tempoAnterior - 1);
    },1000);
    return () => {
      clearInterval(intervalId.current);
    }
  }
},[tempoCupom]);


const todosOsFilmesFiltrado = filtrarFilmes(nomeFiltroInput, botaoFiccaoSelecionado, botaoAcaoSelecionado, botaoRomanceSelecionado, botaoTerrorSelecionado);

function filtrarFilmes (nome, botaoFiccaoSelecionado, botaoAcaoSelecionado, botaoRomanceSelecionado, botaoTerrorSelecionado) {
    const acao = botaoAcaoSelecionado ? "action" : "";
    const romance = botaoRomanceSelecionado ? "romance" : "";
    const ficcao = botaoFiccaoSelecionado ? "science fiction" : "";
    const terror = botaoTerrorSelecionado ? "horror" : "";
  
  if (nome) {
    return todosOsFilmes.current.filter(filmes => filmes.title.includes(nome));
  } else if (botaoFiccaoSelecionado || botaoAcaoSelecionado || botaoRomanceSelecionado || botaoTerrorSelecionado) {
    return todosOsFilmes.current.filter(filmes => filmes.categories.find(categoria => categoria === acao || categoria === romance || categoria === terror || categoria === ficcao));
  } else {
    return todosOsFilmes.current;
  }
}

function adicionarFilme (filme) {
  const jaTemOFilme = adicionarFilmeSacola.find(adicionar => adicionar.title === filme.title);
  if(jaTemOFilme) {
    const adicionarFilmeAlterado = adicionarFilmeSacola.map(filmeDaSacola => {
      if(filmeDaSacola.title === filme.title) {
        filmeDaSacola.quantidade = filmeDaSacola.quantidade + 1;
        if(cupomAplicado) {
          const novoValor = valorTotal + (0.9 * filmeDaSacola.price);
          localStorage.setItem('valor', novoValor);
          setValorTotal(valorTotalAnterior => valorTotalAnterior + (0.9 * filmeDaSacola.price));
        } else {
          const novoValor = valorTotal + filmeDaSacola.price;
          localStorage.setItem('valor', novoValor);
          setValorTotal(valorTotalAnterior => valorTotalAnterior + filmeDaSacola.price);
        }
        return filmeDaSacola;
      } else {
        return filmeDaSacola;
      }
    });
    setSacola(true);
    setAdicionarFilmeSacola(adicionarFilmeAlterado);
    const arrayFilmeSacola = adicionarFilmeAlterado;
    localStorage.setItem('filme', JSON.stringify(arrayFilmeSacola));
    return;
  } else {
    if(cupomAplicado) {
      const novoValor = valorTotal + (0.9 * filme.price);
      localStorage.setItem('valor', novoValor);
      setValorTotal(valorTotalAnterior => valorTotalAnterior + (0.9 * filme.price));
    } else {
      const novoValor = valorTotal + filme.price;
      localStorage.setItem('valor', novoValor);
      setValorTotal(valorTotalAnterior => valorTotalAnterior + filme.price);
    }
    setAdicionarFilmeSacola([...adicionarFilmeSacola, {backgroundImg: filme.backgroundImg, quantidade: 1, title: filme.title, price: filme.price}]);
    const arrayFilmeSacola = [...adicionarFilmeSacola, {backgroundImg: filme.backgroundImg, quantidade: 1, title: filme.title, price: filme.price}];
    localStorage.setItem('filme', JSON.stringify(arrayFilmeSacola));
    setSacola(true);
  }

}

useEffect(() => {
  const filmeComQuantidadeAcimaDeUm = adicionarFilmeSacola.find(umFilme => umFilme.quantidade > 0);
  if(!filmeComQuantidadeAcimaDeUm) {
    setSacola(false);
  }
},[adicionarFilmeSacola]);

useEffect(() => {
  if(cupomExpirado) {
    return;
  }
  if(cupomAplicado) {
    const novoValor = 0.9 * valorTotal;
    setValorTotal(novoValor);
    localStorage.setItem('valor', novoValor);
  }
  return;
},[cupomAplicado, cupomExpirado]);

  return (
    <div className="container">
        <div className="header-mobile">
          <img src={logo}/>
          <img src={menu}/>
          <div className="menu-aberto">
            <div className="informacoes-menu">
              <img src={fechar}/>
              <div className="favorito">
                <img src={fotoPerfil} width="56px" height="56px"/>
                <p>Bem vindo Dina</p>
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
                <img src={sacolaImg}/>
                <p>Sacola</p>
              </div>
            </div>
          </div>
        </div>
       <Header
       nomeInput={nomeInput}
       setNomeInput={setNomeInput}
       setNomeFiltroInput={setNomeFiltroInput}
       />
      <div className="main">
        <div className="conteudo">
          <Cupom
          setCupomAplicado={setCupomAplicado}
          cupomAplicado={cupomAplicado}
          tempoCupom={tempoCupom}
          minutos={minutos}
          segundos={segundos}
          /> 
          <TopFilmes
          topFilmes={topFilmes}
          adicionarFilme={adicionarFilme}
          />
          <TodosFilmes
          setBotaoAcaoSelecionado={setBotaoAcaoSelecionado}
          setBotaoFiccaoSelecionado={setBotaoFiccaoSelecionado}
          setBotaoRomanceSelecionado={setBotaoRomanceSelecionado}
          setBotaoTerrorSelecionado={setBotaoTerrorSelecionado}
          todosOsFilmesFiltrado={todosOsFilmesFiltrado}
          adicionarFilme={adicionarFilme}
          botaoAcaoSelecionado={botaoAcaoSelecionado}
          botaoFiccaoSelecionado={botaoFiccaoSelecionado}
          botaoRomanceSelecionado={botaoRomanceSelecionado}
          botaoTerrorSelecionado={botaoTerrorSelecionado}
          />         
        </div>
        <div className="asside">
          <AssideSacola
          sacola={sacola}
          adicionarFilmeSacola={adicionarFilmeSacola}
          adicionarFilme={adicionarFilme}
          cupomAplicado={cupomAplicado}
          setValorTotal={setValorTotal}
          setAdicionarFilmeSacola={setAdicionarFilmeSacola}
          setCupomAplicado={setCupomAplicado}
          valorTotal={valorTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
