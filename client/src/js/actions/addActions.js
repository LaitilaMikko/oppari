import axios from "axios";

export function fetchAdds(campaign) {
    return function (dispatch) {
        dispatch({ type: "FETCH_ADDS_PENDING" })
        axios.post("http://localhost:3000/getAdds", {
            campaign: campaign
        })
            .then((response) => {
                dispatch({ type: "FETCH_ADDS_FULFILLED", payload: response.data });

            }).catch((error) => {
                dispatch({ type: "FETCH_ADDS_REJECTED", payload: error });
            });
    }
}

export function currentAdd(data) {
    return function (dispatch) {
        dispatch({ type: "ADD_SELECT_CHANGED", payload: data });
    }
}

export function startCreatingAd() {
    return function (dispatch) {
        dispatch({ type: "CREATE_AD_START" });
    }
}

export function createAd(data){
    return function(dispatch){
        dispatch({type: "CREATE_AD_PENDING"})
        axios.post("http://localhost:3000/addAd",{
            name: data.name,
            campaign: data.campaign,
            duration: data.duration,
            activated: data.isActivated,
            animationIN: data.animationIN,
            animationOut: data.animationOUT,
            orderNum: data.orderNum
        })
            .then((response) => {
                dispatch({type: "CREATE_AD_FULFILLED", payload: response.data});
            })
            .catch((error) => {
                dispatch({type: "CREATE_AD_REJECTED", payload: error});
            });
    }
}

export function leftPage(){
    return function(dispatch){
        dispatch({type: "ADS_LOCATION_DID_CHANGE"});
    }
}

export function deleteAdd(id, campaign){
    return function(dispatch){
        dispatch({type: "DELETE_ADD_PENDING"});
        axios.post("http://localhost:3000/deleteAdd", {
            id: id,
            campaign: campaign
        })
            .then((response) => {
                dispatch({type: "DELETE_ADD_FULFILLED", payload: response.data});
            })
            .catch((error) => {
                dispatch({type: "DELETE_ADD_REJECTED", payload: error});
            })
    }       
}