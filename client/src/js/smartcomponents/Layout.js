import React from "react";
import { connect } from "react-redux";

import { fetchCampaigns, createCampaign } from "../actions/campaignActions";


import AllCampaigns from "../dumbcomponents/allCampaigns";
import Header from "../dumbcomponents/header";
import CreateCampaign from "../dumbcomponents/CreateCampaign";


@connect((store) => {
    return {
        campaigns: store.Campaigns.campaigns
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchCampaigns());
    }

    createCampaign(data){
        this.props.dispatch(createCampaign(data));
    }

    render() {
        return (
            <div>
                <Header title="FrontPage" location="FrontPage" />
                <CreateCampaign createCampaign={this.createCampaign.bind(this)} />
                <AllCampaigns campaigns={this.props.campaigns} />
            </div>
        );
    }
}