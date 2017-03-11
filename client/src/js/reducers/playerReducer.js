export default function reducer (state = {
}, action) {
    switch (action.type) {
        case "PLAYER1_PLAY": {
            return {
                ...state,
                mediaType: action.payload.type,
                currMedia: action.payload.src
            };
        }
        case "PLAYER2_PLAY": {
            return {
                ...state,
                mediaType: action.payload.type,
                currMedia: action.payload.src
            };
        }
    }
    return state;
}
