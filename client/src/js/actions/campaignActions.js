import Axios from "axios";
var config = require("../../../public/config.js");

export function fetchCampaigns() {
    return function (dispatch) {
        dispatch({ type: "FETCH_CAMPAIGNS_PENDING" });
        Axios.get(config.nodeServer + "getCampaigns")
            .then((response) => {
                dispatch({ type: "FETCH_CAMPAIGNS_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_CAMPAIGNS_REJECTED", payload: error });
            })
    }
}

export function createCampaign(data) {
    return function (dispatch) {
        dispatch({ type: "CREATE_CAMPAIGN_PENDING" });
        Axios.post(config.nodeServer + "addCampaign", {
            name: data.name,
            screens: data.screens,
            screen_width: data.screenW,
            screen_height: data.screenH
        })
            .then((response) => {
                dispatch({ type: "CREATE_CAMPAIGN_FULFILLED", payload: data });
            })
            .catch((error) => {
                dispatch({ type: "CREATE_CAMPAIGN_REJECTED", payload: error });
            });
    }
}

export function deleteCampaign(id, campaign) {
    return function (dispatch) {
        Axios.post(config.nodeServer + "deleteCampaign", {
            id: id
        })
            .then((response) => {
                Axios.post(config.nodeServer + "deleteCampaignAdds", {
                    campaign: campaign
                })
                    .then((response) => {
                        Axios.post(config.nodeServer + "deleteCampaignMedia", {
                            campaign: campaign
                        })
                            .then((response) => {
                                dispatch({ type: "DELETE_CAMPAIGN_FULFILLED" });
                            })
                    })
            })
            .catch((error) => {
                dispatch({ type: "DELETE_CAMPAIGN_REJECTED", payload: error });
            });
    }
}

export function showCurrentCampaignData(data) {
    return function (dispatch) {
        dispatch({ type: "CAMPAIGN_SELECT_CHANGED", payload: data });
    }
}

