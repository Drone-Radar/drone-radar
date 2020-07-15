import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../contexts/app";

// import { Container } from './styles';

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

function ListDrones() {
  const { drones, addNewDrone } = useAppContext();

  function handleAddDrone() {
    addNewDrone({
      id_drone: drones.length + 1,
      latitude: -23.5634612,
      longitude: -46.6331563,
      temperatura: "25°C",
      umidade: "90%",
      rastrear: false,
    });
  }

  return (
    <>
      <h1>Lista de drones</h1>
      <p>Total de drones: {drones.length}</p>
      <button onClick={handleAddDrone}>Adicionar drone</button>
      <br />
      <ul>
        {drones.map((drone) => {
          return <ItemList key={drone.id_drone} drone={drone} />;
        })}
      </ul>
      <Link to="/">Voltar</Link>
    </>
  );
}

export default ListDrones;
