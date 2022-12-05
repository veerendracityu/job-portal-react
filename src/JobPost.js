import React from "react";
import Header from "./Header";
import { v4 as uuidv4 } from 'uuid';

class JobPost extends React.Component {
    constructor() {
        super();
        this.state = { job :[]};
        this.jid="";
        this.applyJob = this.applyJob.bind(this);
      }

    
    componentDidMount() {
     
            this.queryParams = new URLSearchParams(window.location.search);
            const id = this.queryParams.get('jid');
            this.jid =id;
            this.getData();
      }

    async applyJob()
    {
        if(localStorage.getItem('isLoggedIn')==="false")
        {
            alert("Please log in to apply");
        }
        else{
        var jid = this.jid;
        var uID = localStorage.getItem('uID');

        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/jobhistory';

        let bodyData = {
            "id": uuidv4(),
            "jID": jid,
            "remarks": "applied by user",
            "status": "applied",
            "uID": uID
          };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();
        console.log(localStorage.getItem('isLoggedIn'));
        if(data.jID ===jid)
        {
            alert("Applied Successfully");
            this.props.history.push("/");
        }
        else
        {
            alert("Error: Failed to apply! Check Login")
        }
        return data;
        }
    }

    async getData()
    {
        
        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/job/id';
        let bodyData = {'jID': this.jid};

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();
      if (response.ok)
      {
        this.setState({ job: data}); 
      } 
      else 
      {
        return `HTTP error: ${response.status}`;
      }   
    }

    render(){
        const job = this.state.job;
        const item = (<div className="item">
            
      <div className="content" style={{color:"black"}}><b>{job.jobTitle}</b></div>  
      <div className="content" style={{color:"black"}}><b>Description:</b> {job.jobDescription}</div>
      <div className="content" style={{color:"black"}}><b>Skills:</b> {job.skills}</div>
      <div className="content" style={{color:"black"}}><b>Salary:</b> {job.jobSalary}</div>
      <div className="content" style={{color:"black"}}><b>Location:</b> {job.jobLocation}</div>
      <div className="content" style={{color:"black"}}><b>Contact:</b> {job.hREmail}</div>

       
      </div>)
        return <div>
            <Header/>
        {item}
        <button className="ui primary button" onClick={this.applyJob}>Apply Job</button>
      </div>; 
    }
}
export default JobPost;
