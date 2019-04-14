/**
 * Created by mumarm45 on 21/12/2018.
 */
import {accessToken} from "../util/API";
export const SET_AUTH_TOKEM = 'SET_AUTH_TOKEM';

export function saveAccessToken(authedUser) {
    return {
        type: SET_AUTH_TOKEM,
        authedUser
    }
}

export function handleReceiveAuthenticate(user) {
    return (dispatch) => {
        return accessToken(user).then(({access_token}) => {
            return dispatch(saveAccessToken(access_token));
        });
    }
}

