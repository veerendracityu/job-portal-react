import React from "react";

class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn: false
        }
        this.UpdateLogout = this.UpdateLogout.bind(this);
    }
  

    UpdateLogout(){
        localStorage.setItem('isLoggedIn','false');
        localStorage.setItem('role','');
        localStorage.setItem('uID','');
        this.setState({isLoggedIn:false})
        window.location.reload(false);
    }

    render()
    {  
        return(<div>
             <button className="ui button" onClick={this.UpdateLogout}>Log Out</button>
        </div>);
    }
  
}
export default Logout;

