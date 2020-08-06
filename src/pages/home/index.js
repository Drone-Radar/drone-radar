import React from "react";
import { useHistory } from "react-router-dom";
import './styles.css';

export default function Home() {
  const history = useHistory();

  function handleDrone(){
    localStorage.clear();
    history.push('/drones/list');
  }

  function handleInputDrone(){
    localStorage.clear();
    history.push('/drones/input');
  }

  function handleMapa(){
    localStorage.clear();
    history.push('/mapa');
  }
  return (
    <div className="home-container">
      <div className="content">
        <header>
          <h1> Selecione uma opção </h1>
          <button onClick={handleDrone} type="button"> Lista de Drones</button>
          <br />
          <button onClick={handleInputDrone} type="button">Cadastrar Drone</button>
          <br />
          <button onClick={handleMapa} type="button">Mapa</ button>
        </header>
      </div>
    </div>
  );
}


