import React, { Component } from 'react';
import {Button,Form,FormGroup,Label,Input} from "reactstrap";
import alertify from "alertifyjs";

class FormDemo2 extends Component {
    state={
        userName:"",email:"",password:"",description:""
    }
    
    onChangeHandler=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value});
    }
    onSubmitHandler=(event)=>{
        event.preventDefault();
        alertify.success(this.state.userName+"---"+this.state.email+"---"+this.state.password+"---",this.state.description, 1);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}>
                    <FormGroup>
                        <Label for="userName">User Name:</Label>
                        <Input type="text" name="userName" id="userName" onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input type="email" name="email" id="email" onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input type="password" name="password" id="password" onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description:</Label>
                        <Input type="textarea" name="description" id="description" onChange={this.onChangeHandler}></Input>
                    </FormGroup>
                    <Button  color="success">Save</Button>
                </Form>
            </div>
        );
    }
}

export default FormDemo2;