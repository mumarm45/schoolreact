/**
 * Created by mumarm45 on 26/12/2018.
 */
import {ADD_CURRENT_STUDENT, RECEIVE_STUDENT, REMOVE_STUDENT} from "../action/currentStudent";
export default function currentStudent(state = null, action) {
    switch (action.type) {
        case ADD_CURRENT_STUDENT:
            return action.student;
        case RECEIVE_STUDENT:
            return action.student;
        case REMOVE_STUDENT:
            return action.id;
        default:
            return state;

    }

}