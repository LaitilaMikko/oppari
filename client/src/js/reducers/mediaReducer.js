export default function reducer(state = {
    error: null,
    uploading: false,
    uploaded: false,
    fetching: false,
    fetched: false,
    medias: [],
},action){
    switch(action.type){
        case "UPLOAD_MEDIA_PENDING": {
            return {
                ...state,
                uploading: true,
                uploaded: false
            }
        }
        case "UPLOAD_MEDIA_REJECTED": {
            return {
                ...state,
                uploading: false,
                uploaded: false,
                error: action.payload
            }
        }
        case "UPLOAD_MEDIA_FULFILLED": {
            return {
                ...state,
                uploading: false,
                uploaded: false
            }
        }
        case "FETCH_MEDIA_PENDING": {
            return {
                ...state,
                fetching: true,
                fetched: false
            }
        }
        case "FETCH_MEDIA_REJECTED": {
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
        case "FETCH_MEDIA_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                medias: action.payload
            }
        }
    }
    return state;
}