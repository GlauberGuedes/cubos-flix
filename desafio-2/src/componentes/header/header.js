import "./header.css";
import fotoPerfil from "../assets/images/profile2.jpg";
import favoritos from "../assets/images/bookmark-icon.svg";
import Promocoes from "../assets/images/promotion-icon.svg";
import logo from "../assets/images/logo.svg";
import { useState} from "react";

export default function Header({
  setNomeFiltroInput,
  nomeInput,
  setNomeInput,
  filtrarPorNomeInput,
}) {

  

  return (
    <header>
      <div className="logo-pesquisa">
        <img src={logo} />
        <div className="pesquisar">
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
                stroke-width="1.00001"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M11.0122 11.3232L13.3616 13.6665"
                stroke="white"
                stroke-width="1.00001"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="favorito">
        <img src={favoritos} />
        <p>Favoritos</p>
      </div>
      <div className="favorito">
        <img src={Promocoes} />
        <p>Promoções</p>
      </div>
      <div className="favorito">
        <p>Bem vindo Glauber</p>
        <img id="perfil" src={fotoPerfil} width="56px" height="56px" />
      </div>
    </header>
  );
}
