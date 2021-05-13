import Cupom from "./componentes/cupom/cupom";
import Header from "./componentes/header/header";
import TopFilmes from "./componentes/top-filmes/top-filmes";
import TodosFilmes from "./componentes/todos-filmes/todos-filmes";
import AssideSacola from "./componentes/asside-sacola/asside-sacola";
import HeaderMobile from "./componentes/header-mobile/header-mobile";
import Movies from "./data";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todosOsFilmes, setTodosOsFilmes] = useState(Movies);
  const [nomeFiltroInput, setNomeFiltroInput] = useState("");
  const [cupomExpirado, setCupomExpirado] = useState(
    localStorage.getItem("cupomUsado") ?? false
  );
  const [adicionarFilmeSacola, setAdicionarFilmeSacola] = useState(
    JSON.parse(localStorage.getItem("filme")) ?? []
  );
  const [sacola, setSacola] = useState(
    JSON.parse(localStorage.getItem("filme")) ? true : false
  );
  const [valorTotal, setValorTotal] = useState(
    Number(localStorage.getItem("valor")) ?? 0
  );
  const [cupomAplicado, setCupomAplicado] = useState(
    localStorage.getItem("cupom") ?? false
  );
  const [abrirSacolaMobile, setAbrirSacolaMobile] = useState(false);

  function adicionarFilme(filme) {
    const jaTemOFilme = adicionarFilmeSacola.find(
      (adicionar) => adicionar.title === filme.title
    );
    if (jaTemOFilme) {
      const adicionarFilmeAlterado = adicionarFilmeSacola.map(
        (filmeDaSacola) => {
          if (filmeDaSacola.title === filme.title) {
            filmeDaSacola.quantidade = filmeDaSacola.quantidade + 1;
            if (cupomAplicado) {
              const novoValor = valorTotal + 0.9 * filmeDaSacola.price;
              localStorage.setItem("valor", novoValor);
              setValorTotal(
                (valorTotalAnterior) =>
                  valorTotalAnterior + 0.9 * filmeDaSacola.price
              );
            } else {
              const novoValor = valorTotal + filmeDaSacola.price;
              localStorage.setItem("valor", novoValor);
              setValorTotal(
                (valorTotalAnterior) => valorTotalAnterior + filmeDaSacola.price
              );
            }
            return filmeDaSacola;
          } else {
            return filmeDaSacola;
          }
        }
      );
      setSacola(true);
      setAdicionarFilmeSacola(adicionarFilmeAlterado);
      const arrayFilmeSacola = adicionarFilmeAlterado;
      localStorage.setItem("filme", JSON.stringify(arrayFilmeSacola));
      return;
    } else {
      if (cupomAplicado) {
        const novoValor = valorTotal + 0.9 * filme.price;
        localStorage.setItem("valor", novoValor);
        setValorTotal(
          (valorTotalAnterior) => valorTotalAnterior + 0.9 * filme.price
        );
      } else {
        const novoValor = valorTotal + filme.price;
        localStorage.setItem("valor", novoValor);
        setValorTotal((valorTotalAnterior) => valorTotalAnterior + filme.price);
      }
      setAdicionarFilmeSacola([
        ...adicionarFilmeSacola,
        {
          backgroundImg: filme.backgroundImg,
          quantidade: 1,
          title: filme.title,
          price: filme.price,
        },
      ]);
      const arrayFilmeSacola = [
        ...adicionarFilmeSacola,
        {
          backgroundImg: filme.backgroundImg,
          quantidade: 1,
          title: filme.title,
          price: filme.price,
        },
      ];
      localStorage.setItem("filme", JSON.stringify(arrayFilmeSacola));
      setSacola(true);
    }
  }

  useEffect(() => {
    const filmeComQuantidadeAcimaDeUm = adicionarFilmeSacola.find(
      (umFilme) => umFilme.quantidade > 0
    );
    if (!filmeComQuantidadeAcimaDeUm) {
      setSacola(false);
    }
  }, [adicionarFilmeSacola]);

  useEffect(() => {
    if (cupomExpirado) {
      return;
    }
    if (cupomAplicado) {
      const novoValor = 0.9 * valorTotal;
      setValorTotal(novoValor);
      localStorage.setItem("valor", novoValor);
    }
    return;
  }, [cupomAplicado, cupomExpirado]);

  return (
    <div className="container">
      <HeaderMobile setAbrirSacolaMobile={setAbrirSacolaMobile} />
      <Header setNomeFiltroInput={setNomeFiltroInput} />
      <div className="main">
        <div className="conteudo">
          <Cupom
            setCupomAplicado={setCupomAplicado}
            cupomAplicado={cupomAplicado}
            setCupomExpirado={setCupomExpirado}
          />
          <TopFilmes
            adicionarFilme={adicionarFilme}
            todosOsFilmes={todosOsFilmes}
            setTodosOsFilmes={setTodosOsFilmes}
          />
          <TodosFilmes
            adicionarFilme={adicionarFilme}
            nomeFiltroInput={nomeFiltroInput}
            todosOsFilmes={todosOsFilmes}
            setTodosOsFilmes={setTodosOsFilmes}
          />
        </div>
        <div
          className="asside"
          style={{ display: abrirSacolaMobile ? "flex" : "" }}
        >
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
