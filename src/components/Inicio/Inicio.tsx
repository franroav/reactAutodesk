import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "@material-ui/core";
import axios from "axios";
import "./Inicio.css";
import { getAll } from "../../services/users.service";
import { connect } from "react-redux";
const baseUrl = `https://mindicador.cl/api`;

function Inicio(): JSX.Element {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <h1>Bienvenidos!</h1>
          </div>
        </div>
        <div className="card-body">
          porfavor haga click en el boton USERS, para navegar por la aplicación,
          muchas gracias!
        </div>
      </div>
    </Fragment>
  );
}

export default Inicio;
