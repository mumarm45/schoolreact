/**
 * Created by mumarm45 on 21/12/2018.
 */

import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserRole from "./UserRole";
import StudentForm from "./StudentForm";
class UserDetails extends Component {
    state = {
        student: ''
    };


    handleClose = () => {
        this.props.onHide();
    };

    render() {
        const {student} = this.props;
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Student Details for {student.ID}
                        <UserRole/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<StudentForm basicInfo={student}/>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default connect()(UserDetails)
UserDetails.protoType = {
    "show": PropTypes.bool.isRequired,
    "onHide": PropTypes.func.isRequired,
    "student": PropTypes.object.isRequired
};

