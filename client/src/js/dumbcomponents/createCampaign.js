import React from "react";
import Serialize from "form-serialize";
import { browserHistory } from "react-router";

export default class CreateCampaign extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidData: true,
        }
    }

    //Tällä saadaan "Lisää" -button aktiiviseksi vasta kun kaikki kentät täytett
    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.name && nextState.w && nextState.h && nextState.screens);
    }

    //Submit-buttonin clikin handlaus
    handleClick(e) {
        e.preventDefault();
        let form = document.getElementById("uploadForm");
        let data = Serialize(form, { hash: true });
        this.props.createCampaign(data);
        browserHistory.push("/adds");
    }

    nameChange(event) {
        this.setState({ name: event.target.value });
    }
    wChange(event) {
        this.setState({ w: event.target.value });
    }
    hChange(event) {
        this.setState({ h: event.target.value });
    }
    screensChange(event) {
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

    render() {
        return (
            <div>
                <div class="upper">
                    <h4>Create Campaign: </h4>
                    <form id="uploadForm">
                        <p><input onChange={this.nameChange.bind(this)} placeholder="Name" type="text" name="name" id="name"></input></p>
                        <p><input onChange={this.wChange.bind(this)} placeholder="Screen Width" type="number" name="screenW" id="screenW"></input></p>
                        <p><input onChange={this.hChange.bind(this)} placeholder="Screen Height" type="number" name="screenH" id="screenH"></input></p>
                        <p><input onChange={this.screensChange.bind(this)} placeholder="Number of screens" type="number" name="screens" id="screens"></input></p>
                        <p><button class="btn btn-success" disabled={this.state.invalidData} type="submit" defaultValue="Add Campaign" onClick={this.handleClick.bind(this)}><span class="glyphicon glyphicon-ok"></span>&nbsp;CREATE CAMPAIGN</button></p>
                    </form>
                </div>
            </div>
        );
    }
}