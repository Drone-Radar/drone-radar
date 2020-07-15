import React, { useState, useEffect } from "react";
import { getDrones } from "../../services/getDrones";
function Timer(props) {
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
        `Atualizando dados em ${segundo} segundo${segundo <= 1 ? "" : "s"}...`
      );
    } else {
      clearInterval(intervalo);
      setSegundo(10);
      setTexto("Atualização de dados desativado");
    }

    if (segundo === 0) setTexto("Atualizando dados...");

    if (segundo < 0) {
      //TODO: Enviar mensagem para RabbitMQ
      //TODO: Atualizar mapa de drones

      getDrones().then((data) => {
        const droneMarkers = data.map((drone) => {
          return {
            id: drone.id_drone,
            lat: drone.latitude,
            lng: drone.longitude,
          };
        });
        props.state.setMarkers(droneMarkers);
      });

      setSegundo(10);
    }

    return () => clearInterval(intervalo);
  }, [ativo, props.state, segundo]);

  const textoBotao = `${ativo ? "Desativar" : "Ativar"} envio de dados`;
  return (
    <>
      <button onClick={() => setAtivo(!ativo)}>{textoBotao}</button>
      <p>{texto}</p>
    </>
  );
}

export default Timer;
