/**
 * Created by mumarm45 on 22/12/2018.
 */
import {Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {connect} from "react-redux";
class FormFields extends React.Component {


    handleDateChange = (date) => {
        const {valueOf, idx} = this.props;
        this.props.handleOnChange(valueOf, idx, 'dateOfBirth', date);
    };

    handleOnChange = (event) => {
        const {name, value} = event.target;
        const {valueOf, idx} = this.props;
        this.props.handleOnChange(valueOf, idx, name, value);
    };

    isDisable = () => {
        const {authedUser} = this.props;
        const {ID} = this.props.family;
        return !!(authedUser === 'admin' && ID);
    };


    render() {
        const {firstName, lastName, dateOfBirth, nationality, relationship} = this.props.family;
        const {nationalities,valueOf} = this.props;

        return (
            <div>
                <FormGroup controlId="basicFirstName">
                    <Col componentClass={ControlLabel} sm={4}>
                        First Name
                    </Col>
                    <Col sm={8}>
                        <FormControl value={firstName} type="text" disabled={this.isDisable()} name='firstName'
                                     onChange={this.handleOnChange} placeholder="First Name"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="basicLastName">
                    <Col componentClass={ControlLabel} sm={4}>
                        Last Name
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" value={lastName} disabled={this.isDisable()} name='lastName'
                                     onChange={this.handleOnChange} placeholder="Last Name"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={4}>Date of Birth</Col>
                    <Col sm={8}>
                        <DatePicker id="datepicker" name="dateOfBirth" dateFormat="yyyy/MM/dd" disabled={this.isDisable()}
                                    selected={new Date(dateOfBirth)}
                                    onChange={this.handleDateChange}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="nationalitySelect">
                    <Col componentClass={ControlLabel} sm={4}>Nationality</Col>
                    <Col sm={8}>
                        <FormControl componentClass="select" name="nationality"
                                     value={nationality ? nationality.ID : ''} disabled={this.isDisable()}
                                     onChange={this.handleOnChange}
                                     placeholder="select">
                            <option value=''>Select</option>
                            {
                                nationalities.map((national) => {
                                    return <option key={national.ID} value={national.ID}>{national.Title}</option>
                                })
                            }

                        </FormControl>
                    </Col>


                </FormGroup>
                {valueOf==='families' && <FormGroup controlId="relationShipSelect">
                    <Col componentClass={ControlLabel} sm={4}>Relationship</Col>
                    <Col sm={8}>
                        <FormControl componentClass="select" name="relationship"
                                     value={relationship ? relationship : ''} disabled={this.isDisable()}
                                     onChange={this.handleOnChange}
                                     placeholder="select">
                            <option value=''>Select</option>
                            {
                                //this can be move to global store as well
                                ['Brother','Parent','Sister','Spouse'].map((relation) => {
                                    return <option key={relation} value={relation}>{relation}</option>
                                })
                            }

                        </FormControl>
                    </Col>


                </FormGroup>}

            </div>
        )
    }
}
function mapStateToProps({nationalities, authedUser}) {
    return {nationalities, authedUser};
}
export default connect(mapStateToProps)(FormFields);