export default function reducer(state = {
    created: false,
    fetching: false,
    fetched: false,
    error: null,
    campaigns: [],
    newCampaign: {}
},action){

    switch(action.type){

        case "FETCH_CAMPAIGNS": {
            return {...state,
                fetching: true    
            }
        }
        case "FETCH_CAMPAIGNS_REJECTED": {
            return {...state,
                fetching: false,
                error: action.payload
            }
        }
        case "FETCH_CAMPAIGNS_FULFILLED": {
            return {...state,
                fetching: false,
                fetched: true,
                campaigns: action.payload
            }
        }
        case "CREATE_CAMPAIGN_FULFILLED": {
            return {...state,
                created: true,
                newCampaign: action.payload
            }
        }
        case "CREATE_CAMPAIGN_REJECTED": {
            return{...state,
                created: false,
                error: action.payload
            }
        }
    }
    return state;
}