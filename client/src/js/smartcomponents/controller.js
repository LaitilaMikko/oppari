/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import { connect } from "react-redux";
import Header from "../dumbcomponents/header";
import { location, fetchCampaigns } from "../actions/campaignActions";
import { GetAllByCampaign } from "../actions/controllerActions";

var playerData = require("../../../public/playerData.json");

@connect((store) => {
    return {
        store: store
    };
})
export default class Controller extends React.Component {

    componentWillMount() {
        this.props.dispatch(location("controller"));
        this.props.dispatch(fetchCampaigns());
    }
    componentDidMount() {
        console.log(this.props.store);
    }

    handlePlay(e) {
        e.preventDefault();
        this.props.dispatch(GetAllByCampaign("Mikko"));
    }

    handleChange(e) {
        var id = e.target.value;
        var campaigns = this.props.store.Campaigns.campaigns;
        campaigns.map((campaign) => {
            if (campaign._id === id) {
                this.setState({ campaign: campaign.name });
            }
        });
    }

    render() {
        var campaigns = this.props.store.Campaigns.campaigns;
        var mappedCampaigns;
        if (campaigns.length > 0) {
            mappedCampaigns = campaigns.map((campaign, key) =>
                <option key={key} className={campaign.name} value={campaign._id}>{campaign.name}</option>
            );
        }
        return (
            <div>
                <Header campaigns={this.props.store.Campaigns} title="Controller" />
                <div className="upper">
                    <button className="btn btn-success" onClick={this.handlePlay.bind(this)}>PLAY</button>
                    <button className="btn btn-danger">STOP</button>
                    <br />
                    <br />
                    <p>Select campaign: </p>
                    <select onChange={this.handleChange.bind(this)}>
                        {mappedCampaigns}
                    </select>
                </div>
            </div>
        );
    }
}
