/**
 * Created by mumarm45 on 14/04/2019.
 */
import {getAllToken} from "../util/API";
export const GET_USERS = 'GET_USERS';

export function getAllUser(User) {
    return {
        type: GET_USERS,
        User
    }
}

export function handleReceiveUsers(token) {
    return (dispatch) => {
        return getAllToken(token).then((users) => {
            return dispatch(getAllUser(users));
        });
    }
}


