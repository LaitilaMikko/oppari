/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import serialize from "form-serialize";
import { browserHistory } from "react-router";

export default class CreateCampaign extends React.Component {
    constructor () {
        super();
        this.state = {
            invalidData: true
        };
    }

    //Tällä saadaan "Lisää" -button aktiiviseksi vasta kun kaikki kentät täytett
    componentWillUpdate (nextProps, nextState) {
        nextState.invalidData = !(nextState.name && nextState.w &&
             nextState.h && nextState.screens && nextState.dh && nextState.dw);
    }

    //Submit-buttonin clikin handlaus
    handleClick (e) {
        e.preventDefault();
        let form = document.getElementById("uploadForm");
        let data = serialize(form, { hash: true });
        this.props.createCampaign(data);
        browserHistory.push("/adds");
    }

    nameChange (event) {
        this.setState({ name: event.target.value });
    }
    wChange (event) {
        this.setState({ w: event.target.value });
    }
    hChange (event) {
        this.setState({ h: event.target.value });
    }
    dhChange (event) {
        this.setState({ dh: event.target.value });
    }
    dwChange (event) {
        this.setState({ dw: event.target.value });
    }
    screensChange (event) {
        this.setState({ screens: event.target.value });
    }
    /*componentDidMount() {
        let curr = this.props.current;
        if (curr.name != undefined) {
            document.getElementById("name").value = curr.name;
            document.getElementById("screenW").value = curr.screen_width;
            document.getElementById("screenH").value = curr.screen_height;
            document.getElementById("screens").value = curr.screens;
        }
    }*/

    render () {
        return (
            <div>
                <div className="upper">
                    <h4>Create Campaign: </h4>
                    <form id="uploadForm">
                        <p><input onChange={this.nameChange.bind(this)} placeholder="Name"
                            type="text" name="name" id="name"/>
                        </p>
                        <p><input onChange={this.wChange.bind(this)} placeholder="Panel Width"
                             type="number" name="screenW" id="screenW"/>
                        </p>
                        <p><input onChange={this.hChange.bind(this)} placeholder="Panel Height"
                             type="number" name="screenH" id="screenH"/>
                        </p>
                        <p><input onChange={this.screensChange.bind(this)} placeholder="Number of panels"
                             type="number" name="screens" id="screens"/>
                        </p>
                        <p><input onChange={this.dwChange.bind(this)} placeholder="Display Width"
                             type="number" name="displayW" id="displayW"/>
                        </p>
                        <p><input onChange={this.dhChange.bind(this)} placeholder="Display Height"
                             type="number" name="displayH" id="displayH"/>
                        </p>
                        <p><button className="btn btn-success" disabled={this.state.invalidData} type="submit"
                            defaultValue="Add Campaign"
                            onClick={this.handleClick.bind(this)}>
                            <span className="glyphicon glyphicon-ok"/>&nbsp;CREATE CAMPAIGN
                        </button></p>
                    </form>
                </div>
            </div>
        );
    }
}
