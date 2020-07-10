import React, { useState, useEffect } from "react";

// import { Container } from './styles';
// componentDidMount () {
//   this.myInterval = setInterval (() => {
//     setSegundos(segundos-1)
//   }, 1000)
// }

function Timer() {
  const [segundo, setSegundo] = useState(10);
  const [ativo, setAtivo] = useState(true);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    let intervalo = null;

    if (ativo) {
      intervalo = setInterval(() => {
        setSegundo(segundo - 1);
      }, 1000);
      setTexto(
        `Próximo envio de dados em ${segundo} segundo${
          segundo <= 1 ? "" : "s"
        }...`
      );
    } else {
      clearInterval(intervalo);
      setSegundo(10);
      setTexto("Envio de dados desativado");
    }

    if (segundo === 0) setTexto("Enviado dados...");

    if (segundo < 0) {
      //TODO: Enviar mensagem para RabbitMQ
      setSegundo(10);
    }

    return () => clearInterval(intervalo);
  }, [ativo, segundo]);

  const textoBotao = `${ativo ? "Desativar" : "Ativar"} envio de dados`;
  return (
    <>
      <button onClick={() => setAtivo(!ativo)}>{textoBotao}</button>
      <p>{texto}</p>
    </>
  );
}

export default Timer;
