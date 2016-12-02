import axios from "axios";


var config = {
    headers: {
        "content-type": "multipart/form-data"
    }
}

export function uploadMedia(data) {
    return function(dispatch) {
        dispatch({type: "UPLOAD_MEDIA_PENDING"});
        axios.post("http://localhost:3000/uploadMedia",{
            /*campaign: data.campaign,
            ad: data.ad,*/
            file: data
        },config)
            .then((reponse) => {
                dispatch({type: "UPLOAD_MEDIA_FULFILLED"})
            })
            .catch((error) => {
                dispatch({type: "UPLOAD_MEDIA_REJECTED", payload: error})
            })
    }  
}