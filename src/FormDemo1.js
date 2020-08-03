import React, { Component} from 'react';
import alertify from "alertifyjs";

class FormDemo1 extends Component {
    state={
        userName:"",
        password:""
    }
    onChangeHandler=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value});
    }
    onSubmitHandler=(event)=>{
        event.preventDefault();
        alertify.success(this.state.userName+" saved to the db!", 1);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Username</h3>
                    <input type="text" onChange={this.onChangeHandler} name="userName" id="userName" placeholder="type your username"></input>
                    <label value={this.state.userName}>{this.state.userName}</label>
                    <input type="password" onChange={this.onChangeHandler} name="password" id="password" placeholder="type your password"></input>
                    <label value={this.state.password}>{this.state.password}</label>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        );
    }
}

export default FormDemo1;