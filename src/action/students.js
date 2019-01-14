/**
 * Created by mumarm45 on 20/12/2018.
 */
import {addStudentBasicInfo, fetchStudents, getStudentNationality, updateStudent} from "../util/API";
import {changeUserRole} from "../action/authedUser";
import {addcurrentstudent} from "../action/currentStudent";
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const RECEIVE_STUDENT = 'RECEIVE_STUDENT';
export const UPDATE_NATIONALITY = 'UPDATE_NATIONALITY';
export const RECEIVE_NATIONALITY = 'RECEIVE_NATIONALITY';
export const ADD_STUDENT = 'ADD_STUDENT';


const receviestudents = (students) => {
    return {
        type: RECEIVE_STUDENTS,
        students
    }
};
const addstudent = (student) => {
    return {
        type: ADD_STUDENT,
        student
    }
};

export const updatestudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
};

export function receviestudent(id) {
    return {
        type: RECEIVE_STUDENT,
        id
    }
}
export function updatesnationality(student) {
    return {
        type: UPDATE_NATIONALITY,
        student
    }
}
export function receivenationality(id) {
    return {
        type: RECEIVE_NATIONALITY,
        id
    }
}
export function handleReceiveStudent() {
    return (dispatch) => {
        return fetchStudents().then((students) => {
            dispatch(receviestudents(students));
            dispatch(changeUserRole('admin'))
        });
    }
}


export function handleUpdateStudent(student) {
    return (dispatch) => {
        const isDate = student.dateOfBirth instanceof Date;
        return updateStudent(student).then((stud) => {
            dispatch(updatestudent({
                ...student,
                dateOfBirth: isDate? student.dateOfBirth.toISOString():student.dateOfBirth.toString(),
                nationality: student.nationality ? stud.nationality : undefined
            }));
        });
    }
}
export function handleAddStudent(student) {
    return (dispatch) => {
        const isDate = student.dateOfBirth instanceof Date;
        return addStudentBasicInfo(student).then((stu) => {
            const newStudent={
                ...stu,
                dateOfBirth: isDate ? student.dateOfBirth.toISOString() : student.dateOfBirth.toString()
            };
            dispatch(addstudent(newStudent));
            dispatch(addcurrentstudent(newStudent));
            return newStudent
        });
    }
}