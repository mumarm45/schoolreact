/**
 * Created by mumarm45 on 20/12/2018.
 */
import {RECEIVE_STUDENT, RECEIVE_STUDENTS, ADD_STUDENT, UPDATE_STUDENT} from "../action/students";

export default function students(state = [], action) {
    switch (action.type) {
        case RECEIVE_STUDENTS:
            return action.students;
        case RECEIVE_STUDENT:
            return {...state, student: state.students.filter(stu => action.id === stu.ID)};
        case ADD_STUDENT:
            return {...state, students: state.students.concat(action.student)};
        case UPDATE_STUDENT:
            const updatestudents = Object.assign([], state.students);
            updatestudents[updatestudents.map(s=> s.ID).indexOf(action.student.ID)] = action.student;
            return {...state, students: updatestudents};
        default:
            return state;
    }
}
