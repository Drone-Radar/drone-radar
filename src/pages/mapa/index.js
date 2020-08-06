import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillBackward } from 'react-icons/ai'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import './style.css';

import Timer from "../../components/timer";
import { getDrones } from "../../services/getDrones";

const libraries = ["places"];
const mapContainerStyle = {
  width: "70vw",
  height: "70vh",
};
const center = { lat: -23.5634612, lng: -46.6331563 };
const options = {
  styles: mapStyles,
  zoomControl: true,
};

export default function Mapa() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvkjouYcmkcrLyzw-Wj_nenQHd3bk_SyU",
    libraries: libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getDrones().then((data) => {
      const droneMarkers = data.map((drone) => {
        return {
          id: drone.id_drone,
          lat: drone.latitude,
          lng: drone.longitude,
        };
      });
      setMarkers(droneMarkers);
    });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="mapa-container">
      <h1>Mapa de drones</h1>
      <header>
        <Timer state={{ setMarkers }} />
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
          //onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "/drone.svg",
                scaledSize: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(16, 16),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h2>Drone encontrado</h2>
                <p>Temperatura: 25ºC</p>
                <p>Umidade: 90%</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>

        <button onClick = {handleLogout}
          type="button">
          <AiFillBackward size={15} color = "#41414d"/>
        </button>
      </header>
    </div>
  );
}

