/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import { connect } from "react-redux";
import { saveSlots, erase, mediaSelectionChanged, deleteMedia,
        uploadMedia, fetchMedias } from "../actions/mediaActions";
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
    componentDidMount () {
        this.fetchMedias(this.props.currentCampaign.name, this.props.adds.currAdd.name);
    }
    componentDidUpdate () {
        if (this.props.medias.deleted === true) {
            this.fetchMedias(this.props.currentCampaign.name, this.props.adds.currAdd.name);
        }
    }
    saveSlots (medias, campaign, ad) {
        this.props.dispatch(saveSlots(medias, campaign, ad));
    }
    uploadMedia (file, campaign, ad, sHeight, sWidth) {
        this.props.dispatch(uploadMedia(file, campaign, ad, sHeight, sWidth));
    }
    fetchMedias (campaign, ad) {
        this.props.dispatch(fetchMedias(campaign, ad));
    }
    deleteMedia (id) {
        this.props.dispatch(deleteMedia(id));
    }
    mediaSelectionChanged (id, src, action) {
        this.props.dispatch(mediaSelectionChanged(id, src, action));
    }
    erase (campaign, ad) {
        this.props.dispatch(erase(campaign, ad));
    }

    render () {
        return (
            <div>
                <Header title="Medias" location="FrontPage->Ads->Medias" />
                <MediaSlots save={this.saveSlots.bind(this)} erase={this.erase.bind(this)}
                    medias={this.props.medias} ad={this.props.adds.currAdd}
                    campaign={this.props.currentCampaign}
                />
                <AdMedias selectChanged={this.mediaSelectionChanged.bind(this)}
                    delete={this.deleteMedia.bind(this)} medias={this.props.medias}
                    campaign={this.props.currentCampaign} ad={this.props.adds.currAdd}
                />
                <Upload medias={this.props.medias} upload={this.uploadMedia.bind(this)}
                    ad={this.props.adds.currAdd} campaign={this.props.currentCampaign}
                />
            </div>
        );
    }
}
