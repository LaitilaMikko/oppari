import React from "react";
import { connect } from  "react-redux";

import {uploadMedia} from "../actions/mediaActions";
import Header from "../dumbcomponents/header";
import Upload from "../dumbcomponents/uploadMedia";
import AdMedias from "../dumbcomponents/adMedias";
import MediaSlots from "../dumbcomponents/mediaSlots";

@connect((store) => {
    return {
        adds: store.Adds,
        newCampaign: store.Campaigns.newCampaign,
        campaign: store.Campaigns,
        currentCampaign: store.Campaigns.currSelection
    };
})
export default class Medias extends React.Component {
    uploadMedia(data){
        this.props.dispatch(uploadMedia(data));
    }
    render(){
        return(
            <div>
                <Header title="Medias" location="FrontPage->Ads->Medias" />
                <MediaSlots />
                <AdMedias ad={this.props.adds.currAdd.name} />
                <Upload upload={this.uploadMedia.bind(this)} ad={this.props.adds.currAdd} campaign={this.props.currentCampaign} />
            </div>
        );
    }
}