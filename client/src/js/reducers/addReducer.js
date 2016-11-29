export default function reducer(state = {
    startCreating: false,
    created: false,
    fetching: false,
    fetched: false,
    error: false,
    deleted: false,
    deleting: false,
    edit: false,
    creating: false,
    editing: false,
    edited: false,
    arrows: false,
    adds: [],
    newAdd: {},
    currAdd: {}
}, action) {

    switch (action.type) {
        case "ADS_LOCATION_DID_CHANGE": {
            return {
                ...state,
                startCreating: false,
                edit: false
            }
        }
        case "FETCH_ADDS_PENDING": {
            return {
                ...state,
                fetching: true,
                fetched: false,
                deleted: false,
                edited: false
            }
        }
        case "FETCH_ADDS_REJECTED": {
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
        case "FETCH_ADDS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                adds: action.payload,
                currAdd: {}    
            }
        }
        case "DELETE_ADD_PENDING": {
            return {
                ...state,
                deleting: true
            }
        }
        case "DELETE_ADD_REJECTED": {
            return {
                ...state,
                error: action.payload,
                deleting: false,
                deleted: false
            }
        }
        case "DELETE_ADD_FULFILLED": {
            return {
                ...state,
                deleted: true,
                deleting: false,
                edit: false,
                startCreating: false             
            }
        };
        case "ADD_SELECT_CHANGED": {
            return {
                ...state,
                edit: true,
                currAdd: action.payload,
                startCreating: false,
                edited: false
            }
        }
        case "CREATE_AD_START": {
            return {
                ...state,
                startCreating: true,
                edit: false
            }
        }
        case "CREATE_AD_PENDING": {
            return {
                ...state,
                creating: true,
                created: false
            }
        }
        case "CREATE_AD_FULFILLED": {
            return {
                ...state,
                startCreating: false,
                created: true,
                creating: false,
                adds: [
                    ...state.adds, action.payload
                ]
            }
        }
        case "CREATE_AD_REJECTED": {
            return {
                ...state,
                created: false,
                creating: false,
                error: action.payload
            }
        }
        case "EDIT_AD_PENDING": {
            return {
                ...state,
                editing: true,
                edited: false
            }
        }
        case "EDIT_AD_REJECTED": {
            return {
                ...state,
                editing: false,
                edited: false,
                error: action.payload
            }
        }
        case "EDIT_AD_FULFILLED": {
            return {
                ...state,
                editing: false,
                edited: true,  
                edit: false
            }
        }
        case "AD_ORDER_CHANGED": {
            return {
                ...state,
                adds: action.payload
            }
        }
        case "AD_ORDER_CHANGE_PENDING": {
            return {
                ...state,
                arrows: true, 
                edit: false,
                creating: false          
            }
        }
        case "AD_ORDER_CHANGE_FULFILLED": {
            return {
                ...state,
                arrows: false,
                edited: true
            }
        }
        case "AD_ORDER_CHANGE_REJECTED": {
            return {
                ...state,
                arrows: true,
                error: action.payload
            }
        }

    }
    return state;

}