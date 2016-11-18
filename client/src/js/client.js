import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import Layout from "./smartcomponents/Layout";
import Store from "./store";

require("../styles/stylesheet.scss");

const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={Store}>
        <Layout />
    </Provider>
, app);