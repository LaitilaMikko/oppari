import React from "react";
import { connect } from "react-redux";

import { location, fetchCampaigns,
    createCampaign, deleteCampaign, showCurrentCampaignData } from "../actions/campaignActions";


import AllCampaigns from "../dumbcomponents/allCampaigns";
import Header from "../dumbcomponents/header";
import CreateCampaign from "../dumbcomponents/CreateCampaign";


@connect((store) => {
    return {
        campaigns: store.Campaigns
    };
})

export default class Layout extends React.Component {
    componentWillMount () {
        this.props.dispatch(location("editor"));
        this.props.dispatch(fetchCampaigns());
    }

    createCampaign (data) {
        this.props.dispatch(createCampaign(data));
    }

    deleteCampaign (id, campaign) {
        this.props.dispatch(deleteCampaign(id, campaign));
    }

    showCurrentCampaignData (data) {
        this.props.dispatch(showCurrentCampaignData(data));
    }

    render () {
        return (
            <div>
                <Header campaigns={this.props.campaigns} title="FrontPage" location="FrontPage" />
                <CreateCampaign current={this.props.campaigns.currSelection}
                    createCampaign={this.createCampaign.bind(this)}
                />
                <AllCampaigns current={this.props.campaigns.currSelection}
                    curr={this.showCurrentCampaignData.bind(this)}
                    campaigns={this.props.campaigns.campaigns}
                    deleteCampaign={this.deleteCampaign.bind(this)}
                />
            </div>
        );
    }
}
