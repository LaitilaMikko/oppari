import { combineReducers } from "redux";

import Campaigns from "./campaignReducer";
import Adds from "./addReducer";
import Medias from "./mediaReducer";
import Player from "./playerReducer";
import Controller from "./controllerReducer";

export default combineReducers({
    Campaigns,
    Adds,
    Medias,
    Player,
    Controller
});
