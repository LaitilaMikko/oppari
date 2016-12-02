export default function reducer(state = {
    error: null,
    uploading: false,
    uploaded: false,
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
    }
    return state;
}