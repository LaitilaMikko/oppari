import React from "react";
import { browserHistory } from "react-router";

export default class Header extends React.Component {

    handleController(e) {
        //e.preventDefault();
        browserHistory.push("/controller");
    }

    handleEditor(e) {
        browserHistory.push("/");
    }
    render () {
        return (
            <div>
                <h1 className="title">{this.props.title}</h1>
                { this.props.campaigns.player &&
                    <button className="navBtn">Player</button>
                }
                { this.props.campaigns.controller &&
                    <button onClick={this.handleController.bind(this)} className="navBtn">Controller</button>
                }
                { this.props.campaigns.editor &&
                    <button onClick={this.handleEditor.bind(this)} className="navBtn">Editor</button>
                }
                <br />
            </div>
        );
    }
}
