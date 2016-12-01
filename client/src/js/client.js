import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, browserHistory} from "react-router";

import Layout from "./smartcomponents/layout";
import Store from "./store";
import Adds from "./smartcomponents/adds";
import NoMatch from "./dumbcomponents/noMatch";
import Medias from "./smartcomponents/medias";

require("../styles/stylesheet.scss");

const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}/>
            <Route path="adds" component={Adds}/>
            <Route path="medias" component={Medias} />
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
, app);