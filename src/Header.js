import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reset: false,
            isLoggedIn:false
        };

    }

    componentDidMount()
    {
       
    }

    render()
    {
        return(
            <div className="ui secondary  menu">
                <div className="item">
    <Link to="/" style={{color: 'black'}}><h3><u>Home</u></h3></Link>
  </div>
  <div className="item">
    <Link to="/admin" style={{color: 'black'}}><h3><u>Admin</u></h3></Link>
  </div>
  <div className="item">
    <Link to="/register" style={{color: 'black'}}><h3><u>Register</u></h3></Link>
  </div>
                <div className="right menu">
                <Login isLoggedin={ ()=>{
                    if(localStorage.getItem('isLoggedIn')==='true')
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                }/>
                <Logout/>
            </div>
            </div>
            
        );
    }
} 