/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import { browserHistory } from "react-router";

export default class AllCampaigns extends React.Component {
    constructor () {
        super();
        this.state = {
            selectedValue: null,
            selectedIndex: null
        };
    }

    handleDel () {
        var select = document.getElementById("campaignsList");
        if (this.state.selectedValue != null) {
            this.props.deleteCampaign(this.state.selectedValue, this.props.current.name);
            select.remove(this.state.selectedIndex);
        }
    }
    handleChange (e) {
        var selectedIndex = e.nativeEvent.target.selectedIndex;
        this.setState({ selectedIndex: selectedIndex });
        this.setState({ selectedValue: e.target.value });
        this.findSelectedData(e.target.value);
    }
    findSelectedData (id) {
        var campaigns = this.props.campaigns;
        for (var i = 0; i < campaigns.length; i++) {
            if (campaigns[i]._id === id) {
                this.props.curr(campaigns[i]);
            }
        }
    }
    handleNext () {
        this.findSelectedData(this.state.selectedValue);
        browserHistory.push("/adds");
    }

    render () {
        const campaigns = this.props.campaigns;
        const mappedCampaigns = campaigns.map((campaign, key) =>
            <option key={key} value={campaign._id}>{campaign.name}</option>
            );
        return (
            <div className="lower">
                <h4>Campaigns:</h4>
                <select id="campaignsList" onChange={this.handleChange.bind(this)}>
                    <option key="eka" value="null"/>
                    {mappedCampaigns}
                </select>
                <button
                    className="btn btn-danger" onClick={this.handleDel.bind(this)}>
                    <span className="glyphicon glyphicon-trash"/>&nbsp;DELETE</button>
                <button className="btn btn-primary" onClick={this.handleNext.bind(this)}>
                    <span className="glyphicon glyphicon-forward"/>&nbsp;NEXT</button>
            </div>
        );
    }
}
