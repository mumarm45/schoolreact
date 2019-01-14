/**
 * Created by mumarm45 on 20/12/2018.
 */
import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Button, Table} from "react-bootstrap";
import UserDetails from "./UserDetail";
import {handleReceiveFamilyInfo} from "../action/family";
import {addcurrentstudent} from "../action/currentStudent";
class StudentData extends React.Component {
    state = {
        show: false,
        student: undefined
    };

    handleHide() {
        this.setState({show: false});
    }

    createNew = () => {
        this.props.dispatch(addcurrentstudent({
            firstName: '',
            lastName: '',
            dateOfBirth: new Date().toISOString()
        }));
        this.setState({
            show: true, student: {
                firstName: '',
                lastName: '',
                dateOfBirth: new Date().toISOString()
            }
        });

    };
    selectDetails = (student) => {
        const {families} = this.props;
        this.setState(() => {
            return {show: true, student: student}
        });
        this.props.dispatch(addcurrentstudent(student));
        if(!families[student.ID])
        this.props.dispatch(handleReceiveFamilyInfo(student));
    };

    render() {
        const {students} = this.props;
        const rows = students.map((student, idx) => ( <tr onClick={() => {
            this.selectDetails(student, idx)
        }} key={student.ID+idx}>
            <td>{student.ID}</td>
            <td>{student.firstName + student.lastName}</td>
            <td>{student.dateOfBirth}</td>
        </tr>));
        return (
            <Fragment>
                <Button bsStyle={'primary'} onClick={this.createNew}>Create new Student</Button>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Date of birth</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                {this.state.student && <UserDetails show={this.state.show} onHide={() => {
                    this.handleHide()
                }} student={this.state.student}/>}
            </Fragment>

        )
    }
}

function mapStateToProps({students,families}) {
    return {
        students: students.students,families:families
    }
}

export default connect(mapStateToProps)(StudentData);