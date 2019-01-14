/**
 * Created by mumarm45 on 22/12/2018.
 */
import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Button, Col, Form, FormGroup, Glyphicon} from "react-bootstrap";
import update from "react-addons-update";
import "react-datepicker/dist/react-datepicker.css";
import FormFields from "./FormFields";
import {connect} from "react-redux";
import {addAndUpdate, handleDeleteFamilyMember} from "../action/family";
import {handleAddStudent, handleUpdateStudent} from "../action/students";
import {addcurrentstudent, handleCurrentStudent} from "../action/currentStudent";

class StudentForm extends Component {
    state = {
        formUpdateAction: false,
        basicInfo: {
            firstName: '',
            lastName: '',
            dateOfBirth: new Date()
        }, families: []
    };


    handleDateChange = (date) => {
        this.setState((preState) => {
            return {...preState, basicInfo: {...preState.basicInfo, dateOfBirth: date}}
        })
    };

    handleOnChange = (valueOf, idx, name, value) => {
        this.setState((state) => {
            if (idx !== undefined)
                return update(state, {[valueOf]: {[idx]: {[name]: {$set: value}}}});
            else
                return {...state, [valueOf]: {...state[valueOf], [name]: value}};
        })
    };

    componentDidMount() {
        const {basicInfo, families} = this.props;
        if (!basicInfo.nationality && basicInfo.ID) {
            this.props.dispatch(handleCurrentStudent(Object.assign({}, basicInfo)));
        }
        if (basicInfo.ID) {
            this.setState(() => ({
                formUpdateAction: true
            }));
        }
        this.setState(() => {
            return {
                basicInfo: {...basicInfo, dateOfBirth: basicInfo.dateOfBirth}, families: families
            }
        })
    }

    addNewFamilyMember = () => {
        this.setState((state) => {
            return {
                ...state, families: state.families.concat({
                    firstName: '',
                    lastName: '',
                    dateOfBirth: new Date(), relationship: ''
                })
            }
        });
    };

    deleteFamilyMember = (stId, currentidx, famId) => {
        const {dispatch} = this.props;
        if (!famId) {
            this.setState(() => {
                return {
                    families: this.state.families.filter((fam, index) => {
                        return currentidx !== index
                    })
                }
            });
            return;
        }
        dispatch(handleDeleteFamilyMember(stId, famId));

    };

    onSubmitForm = (event) => {
        debugger;
        event.preventDefault();

        (this.state.basicInfo !== this.props.basicInfo) && this.updateBasicInfo();
        (this.state.families !== this.props.families) && this.addAndUpdateFamilies();
    };


    updateBasicInfo = () => {
        const {dispatch} = this.props;
        const {basicInfo} = this.state;
        if (basicInfo.ID) {
            dispatch(handleUpdateStudent(basicInfo))
        } else {
            dispatch(handleAddStudent(basicInfo));

        }
    };

    componentDidUpdate(preProps) {
        const isArray = Array.isArray(preProps.families) && Array.isArray(this.props.families);
        const isLengthZero = isArray ? (preProps.families.length === 0 && this.props.families.length === 0) : false;
        if ((preProps.families !== this.props.families) && !isLengthZero) {
            this.setState(() => {
                return {
                    families: this.props.families
                }
            })
        }
        if (preProps.basicInfo !== this.props.basicInfo) {
            const {basicInfo} = this.props;

            this.setState(() => {
                return {
                    basicInfo: {...basicInfo, nationality: basicInfo.nationality}
                }
            })
        }

    }

    checkAuth = () => {
        const {authedUser} = this.props;
        const {ID} = this.state.basicInfo;
        return !!(authedUser === 'registrar' && ID)
    };
    addAndUpdateFamilies = () => {
        const {dispatch} = this.props;
        const {basicInfo, families} = this.state;
        dispatch(addAndUpdate(basicInfo.ID, families));


    };


    render() {
        const {basicInfo, families} = this.state;
        return (
            <Form horizontal onSubmit={(event) => this.onSubmitForm(event)}>
                <h3>Basic Info</h3>
                <FormFields family={basicInfo} handleOnChange={this.handleOnChange} idx={undefined}
                            valueOf="basicInfo"
                            onDateChange={this.handleDateChange}/>
                <Col sm={10}>
                    <h3>Family Info</h3>
                    {this.checkAuth() && <Button onClick={this.addNewFamilyMember}> <Glyphicon glyph="plus"/> </Button>}
                </Col>
                {
                    Array.isArray(families) && families.map((fam, idx) => {
                        return (
                            <Fragment key={'fam_div' + idx}>
                                <Col smOffset={10} sm={5}>
                                    {this.checkAuth() && <Button key={'button' + idx}
                                                                 onClick={() => this.deleteFamilyMember(basicInfo.ID, idx, fam.ID)}>
                                        <Glyphicon glyph="minus"/> </Button>}
                                </Col>

                                <FormFields key={'fam' + idx} family={fam} handleOnChange={this.handleOnChange}
                                            idx={idx}
                                            valueOf="families"
                                            onDateChange={this.handleDateChange}/>
                                <hr/>
                            </Fragment>

                        )
                    })
                }
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Submit</Button>

                    </Col>
                </FormGroup>
            </Form>
        )

    }
}

function mapStateToProps({currentStudent, families, authedUser}, {basicInfo}) {
    const getId = basicInfo.ID ? basicInfo.ID : currentStudent ? currentStudent.ID : undefined;
    return {
        families: families[getId] ? families[getId] : [],
        basicInfo: currentStudent, authedUser
    }
}

StudentForm.protoType = {
    basicInfo: PropTypes.object.isRequired,
    families: PropTypes.array.isRequired,
};


export default connect(mapStateToProps)(StudentForm);