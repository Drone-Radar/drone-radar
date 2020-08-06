import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/home';
import ListDrones from '../pages/drones/list';
import UpdateDrone from '../pages/drones/update';
import Mapa from '../pages/mapa';
import InputDrone from '../pages/InputDrone';
// import { Container } from './styles';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/drones/list" component={ListDrones} />
        <Route path="/drones/update" component={UpdateDrone} />
        <Route path="/drones/input" component={InputDrone} />
        <Route path="/mapa" component={Mapa} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
