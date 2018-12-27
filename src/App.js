import React, {Component} from "react";
import "./App.css";
import {handleReceiveStudent} from "./action/students";
import StudentData from "./component/StudentData";
import {connect} from "react-redux";
import {Grid, Row} from "react-bootstrap";
import {handleReceiveNationalities} from "./action/share";
class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleReceiveStudent());
        this.props.dispatch(handleReceiveNationalities());
    }

    render() {
        const {loading} = this.props;
            if (loading === true) {
                return <h1>Loading..</h1>
            } else {
                return (<Grid>
                    <Row>
                        <StudentData  d="d"/>
                    </Row>
                </Grid>)
            }
    }
}

function mapStateToProps({authedUser, students}) {
    return {
        loading: students.length===0
    }
}
export default connect(mapStateToProps)(App);
