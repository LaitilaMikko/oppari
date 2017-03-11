/*eslint-env node*/
/*eslint-env browser*/
import axios from "axios";

var config = require("../../../public/config.js");

export function GetAllByCampaign(campaign) {
    console.log(campaign);
    return function(dispatch) {
        dispatch({ type: "FETCH_ALL_PENDING" });
        axios.post(config.nodeServer + "getAllByCampaign", {
            campaign: campaign
        })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            dispatch({ type: "FETCH_ALL_REJECTED", payload: err });
        });
    };
}
