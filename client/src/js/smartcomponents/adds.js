import React from "react";
import { connect } from "react-redux";

import { fetchAdds, currentAdd, startCreatingAd, createAd  } from "../actions/addActions";

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
    startCreatingAd(){
        this.props.dispatch(startCreatingAd());
    }
    createAd(data){
        this.props.dispatch(createAd(data));
    }

    render() {
        var addChanged = this.props.adds.edit;
        var createAdd = this.props.adds.startCreating;
        var currAdd = this.props.adds.currAdd;
        var currCampName = this.props.currentCampaign.name;
        return (
            <div>
                <Header title="Adds" location="FrontPage->Adds" />
                <AllAdds startCreate={this.startCreatingAd.bind(this)} curr={this.currentAdd.bind(this)} campaign={this.props.currentCampaign.name} adds={this.props.adds} />
                { addChanged && <EditAdd editing={this.props.adds.edit} title={<h4>Edit ad {currAdd.name}</h4>} selectChange={this.props.adds.selectChanged} currAdd={currAdd}/>}
                { createAdd && <EditAdd currCamp={currCampName} createAd={this.createAd.bind(this)} creating={this.props.adds.startCreating} title={<h4>Create ad</h4>} /> }
            </div>
        );
    }
}