/**
 * Created by mumarm45 on 21/12/2018.
 */

import {AUTH_USER_ROLE} from "../action/authedUser";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case AUTH_USER_ROLE:
            return action.authedUser
        default:
            return state;
    }
}