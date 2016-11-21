export default function reducer(state = {
    created: false,
    fetching: false,
    fetched: false,
    error: false,
    deleted: false,
    adds: [],
    newAdd: {}
}, action) {

    switch (action.type) {

        case "FETCH_ADDS_PENDING": {
            return {...state,
                fetching: true
            }
        }
        case "FETCH_ADDS_REJECTED": {
            return {...state,
                fetching: false,
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
        }

    }

}