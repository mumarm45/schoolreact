/**
 * Created by mumarm45 on 21/12/2018.
 */

import React, {Component} from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {changeUserRole} from '../action/authedUser'
import {connect} from "react-redux";
class UserRole extends Component {

    changeRole = (role) => {
      this.props.dispatch(changeUserRole(role));
    };

    render() {
        const roles = ['admin', 'registrar'];

        return (
            <DropdownButton
                bsStyle={'primary'}
                title={'Role:'+this.props.authedUser}
                key={'role'} id="role"
            >
                {roles.map((role, idx) => {
                    return ( <MenuItem key={role} onClick={()=>{this.changeRole(role)}} eventKey={idx}>{role}</MenuItem>)
                })}
            </DropdownButton>
        )


    }
}
function mapStateToProps({ authedUser}) {
    return {authedUser};
}
export default connect(mapStateToProps)(UserRole)