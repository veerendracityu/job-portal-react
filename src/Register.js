import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";


class Register extends React.Component{
state={
    uID: uuidv4(),
    firstName:"",
    lastName: "",
    email: "",
    password:"",
    role:"user"
}
  
Register = (e)=>
{
    e.preventDefault();
    if(this.state.firstName==="" || this.state.lastName===""||this.state.email===""||this.state.password==="")
    {
        alert("*All fields are mandatory");
        return
    }

    this.AddData();
}

async AddData() {
    
    let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/user';

    let bodyData = {
        "uID": uuidv4(),
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "password": this.state.password,
        "role": "user",
        "skills": "NA",
        "experience": "10",
        "currentTitle": "NA"

      }
      ;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    if (data.email===this.state.email)
    {
        alert("Registered Successfully!");
        this.setState({uID: uuidv4(),
            firstName:"",
            lastName: "",
            email: "",
            password:"",
            role:"user"});
    }
    else
    {
        alert("Error: Failed to register!")
    }
  }

render(){
    return(
        <div className="ui main">
            <Header/>
            <h2>Register</h2>
            <form className="ui form" onSubmit={this.Register}>
            <div className="field">
            <label>First Name</label>
            <input type="text" name="FirstName" value={this.state.firstName} placeholder="First Name" onChange={(e)=>{this.setState({firstName:e.target.value})}}></input>
            <label>Last Name</label>
            <input type="text" name="LastName" value={this.state.lastName} placeholder="Last Name" onChange={(e)=>{this.setState({lastName:e.target.value})}}></input>
            <label>Email</label>
            <input type="text" name="Email" value={this.state.email} placeholder="Email" onChange={(e)=>{this.setState({email:e.target.value})}}></input>
            <label>Password</label>
            <input type="text" name="Password" value={this.state.password} placeholder="Password" onChange={(e)=>{this.setState({password:e.target.value})}}></input>
            </div>
            <button className="ui button blue">Register User</button>
            </form>
            </div>    
    );
}
}

export default Register;
