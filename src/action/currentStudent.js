/**
 * Created by mumarm45 on 26/12/2018.
 */
export const RECEIVE_STUDENT = 'RECEIVE_STUDENT';
export const ADD_CURRENT_STUDENT = 'ADD_CURRENT_STUDENT';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';

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

export const removestudent = (student) => {
    return {
        type: REMOVE_STUDENT,
        student
    }
};
