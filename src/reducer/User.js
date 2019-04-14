/**
 * Created by mumarm45 on 14/04/2019.
 */
import {GET_USERS} from "../action/user";

export default function User(state = null, action) {
    switch (action.type) {
        case GET_USERS:
            return action.User;
        default:
            return state;
    }
}