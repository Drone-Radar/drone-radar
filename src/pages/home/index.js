import React from "react";
import { Link, useHistory } from "react-router-dom";
import './styles.css';

export default function Home() {
  const history = useHistory();

  function handleDrone(){
    localStorage.clear();
    history.push('/drones/list');
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
          <button onClick={handleDrone} type="button">Drones</button>
          <br />
          <button onClick={handleMapa} type="button">Mapa</ button>
        </header>
      </div>
    </div>
  );
}

 
