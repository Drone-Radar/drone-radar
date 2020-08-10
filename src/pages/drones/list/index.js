import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiPenTool, FiMap } from "react-icons/fi";
import api from "../../../services/api";

import "./style.css";

export default function ListDrones() {
  const [drones, setDrones] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get("drones", {}).then((res) => {
      const data = res.data;
      setDrones(data);
      console.log(res.data);
    });
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  function handleAddDrone() {
    localStorage.clear();
    history.push("/drones/input");
  }

  async function handleDeleteDrone(nomeDrone) {
    try {
      await api.delete(`drones/${nomeDrone}`);
      setDrones(drones.filter((drone) => drone.name !== nomeDrone));
    } catch (err) {
      alert("Ero ao deletar Drone, tente novamente");
    }
  }

  return (
    <div className="list-container">
      <header>
        <span>Lista de Drones</span>
        <button onClick={handleAddDrone} type="button">
          {" "}
          Adicionar drone{" "}
        </button>

        <button onClick={handleLogout} type="button">
          <FiPower size={16} color="#312e38" />
        </button>
      </header>

      <h1>Total de Drones: {drones.length}</h1>

      <ul>
        {drones &&
          drones.map((drone) => (
            <li key={drone.id}>
              <strong>NOME:</strong>
              <p>{drone.name}</p>
              <strong>LATITUDE:</strong>
              <p>{drone.latitude}</p>
              <strong>LONGITUDE:</strong>
              <p>{drone.longitude}</p>
              <strong>TEMPERATURA:</strong>
              <p>{drone.temperature}°C</p>
              <strong>UMIDADE:</strong>
              <p>{drone.humidity}%</p>
              <strong>RASTREAR:</strong>
              <p>{drone.tracking === true ? "Sim" : "Não"}</p>

              <Link
                className="back-link"
                to={{
                  pathname: "/drones/update",
                  state: { name: drone.name },
                }}
              >
                <FiPenTool size={20} color="#F28500" />
              </Link>
              {drone.tracking && (
                <Link
                  className="map-link"
                  to=""
                  to={{
                    pathname: "/mapa",
                    state: {
                      latitude: drone.latitude,
                      longitude: drone.longitude,
                    },
                  }}
                >
                  <FiMap size={20} color="#F28500" />
                </Link>
              )}
              <button
                onClick={() => handleDeleteDrone(drone.name)}
                type="button"
              >
                <FiTrash2 size={20} color="#ff9020" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
