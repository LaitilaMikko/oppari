import {combineReducers} from "redux";

import Campaigns from "./campaignReducer";
import Adds from "./addReducer";

export default combineReducers({
    Campaigns,
    Adds
});