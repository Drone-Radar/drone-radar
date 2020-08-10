import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./style.css";

export default function Timer(props) {
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
        `Atualizando em ${segundo} segundo${segundo <= 1 ? "" : "s"}...`
      );
    } else {
      clearInterval(intervalo);
      setSegundo(10);
      setTexto(" Atualização de dados desativada");
    }

    if (segundo === 0) setTexto("Atualizando...");

    if (segundo < 0) {
      //TODO: Enviar mensagem para RabbitMQ
      //TODO: Atualizar mapa de drones
      props.state.getDrones();
      // api.get("drones", {}).then((res) => {
      //   const markers = res.data.map((drone) => {
      //     return {
      //       id: drone._id,
      //       name: drone.name,
      //       lat: drone.latitude,
      //       lng: drone.longitude,
      //       umi: drone.humidity,
      //       temp: drone.temperature,
      //     };
      //   });

      //   props.state.setMarkers(markers);
      // });

      setSegundo(10);
    }

    return () => clearInterval(intervalo);
  }, [ativo, props.state, segundo]);

  const textoBotao = `${ativo ? "Desativar" : "Ativar"}`;
  return (
    <div className="timer-container">
      <button onClick={() => setAtivo(!ativo)}>{textoBotao}</button>
      <h1>{texto}</h1>
    </div>
  );
}
