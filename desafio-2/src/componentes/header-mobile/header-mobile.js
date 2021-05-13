import "./header-mobile.css";
import fotoPerfil from "../assets/images/profile2.jpg";
import favoritos from "../assets/images/bookmark-icon.svg";
import Promocoes from "../assets/images/promotion-icon.svg";
import logo from "../assets/images/logo.svg";
import fechar from "../assets/images/open-menu.svg";
import menu from "../assets/images/closed-menu.svg";
import sacolaImg from "../assets/images/bag-icon.svg";
import { useState } from "react";

export default function HeaderMobile({ setAbrirSacolaMobile }) {
  const [abrirMenu, setAbrirMenu] = useState(false);

  return (
    <div className="header-mobile">
      <img src={logo} />
      <img
        src={menu}
        onClick={() => {
          setAbrirMenu(true);
          setAbrirSacolaMobile(false);
        }}
      />
      <div className="menu-aberto" style={{ display: abrirMenu ? "" : "none" }}>
        <div className="informacoes-menu">
          <img id="fechar" src={fechar} onClick={() => setAbrirMenu(false)} />
          <div className="favorito">
            <img src={fotoPerfil} width="56px" height="56px" />
            <p>Bem vindo Glauber</p>
          </div>
          <div className="favorito">
            <img src={favoritos} />
            <p>Favoritos</p>
          </div>
          <div className="favorito">
            <img src={Promocoes} />
            <p>Promoções</p>
          </div>
          <div
            className="favorito"
            onClick={() => {
              setAbrirSacolaMobile(true);
              setAbrirMenu(false);
            }}
          >
            <img src={sacolaImg} width="30px" height="30px" />
            <p>Sacola</p>
          </div>
        </div>
      </div>
    </div>
  );
}
