/**
 * Created by mumarm45 on 14/04/2019.
 */
import {Table} from "react-bootstrap";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAllToken} from "../util/API";
import {handleReceiveUsers} from "../action/user";
class User extends React.Component {

    state = {users:[]};

    componentDidMount(){
        const { authedUser } = this.props;
        authedUser && this.props.dispatch(handleReceiveUsers(authedUser));
    }

    render(){
        const { authedUser, User } = this.props;
        if (!authedUser) {
            return <Redirect to='/' />
        }
        return (<Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
             {
                 User &&   User.content.map(cnt=> (<tr key={cnt.id}>
                    <td>{cnt.id}</td>
                    <td>{cnt.username}</td>
                    <td>{cnt.email}</td>
                    <td>{cnt.name}</td>
                </tr>))
            }


            </tbody>
        </Table>)
    }


}

const mapStateToProps =  ({authedUser, User}, props) =>  {
    return {
        authedUser, User
    }
};
export default connect(mapStateToProps)(User);