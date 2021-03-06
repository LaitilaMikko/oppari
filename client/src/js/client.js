/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import Layout from "./smartcomponents/layout";
import Store from "./store";
import Adds from "./smartcomponents/adds";
import NoMatch from "./dumbcomponents/noMatch";
import Medias from "./smartcomponents/medias";
import Controller from "./smartcomponents/controller";
import Player from "./smartcomponents/Player";

require("../styles/stylesheet.scss");

const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}/>
            <Route path="adds" component={Adds}/>
            <Route path="medias" component={Medias} />
            <Route path="controller" component={Controller} />
            <Route path="player" component={Player} />
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
, app);
