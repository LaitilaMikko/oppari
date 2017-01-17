export default function reducer(state = {
    error: null,
    uploading: false,
    uploaded: false,
    fetching: false,
    fetched: false,
    failed: false,
    deleting: false,
    deleted: false,
    reason: "",
    medias: [],
    selectedMedia: {},
    selected: false,
    firstSelection: true

}, action) {
    switch (action.type) {
        case "MEDIA_SELECTION_DISCARD": {
            return {
                ...state,
                selected: false,
                firstSelection: true,
                selectedMedia: {}
            }
        }
        case "MEDIA_SELECTION_FIRST": {
            return {
                ...state,
                selected: true,
                firstSelection: false,
                selectedMedia: action.payload
            }
        }
        case "MEDIA_SELECTION_CHANGED": {
            return {
                ...state,
                selected: true,
                firstSelection: false,
                selectedMedia: action.payload         
            }
        }
        case "UPLOAD_MEDIA_BAD_RESO": {
            return {
                ...state,
                uploaded: false,
                uploading: false,
                reason: action.payload,
                failed: true
            }
        }
        case "CHANGE_VAL": {
            return {
                ...state,
                uploaded: false,
                failed: false
            }
        }
        case "DELETE_MEDIA_PENDING": {
            return {
                ...state,
                deleting: true,
                deleted: false
            }
        }
        case "DELETE_MEDIA_FULFILLED": {
            return {
                ...state,
                deleting: false,
                deleted: true,
            }
        }
        case "DELETE_MEDIA_REJECTED": {
            return {
                ...state,
                deleting: false,
                deleted: false,
                error: action.payload
            }
        }
        case "UPLOAD_MEDIA_PENDING": {
            return {
                ...state,
                uploading: true,
                failed: false
            }
        }
        case "UPLOAD_MEDIA_REJECTED": {
            return {
                ...state,
                uploading: false,
                uploaded: false,
                failed: true,
                error: action.payload
            }
        }
        case "UPLOAD_MEDIA_FULFILLED": {
            return {
                ...state,
                uploading: false,
                uploaded: true,
                medias: [
                    ...state.medias, action.payload
                ]
            }
        }
        case "FETCH_MEDIA_PENDING": {
            return {
                ...state,
                fetching: true,
                fetched: false,
                deleted: false
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