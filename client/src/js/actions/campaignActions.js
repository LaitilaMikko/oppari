import Axios from "axios";


export function fetchCampaigns() {
    return function (dispatch) {
        dispatch({ type: "FETCH_CAMPAIGNS_PENDING" });
        Axios.get("http://localhost:3000/getCampaigns")
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
        Axios.post("http://localhost:3000/addCampaign", {
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
        Axios.post("http://localhost:3000/deleteCampaign", {
            id: id
        })
            .then((response) => {
                Axios.post("http://localhost:3000/deleteCampaignAdds", {
                    campaign: campaign
                })
                    .then((response) => {
                        Axios.post("http://localhost:3000/deleteCampaignMedia", {
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

