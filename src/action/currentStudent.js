import {getStudentNationality} from "../util/API";
import  {updatestudent} from '../action/students';
/**
 * Created by mumarm45 on 26/12/2018.
 */
export const RECEIVE_STUDENT = 'RECEIVE_STUDENT';
export const ADD_CURRENT_STUDENT = 'ADD_CURRENT_STUDENT';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';
export const UPDATE_CURRENT_STUDENT = 'UPDATE_CURRENT_STUDENT';

export const receviestudent = (student) => {
    return {
        type: RECEIVE_STUDENT,
        student
    }
};
export const addcurrentstudent = (student) => {
    return {
        type: ADD_CURRENT_STUDENT,
        student
    }
};

export const updatecurrentstuent = (student) => {
    return {
        type: UPDATE_CURRENT_STUDENT,
        student
    }
};

export function handleCurrentStudent(student) {
    return (dispatch) => {
        return getStudentNationality(student.ID).then(({nationality}) => {
            student['nationality'] = nationality;
            dispatch(updatecurrentstuent(student));
           dispatch(updatestudent(student));
        });
    }
}