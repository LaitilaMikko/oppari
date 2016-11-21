import React from "react";
import { connect } from "react-redux";

import { fetchCampaigns, createCampaign, deleteCampaign, showCurrentCampaignData } from "../actions/campaignActions";


import AllCampaigns from "../dumbcomponents/allCampaigns";
import Header from "../dumbcomponents/header";
import CreateCampaign from "../dumbcomponents/CreateCampaign";


@connect((store) => {
    return {
        campaigns: store.Campaigns
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchCampaigns());
    }

    createCampaign(data){
        this.props.dispatch(createCampaign(data));
    }
    
    deleteCampaign(id){
        this.props.dispatch(deleteCampaign(id));
    }

    showCurrentCampaignData(data){
        this.props.dispatch(showCurrentCampaignData(data));
    }

    render() {
        return (
            <div>
                <Header title="FrontPage" location="FrontPage" />
                <CreateCampaign current={this.props.campaigns.currSelection} createCampaign={this.createCampaign.bind(this)} />
                <AllCampaigns curr={this.showCurrentCampaignData.bind(this)} campaigns={this.props.campaigns.campaigns} deleteCampaign={this.deleteCampaign.bind(this)}/>
            </div>
        );
    }
}