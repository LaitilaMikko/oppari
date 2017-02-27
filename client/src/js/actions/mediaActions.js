import axios from "axios";
import $ from "jquery";

var config = require("../../../public/config.js");

export function uploadMedia(file, campaign, ad, sHeight, sWidth) {
    return function (dispatch) {
        dispatch({ type: "UPLOAD_MEDIA_PENDING" });
        $.ajax({
            type: "POST",
            contentType: false,
            processData: false,
            url: config.nodeServer + "uploadMedia",
            data: file,
            headers: {
                "campaign": campaign,
                "ad": ad,
                "sHeight": sHeight,
                "sWidth": sWidth
            },
            success: function (response) {
                if (response.success == true) {
                    dispatch({ type: "UPLOAD_MEDIA_FULFILLED", payload: response.data });
                    setTimeout(() => {
                        dispatch({ type: "CHANGE_VAL" });
                    }, 2000);
                } else if (response.success == false) {
                    dispatch({ type: "UPLOAD_MEDIA_BAD_RESO", payload: response.reason });
                    setTimeout(() => {
                        dispatch({ type: "CHANGE_VAL" });
                    }, 2000);
                }
            },
            error: function (error) {
                dispatch({ type: "UPLOAD_MEDIA_REJECTED", payload: error });
            }
        })
    }
}

export function fetchMedias(campaign, ad) {
    console.log(config);
    return function (dispatch) {
        dispatch({ type: "FETCH_MEDIA_PENDING" });
        axios.post(config.nodeServer +"getMedias", {
            campaign: campaign,
            ad: ad
        })
            .then((response) => {
                dispatch({ type: "FETCH_MEDIA_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_MEDIA_REJECTED", payload: error });
            })
    }
}

export function deleteMedia(id) {
    return function (dispatch) {
        dispatch({ type: "DELETE_MEDIA_PENDING" });
        axios.post(config.nodeServer + "deleteMedia", {
            id: id
        })
            .then((response) => {
                dispatch({ type: "DELETE_MEDIA_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_MEDIA_REJECTED", payload: error });
            })
    }
}

export function mediaSelectionChanged(id, src, action) {
    var data = { id, src }
    if (action == "first") {
        return function (dispatch) {
            dispatch({ type: "MEDIA_SELECTION_FIRST", payload: data });
        }
    } else if (action == "changed") {
        return function (dispatch) {
            dispatch({ type: "MEDIA_SELECTION_CHANGED", payload: data });
        }
    } else if (action == "discard") {
        return function (dispatch) {
            dispatch({ type: "MEDIA_SELECTION_DISCARD" });
        }
    }
}

export function saveSlots(medias, campaign, ad) {
    return function (dispatch) {
        dispatch({ type: "MEDIA_SLOTS_SAVE_PENDING" });
        axios.post(config.nodeServer + "reserveMediaSlots", {
            medias: medias,
            campaign: campaign,
            ad: ad
        })
            .then((response) => {
                if (response.data.success == true) {
                    dispatch({ type: "MEDIA_SLOTS_SAVE_FULFILLED"});
                }
            })
            .catch((error) => {
                dispatch({type: "MEDIA_SLOTS_SAVE_REJECTED", payload: error});
            })
    }
    /*return function(dispatch){
        dispatch({type: "SLOTS_ERASED"});
    }*/
}

export function erase(campaign,ad) {
    return function (dispatch) {
        dispatch({ type: "MEDIA_SLOTS_ERASE_PENDING" });
        axios.post(config.nodeServer + "eraseSlots",{
            campaign: campaign,
            ad: ad
        })
            .then((response) => {
                if(response.data.success == true){
                    dispatch({type: "MEDIA_SLOTS_ERASE_FULFILLED"});
                }
            })
            .catch((error) => {
                dispatch({type: "MEDIA_SLOTS_ERASE_REJECTED", payload: error});
            })

    }
}
