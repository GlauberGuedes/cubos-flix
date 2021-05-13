import './cupom.css';
import cupom from "../assets/images/coupon-circle-icon.svg";
import relogio from "../assets/images/time-icon.svg";
import dinheiro from "../assets/images/money.png";

export default function CupomDesconto ({setCupomAplicado, cupomAplicado, tempoCupom, minutos, segundos, atualizarLocalStorage}) {
    
    function atualizarLocalStorage() {
        localStorage.setItem('cupom', true);
        localStorage.setItem('cupomUsado', true);
      }
    
    return (
        <div onClick={() => {
            setCupomAplicado(true);
            atualizarLocalStorage();
            }} className="cupom" style={{display: `${cupomAplicado || tempoCupom === 0 ? "none" : ""}`}}>
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
    )
}