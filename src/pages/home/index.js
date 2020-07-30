import React from "react";
import { Link } from "react-router-dom";

import { Container } from './styles';

function Home() {
  return (
    <Container>
      <Link to="/drones/list">Drones</Link>
      <br />
      <Link to="/mapa">Mapa</Link>
    </Container>
  );
}

export default Home;
