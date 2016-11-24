import React from "react";
import { connect } from "react-redux";

import { fetchAdds, currentAdd  } from "../actions/addActions";

import Header from "../dumbcomponents/header";
import AllAdds from "../dumbcomponents/allAdds";
import EditAdd from "../dumbcomponents/EditAdd";

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
    }
    currentAdd(data){
        this.props.dispatch(currentAdd(data));
    }

    render() {
        var addChanged = this.props.adds.selectChanged;
        var currAdd = this.props.adds.currAdd;
        return (
            <div>
                <Header title="Adds" location="FrontPage->Adds" />
                <AllAdds curr={this.currentAdd.bind(this)} campaign={this.props.currentCampaign.name} adds={this.props.adds} />
                { addChanged && <EditAdd currAdd={currAdd}/>}
            </div>
        );
    }
}