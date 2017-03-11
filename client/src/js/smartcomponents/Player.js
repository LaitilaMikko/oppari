/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import { connect } from "react-redux";

import Player from "../dumbcomponents/player";

@connect((store) => {
    return {
        store: store
    };
})

export default class PlayerCont extends React.Component {
    render() {
        return (
            <div>
                <Player />
            </div>
        );
    }
}

