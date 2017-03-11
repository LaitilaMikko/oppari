export default function reducer (state = {
    fetching: false,
    fetched: false,
    error: null,
    all: {}
}, action) {
    switch (action.type) {
        case "FETCH_ALL_PENDING": {
            return {
                ...state,
                fetching: true,
                fetched: false
            };
        }
        case "FETCH_ALL_REJECTED": {
            return {
                ...state,
                error: action.payload,
                fetched: false,
                fetching: false
            };
        }
        case "FETCH_ALL_FULFILLED": {
            return {
                ...state,
                fetched: true,
                fetching: false,
                all: action.payload
            };
        }
    }
    return state;
}
