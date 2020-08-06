import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../../contexts/app";
import { FiPower, FiTrash2, FiArrowRight } from 'react-icons/fi'


import './style.css';

export default function ListDrones() {
  function ItemList({ drone }) {
    return (
      <li>
        <h3>{`Drone ${drone.id_drone}`}</h3>
        <p>{`latitude: ${drone.latitude}`}</p>
        <p>{`longitude: ${drone.longitude}`}</p>
        <p>{`temperatura: ${drone.temperatura}`}</p>
        <p>{`umidade: ${drone.umidade}`}</p>
        <p>{`rastrear: ${drone.rastrear}`}</p>
      </li>
    );
  }

  const { drones, addNewDrone } = useAppContext();
  const history = useHistory();

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  function handleAddDrone() {
    addNewDrone({
      id_drone: drones.length + 1,
      latitude: -23.5634612,
      longitude: -46.6331563,
      temperatura: "25°C",
      umidade: "90%",
      rastrear: false,
    });
  };

  async function handleDeleteDrone(IDrone){
        try{
            console.log("drone deletado");
        } catch (err){
            alert('Ero ao deletar drone, tente novamente');
        }
    }



  return (
  <div className="list-container">
    <header>
      <span>Lista de Drones</span>
      <button onClick={handleAddDrone} type="button"> Adicionar drone </button>

      <button onClick = {handleLogout}
          type="button">
          <FiPower size={16} color = "#ffff"/>
      </button>
    </header>

    <h1>Total de Drones: {drones.length}</h1>

    <ul>

    {drones.map(drone => (
      <li key={drone.id_drone}>
      <ItemList key={drone.id_drone} drone={drone} />;

      <button onClick={() => handleDeleteDrone('1')} type="button">
        <FiTrash2 size = {20} color="#a8a8b3"/>
      </button>

      <Link className="back-link" to="/mapa">
        <FiArrowRight size={20} color="#F28500" />
      </Link>
      </li>
    ))}

    </ul>
  </div>
  );
}
