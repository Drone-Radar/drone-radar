import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import api from "../../../services/api";

import "./style.css";

export default function UpdateDrone(props) {
  const [idDrone, setIdDrone] = useState("");
  const [nameDrone, setNameDrone] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [temperatura, setTemperatura] = useState(0);
  const [umidade, setUmidade] = useState(0);
  const [rastrear, setRastrear] = useState(true);

  const history = useHistory();

  useEffect(() => {
    api.get(`drones/${props.location.state.name}`).then((res) => {
      setIdDrone(res.data._id);
      setNameDrone(res.data.name);
      setLatitude(res.data.latitude);
      setLongitude(res.data.longitude);
      setTemperatura(res.data.temperature);
      setUmidade(res.data.humidity);
      setRastrear(res.data.tracking);
    });
  }, []);

  async function handleUpdate(event) {
    event.preventDefault();

    const data = {
      _id: idDrone,
      name: nameDrone,
      latitude: latitude,
      longitude: longitude,
      temperature: temperatura,
      humidity: umidade,
      tracking: rastrear,
    };
    console.log(data);

    try {
      await api.put(`drones/${props.location.state.name}`, data);
      alert(`Drone atualizado com sucesso`);
      history.push("/drones/list");
    } catch (err) {
      alert(err.response.data);
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Atualização de Drones</h1>
          <Link className="back-link" to="/">
            <FiArrowLeft size={30} color="#F28500" />
          </Link>
        </section>
        <form onSubmit={handleUpdate}>
          <Input
            name="name"
            label="Nome Drone"
            value={nameDrone}
            onChange={(e) => {
              setNameDrone(e.target.value);
            }}
          />
          <Input
            name="latitude"
            label="Latitude"
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
          />

          <Input
            name="longitude"
            label="Longitude"
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
          />

          <Input
            name="temperatura"
            label="Temperatura"
            value={temperatura}
            onChange={(e) => {
              setTemperatura(e.target.value);
            }}
          />

          <Input
            name="umidade"
            label="Umidade"
            value={umidade}
            onChange={(e) => {
              setUmidade(e.target.value);
            }}
          />

          <Select
            name="rastrear"
            label="Rastrear"
            value={rastrear}
            onChange={(e) => {
              setRastrear(e.target.value);
            }}
            options={[
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]}
          />
          <button className="button" type="submit">
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
