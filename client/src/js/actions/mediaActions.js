import axios from "axios";
import $ from "jquery";

export function uploadMedia(file, campaign, ad, sHeight, sWidth) {
    return function (dispatch) {
        dispatch({ type: "UPLOAD_MEDIA_PENDING" });
        $.ajax({
            type: "POST",
            contentType: false,
            processData: false,
            url: "http://localhost:3000/uploadMedia",
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
                }else if (response.success == false) {
                    dispatch({type: "UPLOAD_MEDIA_BAD_RESO", payload: response.reason});
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
    return function (dispatch) {
        dispatch({ type: "FETCH_MEDIA_PENDING" });
        axios.post("http://localhost:3000/getMedias", {
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
        axios.post("http://localhost:3000/deleteMedia", {
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

export function mediaSelectionChanged(id,src){
    var data = {id,src}
    return function(dispatch){
        dispatch({type: "MEDIA_SELECTION_CHANGE", payload: data});
    }
}