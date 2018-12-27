/**
 * Created by mumarm45 on 23/12/2018.
 */
import {RECEIVE_NATIONALITIES} from "../action/share";

export default function nationalities(state = [], action) {
    switch (action.type) {
        case RECEIVE_NATIONALITIES:
            return action.nationalities;
        default:
            return state;
    }
}

