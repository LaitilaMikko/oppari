export default function reducer(state = {
    changed: false,
    created: false,
    fetching: false,
    fetched: false,
    deleted: false,
    error: null,
    campaigns: [],
    newCampaign: {},
    newCampaignID: null,
    currSelection: {}
},action){

    switch(action.type){

        case "FETCH_CAMPAIGNS_PENDING": {
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
                currSelection: action.payload,
                campaigns: [...state.campaigns, action.payload]
            }
        }
        case "CREATE_CAMPAIGN_REJECTED": {
            return{...state,
                created: false,
                error: action.payload
            }
        }
        case "DELETE_CAMPAIGN_FULFILLED": {
            return{...state,
                deleted: true    
            }
        }
        case "DELETE_CAMPAIGN_REJECTED": {
            return{...state,
                deleted: false,
                error: action.payload    
            }
        }
        case "CAMPAIGN_SELECT_CHANGED": {
            return{...state,
                changed: true,
                currSelection: action.payload    
            }
        }
    }
    return state;
}