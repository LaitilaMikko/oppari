import axios from "axios";


var config = {
    headers: {
        "content-type": "multipart/form-data"
    }
}

export function uploadMedia(file) {
    console.log(file);
    return function(dispatch) {
        dispatch({type: "UPLOAD_MEDIA_PENDING"});
        axios.post("http://localhost:3000/uploadMedia", file)
            .then((reponse) => {
                console.log(response);
                dispatch({type: "UPLOAD_MEDIA_FULFILLED"})
            })
            .catch((error) => {
                dispatch({type: "UPLOAD_MEDIA_REJECTED", payload: error})
            })
    }
}

export function fetchMedias(campaign,ad) {
    return function(dispatch){
        dispatch({type: "FETCH_MEDIA_PENDING"});
        axios.post("http://localhost:3000/getMedias", {
            campaign: campaign,
            ad: ad
        })
            .then((response) => {
                dispatch({type: "FETCH_MEDIA_FULFILLED", payload: response.data});
            })
            .catch((error) => {
                dispatch({type: "FETCH_MEDIA_REJECTED", payload:error});
            })
    }
}