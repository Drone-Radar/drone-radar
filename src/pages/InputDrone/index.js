import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

import './style.css'

export default function InputDrone() {

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [umidade, setUmidade] = useState('');
  const [rastrear, setRastrear] = useState(true);

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const data = { latitude, longitude, temperatura, umidade, rastrear };

    try {
      //const res = await api.post('ErrorOcurrence', data);
      alert(`Drone cadastrado com sucesso`);
      history.push('/drones/list');
    }
    catch (err) {
      alert(err.response.data)
    }
  }


  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro de Drones</h1>
          <Link className="back-link" to="/">
            <FiArrowLeft size={30} color="#F28500" />
          </Link>
        </section>
        <form onSubmit={handleRegister}>

          <Input
            name="latitude"
            label="Latitude"
            value="-6423432"
            onChange={(e) => {setLatitude(e.target.value)}}
          />

          <Input
            name="longitude"
            label="Longitude"
            value="-6787686"
            onChange={(e) => {setLongitude(e.target.value)}}
          />

          <Input
            name="temperatura"
            label="Temperatura"
            value="46"
            onChange={(e) => {setTemperatura(e.target.value)}}
          />

          <Input
            name="umidade"
            label="Umidade"
            value="25%"
            onChange={(e) => {setUmidade(e.target.value)}}
          />

          <Select
            name="rastrear"
            label="Rastrear"
            value={0}
            onChange={e => {setRastrear(e.target.value)}}
            options={[
              { value: 0, label: 'Sim'},
              { value: 1, label: 'Não'},
            ]}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
