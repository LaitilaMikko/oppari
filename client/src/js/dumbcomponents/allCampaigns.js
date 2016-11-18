import React from "react";


export default class AllCampaigns extends React.Component {
    render() {
        const campaigns = this.props.campaigns;
        const mappedCampaigns = campaigns.map((campaign,key) => <option key={key} value={campaign._id}>{campaign.name}</option>);
        return (
            <div class="campaigns">
                <h4>Campaigns:</h4>
                <select>
                    <option key="eka" value="null"></option>
                    {mappedCampaigns}
                </select>
            </div>
        );
    }
}