/**
 * Created by mumarm45 on 21/12/2018.
 */

import {ADD_FAMILY, DELETE_FAMILY, RECEIVE_FAMILY} from "../action/family";
export default function families(state = {}, action) {
    switch (action.type) {
        case RECEIVE_FAMILY:
            return Object.assign({},state,action.families);
        case ADD_FAMILY:
            return Object.assign({},state,action.family);
        case DELETE_FAMILY:
            return {...state,[action.ids.stuid]:state[action.ids.stuid].filter(f=>f.ID!==action.ids.famId)};
        default:
            return state;
    }
}