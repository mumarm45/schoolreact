/**
 * Created by mumarm45 on 14/04/2019.
 */
import {Col, ControlLabel, FormControl, FormGroup, Button, Glyphicon} from "react-bootstrap";
import React, {Component} from "react";
import {connect} from "react-redux";
import {handleReceiveAuthenticate} from "../action/authedUser";
import {Redirect} from "react-router-dom";
class Login extends React.Component {

    state = {username: '', password: ''};
    handleOnChange = (event) => {
        const {name, value} = event.target;
        this.setState(()=> ({[name]:value}));
    };
    login(credentials){
        this.props.dispatch(handleReceiveAuthenticate(credentials));
    }


    render() {
        const { authedUser } = this.props;
        if(authedUser) { return <Redirect to='/user' />}
       return (
           <div>
               {this.state.password}
               <FormGroup controlId="basicFirstName">
                   <Col componentClass={ControlLabel} sm={4}>
                      Username
                   </Col>
                   <Col sm={8}>
                       <FormControl value={this.username} type="text" name='username'
                                    onChange={this.handleOnChange} placeholder="Username"/>
                   </Col>
               </FormGroup>
               <FormGroup controlId="basicFirstName">
                   <Col componentClass={ControlLabel} sm={4}>
                       Password
                   </Col>
                   <Col sm={8}>
                       <FormControl value={this.password} type="password" name='password'
                                    onChange={this.handleOnChange} placeholder="Password"/>
                   </Col>
               </FormGroup>
               <Col smOffset={10} sm={5}>
                   <Button type="submit"
                           onClick={() => this.login(this.state)}>
                       <Glyphicon glyph="minus"/> </Button>
               </Col>

           </div>
       )
    }
}
const mapStateToProps =  ({authedUser}, props) =>  {
    return {
        authedUser
    }
};
export default connect(mapStateToProps)(Login);