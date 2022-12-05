import React from "react";

class Login extends React.Component {
    constructor(props)
    {   super(props);
        this.state={
        email: "",
        password:"",
        isLoggedin : this.props.isLoggedin
    };
        this.isLoggedin  = this.isLoggedin.bind(this);

    }

    componentDidMount()
    {
        if(localStorage.getItem('isLoggedIn')==='true')
                    {
                        this.setState({isLoggedin:true}) ;
                    }
                    else
                    {
                        this.setState({isLoggedin:false}) ;
                    }
    }
    

    async isLoggedin(){
        var email =this.state.email;
        var password =this.state.password;
        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/user/getuser';
        let bodyData = {'email': email, 'password': password};

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();

        if (response.ok) {
            if(data.status==="success")
            {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', data.role);
                localStorage.setItem('uID', data.uID);
                this.setState({isLoggedin:true});
            }
            else
            {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('role', '');
                localStorage.setItem('uID', '');
                alert("Invalid Credentials");
            }
            return data;
        } else {
            return `HTTP error: ${response.status}`;
        }  
    }

    render()
    {
        if (this.state.isLoggedin===true)
        {   
            return null;
        }
        else{
            return(
   
                    <div className="field">
            <label>Email</label>
            <input type="text" name="email" value={this.state.blogTitle} placeholder="email" onChange={(e)=>{this.setState({email:e.target.value})}}></input>
            <label>Password</label>
            <input type="text" name="password" value={this.state.blogSummary} placeholder="password" onChange={(e)=>{this.setState({password:e.target.value})}}></input>
            <button className="ui primary button" onClick={this.isLoggedin}>Log In</button>
                    </div>
                    
            
            )
        }
    }
}
export default Login;
