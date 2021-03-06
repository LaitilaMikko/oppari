/*eslint-env node*/
import axios from "axios";
var config = require("../../../public/config.js");

export function fetchAdds (campaign) {
    return function (dispatch) {
        dispatch({ type: "FETCH_ADDS_PENDING" });
        axios.post(config.nodeServer + "getAdds", {
            campaign: campaign
        })
            .then((response) => {
                var sortedAdds = response.data;
                sortedAdds.sort(function (a, b) {
                    return parseFloat(a.orderNum) - parseFloat(b.orderNum);
                });
                dispatch({ type: "FETCH_ADDS_FULFILLED", payload: sortedAdds });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ADDS_REJECTED", payload: error });
            });
    };
}

export function currentAdd (data) {
    return function (dispatch) {
        dispatch({ type: "ADD_SELECT_CHANGED", payload: data });
    };
}

export function startCreatingAd () {
    return function (dispatch) {
        dispatch({ type: "CREATE_AD_START" });
    };
}

export function createAd (data) {
    return function (dispatch) {
        dispatch({ type: "CREATE_AD_PENDING" });
        axios.post(config.nodeServer + "addAd", {
            name: data.name,
            campaign: data.campaign,
            duration: data.duration,
            activated: data.isActivated,
            animationIN: data.animationIN,
            animationOut: data.animationOUT,
            orderNum: data.orderNum
        })
            .then((response) => {
                dispatch({ type: "CREATE_AD_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "CREATE_AD_REJECTED", payload: error });
            });
    };
}

export function leftPage () {
    return function (dispatch) {
        dispatch({ type: "ADS_LOCATION_DID_CHANGE" });
    };
}

export function deleteAdd (id, ad, campaign) {
    return function (dispatch) {
        dispatch({ type: "DELETE_ADD_PENDING" });
        axios.post(config.nodeServer + "deleteAdd", {
            id: id
        })
            .then((response) => {
                axios.post(config.nodeServer + "addOrderNumsAfterDel", {
                    campaign: response.data.campaign,
                    orderNum: response.data.orderNum
                })
                .then((response) => {
                    axios.post(config.nodeServer + "deleteAdMedias", {
                        adName: ad,
                        campaign: campaign
                    })
                    .then((response) => {
                        dispatch({ type: "DELETE_ADD_FULFILLED", payload: response.data });
                    });
                });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_ADD_REJECTED", payload: error });
            });
    };
}

export function editAdd (id, data) {
    return function (dispatch) {
        dispatch({ type: "EDIT_AD_PENDING" });
        axios.post(config.nodeServer + "updateAdd", {
            id: id,
            activated: data.isActivated,
            campaign: data.campaign,
            duration: data.duration,
            name: data.name,
            animationIN: data.animationIN,
            animationOut: data.animationOUT
        })
            .then((response) => {
                dispatch({ type: "EDIT_AD_FULFILLED", payload: response });
            })
            .catch((error) => {
                dispatch({ type: "EDIT_AD_REJECTED", payload: error });
            });
    };
}

export function changeOrder (adds) {
    return function (dispatch) {
        dispatch({ type: "AD_ORDER_CHANGED", payload: adds });
    };
}

export function orderUpOrDown (add1, add2, action, add1ordernum, add2ordernum) {
    return function (dispatch) {
        dispatch({ type: "AD_ORDER_CHANGE_PENDING" });
        axios.post(config.nodeServer + "addOrderUpOrDown", {
            add1: add1,
            add2: add2,
            action: action,
            add1OrderNum: add1ordernum,
            add2OrderNum: add2ordernum
        })
            .then((response) => {
                dispatch({ type: "AD_ORDER_CHANGE_FULFILLED" });
            })
            .catch((error) => {
                dispatch({ type: "AD_ORDER_CHANGE_REJECTED", payload: error });
            });
    };
}
