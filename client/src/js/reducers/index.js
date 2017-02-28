import { combineReducers } from "redux";

import Campaigns from "./campaignReducer";
import Adds from "./addReducer";
import Medias from "./mediaReducer";

export default combineReducers({
    Campaigns,
    Adds,
    Medias
});
