import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../contexts/app";

// import { Container } from './styles';

function ItemList(drone) {
  return (
    <li>
      <h3>{`Drone ${drone.id_drone}`}</h3>
      <p>{`latitude ${drone.latitude}`}</p>
      <p>{`longitude ${drone.longitude}`}</p>
      <p>{`temperatura ${drone.temperatura}`}</p>
      <p>{`umidade ${drone.id_drone}`}</p>
      <p>{`rastrear ${drone.id_drone}`}</p>
    </li>
  );
}

function ListDrones() {
  const [drones, setDrone] = useAppContext();

  function handleAddDrone() {
    const newDrone = {
      id_drone: drones.length + 1,
      latitude: 0,
      longitude: 0,
      temperatura: 0,
      umidade: 0,
      rastrear: false,
    };
    setDrone([...drones, newDrone]);
  }

  return (
    <>
      <h1>Lista de drones</h1>
      <p>Total de drones: {drones.length}</p>
      <button onClick={handleAddDrone}>Adicionar drone</button>
      <br />
      <ul>
        {drones.map((drone) => {
          return <ItemList drone={drone} />;
        })}
      </ul>
      <Link to="/">Voltar</Link>
    </>
  );
}

export default ListDrones;
