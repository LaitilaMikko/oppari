import axios from "axios";

export function fetchAdds(campaign){
    return function(dispatch) {
        dispatch({type: "FETCH_ADDS_PENDING"})
        axios.post("http://localhost:3000/getAdds",{
            campaign: campaign
        })
            .then((response) =>{
                    dispatch({type: "FETCH_ADDS_FULFILLED", payload: response.data});
                
            }).catch((error) => {
                dispatch({type: "FETCH_ADDS_REJECTED", payload: error});
            });
    }
}