import "./cupom.css";
import cupom from "../assets/images/coupon-circle-icon.svg";
import relogio from "../assets/images/time-icon.svg";
import dinheiro from "../assets/images/money.png";
import { useState, useEffect, useRef } from "react";

export default function CupomDesconto({
  setCupomAplicado,
  cupomAplicado,
  setCupomExpirado,
  cupomExpirado
}) {
  const [tempoCupom, setTempoCupom] = useState(300);
  const intervalId = useRef();

  const minutos = `${Math.floor(tempoCupom / 60)}`.padStart(2, "0");
  const segundos = `${tempoCupom % 60}`.padStart(2, "0");

  useEffect(() => {
    if (tempoCupom === 0) {
      setCupomExpirado(true);
      localStorage.setItem("cupomUsado", true);
    }
    if (tempoCupom !== 0) {
      intervalId.current = setInterval(() => {
        setTempoCupom((tempoAnterior) => tempoAnterior - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId.current);
      };
    }
  }, [tempoCupom]);

  function atualizarLocalStorage() {
    localStorage.setItem("cupom", true);
    localStorage.setItem("cupomUsado", true);
  }

  return (
    <div
      onClick={() => {
        setCupomAplicado(true);
        atualizarLocalStorage();
      }}
      className="cupom"
      style={{ display: `${cupomExpirado || cupomAplicado || tempoCupom  === 0 ? "none" : ""}` }}
    >
      <div className="titulo-cupom">
        <h1>APROVEITE AGORA</h1>
        <div className="numero-cupom">
          <img src={cupom} />
          <p>CUPOM: htmlnaoelinguagem</p>
        </div>
      </div>
      <div className="tempo-cupom">
        <h3>FINALIZA EM:</h3>
        <div className="tempo">
          <img src={relogio} />
          {minutos} : {segundos}
        </div>
      </div>
      <img id="dinheiro" src={dinheiro} />
    </div>
  );
}
