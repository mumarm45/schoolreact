/**
 * Created by mumarm45 on 20/12/2018.
 */

import {combineReducers} from "redux";
import students from "./students";
import families from "./families";
import nationalities from "./share";
import authedUser from "./AuthUser";
import currentStudent from "./currentStudent";

export default combineReducers({
    students, authedUser,families,nationalities,currentStudent
});
