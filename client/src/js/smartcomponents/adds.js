import React from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import { orderUpOrDown, changeOrder, editAdd, deleteAdd, fetchAdds, currentAdd, startCreatingAd, createAd, leftPage } from "../actions/addActions";

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
    componentDidMount() {
        var location = window.location;
        browserHistory.listen(location => {
            if (location.pathname !== "/adds" || location.path != undefined) {
                this.leftPage();
            }
        });
        if (this.props.campaign.changed == true) {
            this.props.dispatch(fetchAdds(this.props.campaign.currSelection.name));
        }
    }
    componentDidUpdate() {
        if (this.props.adds.deleted == true || this.props.adds.edited == true) {
            this.props.dispatch(fetchAdds(this.props.campaign.currSelection.name));
        }
    }

    currentAdd(data) {
        this.props.dispatch(currentAdd(data));
    }
    startCreatingAd() {
        this.props.dispatch(startCreatingAd());
    }
    createAd(data) {
        this.props.dispatch(createAd(data));
    }
    leftPage() {
        this.props.dispatch(leftPage());
    }
    deleteAdd(id) {
        this.props.dispatch(deleteAdd(id));
    }
    editAdd(id, data) {
        this.props.dispatch(editAdd(id, data));
    }

    orderUpOrDown(add1, add2, action, add1ordernum, add2ordernum) {
        this.props.dispatch(orderUpOrDown(add1, add2, action, add1ordernum, add2ordernum));
    }

    render() {
        var addChanged = this.props.adds.edit;
        var createAdd = this.props.adds.startCreating;
        var currAdd = this.props.adds.currAdd;
        var currCampName = this.props.currentCampaign.name;
        return (
            <div>
                <Header title="Adds" location="FrontPage->Adds" />
                <AllAdds changeOrder={this.orderUpOrDown.bind(this)} deleteAdd={this.deleteAdd.bind(this)} startCreate={this.startCreatingAd.bind(this)} curr={this.currentAdd.bind(this)} campaign={this.props.currentCampaign.name} adds={this.props.adds} />
                {addChanged && <EditAdd currCamp={currCampName} editAdd={this.editAdd.bind(this)} leftPage={this.leftPage.bind(this)} adds={this.props.adds} editing={this.props.adds.edit} title={<h4>Edit ad {currAdd.name}</h4>} selectChange={this.props.adds.selectChanged} currAdd={currAdd} />}
                {createAdd && <EditAdd leftPage={this.leftPage.bind(this)} adds={this.props.adds} currCamp={currCampName} createAd={this.createAd.bind(this)} creating={this.props.adds.startCreating} title={<h4>Create ad</h4>} />}
            </div>
        );
    }
}