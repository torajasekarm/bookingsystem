import React from "react";
import {Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import EventsList from "./components/EventsList";
import Booking from "./components/Booking";

import { DataProvider } from "./data/DataContext";

export default function Routes() {
  const _redirectToHome = () => {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Router>
        <DataProvider>
          <Switch>
          <Route exact path="/" component={EventsList} />
          <Route path="/event/:id/booking" component={Booking} />
          <Route render={_redirectToHome} />
          </Switch>
        </DataProvider>
      </Router>
    </>
  )
}