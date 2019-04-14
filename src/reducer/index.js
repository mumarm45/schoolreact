/**
 * Created by mumarm45 on 20/12/2018.
 */

import {combineReducers} from "redux";
import User from "./User";
import authedUser from "./AuthUser";


export default combineReducers({
    User, authedUser
});
