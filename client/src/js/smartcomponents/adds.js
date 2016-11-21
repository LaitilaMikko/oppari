import React from "react";
import { connect } from "react-redux";

import { fetchAdds } from "../actions/addActions";

import Header from "../dumbcomponents/header";
import AllAdds from "../dumbcomponents/allAdds";

@connect((store) => {
    return {
        adds: store.Adds,
        newCampaign: store.Campaigns.newCampaign,
        campaign: store.Campaigns
    };
})


export default class Adds extends React.Component {

    componentWillMount() {
        if (this.props.campaign.created == true) {
            this.props.dispatch(fetchAdds(this.props.newCampaign.name));
        }
    }


    render() {
        return (
            <div>
                <Header title="Adds" location="FrontPage->Adds" />
                <AllAdds campaign={this.props.newCampaign.name} />
            </div>
        );
    }
}