import React from "react";
import Serialize from "form-serialize";

export default class CreateCampaign extends React.Component {
    constructor(){
        super();
        this.state = {
            invalidData: true
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

    render() {
        return (
            <div>
                <div class="create">
                    <h4>Create Campaign: </h4>
                    <form id="uploadForm">
                        <p><input onChange={this.nameChange.bind(this)} placeholder="Name" type="text" name="name"></input></p>
                        <p><input onChange={this.wChange.bind(this)} placeholder="Screen Width" type="number" name="screenW"></input></p>
                        <p><input onChange={this.hChange.bind(this)} placeholder="Screen Height" type="number" name="screenH"></input></p>
                        <p><input onChange={this.screensChange.bind(this)} placeholder="Number of screens" type="number" name="screens"></input></p>
                        <p><input disabled={this.state.invalidData} type="submit" defaultValue="Add Campaign" onClick={this.handleClick.bind(this)}></input></p>
                    </form>
                </div>
            </div>
        );
    }
}