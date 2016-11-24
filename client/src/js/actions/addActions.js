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