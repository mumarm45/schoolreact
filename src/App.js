import React, {Component, Fragment} from "react";
import "./App.css";
import Login from "./component/Login";
import User from "./component/User";
import {connect} from "react-redux";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
class App extends Component {

    isLogin() {
        const {authedUser} = this.props;
        return authedUser;
    }


    render() {

        return (
            <Router>
                <Route exact path="/user" component={User} />
                <Route exact path="/" component={Login}/>
            </Router>

        )
    }
}

const mapStateToProps = ({authedUser}, props) => {
    return {
        authedUser
    }
};
export default connect(mapStateToProps)(App);
