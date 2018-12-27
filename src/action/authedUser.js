/**
 * Created by mumarm45 on 21/12/2018.
 */
export const AUTH_USER_ROLE = 'AUTH_USER_ROLE';

export function changeUserRole(authedUser) {
    return {
        type: AUTH_USER_ROLE,
        authedUser
    }
}


