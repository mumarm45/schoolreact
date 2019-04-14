/**
 * Created by mumarm45 on 21/12/2018.
 */

import {SET_AUTH_TOKEM} from "../action/authedUser";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTH_TOKEM:
            return action.authedUser;
        default:
            return state;
    }
}