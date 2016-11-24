export default function reducer(state = {
    startCreating: false,
    created: false,
    fetching: false,
    fetched: false,
    error: false,
    deleted: false,
    edit: false,
    adds: [],
    currAdd: {}
}, action) {

    switch (action.type) {

        case "FETCH_ADDS_PENDING": {
            return {...state,
                edit: false,
                fetching: true,
                fetched: false
            }
        }
        case "FETCH_ADDS_REJECTED": {
            return {...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
        case "FETCH_ADDS_FULFILLED": {
            return {...state,
                fetching: false,
                fetched: true,
                adds: action.payload    
            }
        }
        case "DELETE_ADD_REJECTED": {
            return {...state,
                error: action.payload
            }
        }
        case "DELETE_ADD_FULFILLED": {
            return {...state,
                deleted: true
            }
        };
        case "ADD_SELECT_CHANGED": {
            return{
                ...state,
                edit: true,
                currAdd: action.payload,
                startCreating: false
            }
        }
        case "CREATE_AD_START": {
            return{
                ...state,
                startCreating: true,
                edit: false,
                currAdd: {}
            }
        }
    }
    return state;

}