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
    firstSelection: true,
    erased: false,
    erasing: false,
    saving: false,
    saved: false,
}, action) {
    switch (action.type) {
        case "MEDIA_SLOTS_ERASE_PENDING": {
            return {
                ...state,
                erasing: true,
                erased: false
            }
        }
        case "MEDIA_SLOTS_ERASE_FULFILLED": {
            return {
                ...state,
                erasing: false,
                erased: true
            }
        }
        case "MEDIA_SLOTS_ERASE_REJECTED": {
            return {
                ...state,
                erasing: false,
                erased: false,
                error: action.payload
            }
        }
        case "MEDIA_SLOTS_SAVE_PENDING": {
            return {
                ...state,
                saving: true,
                saved: false
            }
        }
        case "MEDIA_SLOTS_SAVE_FULFILLED": {
            return {
                ...state,
                saving: false,
                saved: true
            }
        }
        case "MEDIA_SLOTS_SAVE_REJECTED": {
            return {
                ...state,
                error: action.payload
            }
        }
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
                fetched: false,
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
                failed: false,
                saved: false
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