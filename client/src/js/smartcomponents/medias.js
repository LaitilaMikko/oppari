import React from "react";
import { connect } from  "react-redux";

import {uploadMedia, fetchMedias} from "../actions/mediaActions";
import Header from "../dumbcomponents/header";
import Upload from "../dumbcomponents/uploadMedia";
import AdMedias from "../dumbcomponents/adMedias";
import MediaSlots from "../dumbcomponents/mediaSlots";

@connect((store) => {
    return {
        adds: store.Adds,
        newCampaign: store.Campaigns.newCampaign,
        campaign: store.Campaigns,
        currentCampaign: store.Campaigns.currSelection,
        medias: store.Medias

    };
})
export default class Medias extends React.Component {
    componentDidMount(){
        this.fetchMedias(this.props.currentCampaign.name,this.props.adds.currAdd.name);
    }
    uploadMedia(file,campaign,ad){
        this.props.dispatch(uploadMedia(file,campaign,ad));
    }
    fetchMedias(campaign,ad){
        this.props.dispatch(fetchMedias(campaign,ad));
    }

    render(){
        return(
            <div>
                <Header title="Medias" location="FrontPage->Ads->Medias" />
                <MediaSlots medias={this.props.medias} ad={this.props.adds.currAdd} campaign={this.props.currentCampaign} />
                <AdMedias medias={this.props.medias} campaign={this.props.currentCampaign} ad={this.props.adds.currAdd} />
                <Upload medias={this.props.medias} upload={this.uploadMedia.bind(this)} ad={this.props.adds.currAdd} campaign={this.props.currentCampaign} />
            </div>
        );
    }
}