import React from "react";
import { connect } from "react-redux";

import { fetchAdds } from "../actions/addActions";

import Header from "../dumbcomponents/header";
import AllAdds from "../dumbcomponents/allAdds";

@connect((store) => {
    return {
        adds: store.Adds,
        newCampaign: store.Campaigns.newCampaign,
        campaign: store.Campaigns,
        currentCampaign: store.Campaigns.currSelection
    };
})


export default class Adds extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchAdds(this.props.campaign.currSelection.name));
        if (this.props.adds.fetched == true){
            console.log(this.props.adds.fetched);
        }
    }

    render() {
        return (
            <div>
                <Header title="Adds" location="FrontPage->Adds" />
                <AllAdds campaign={this.props.currentCampaign.name} adds={this.props.adds} />

            </div>
        );
    }
}