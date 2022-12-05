import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { v4 as uuidv4 } from 'uuid';


export default class Admin extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isAdmin: false,
            jobs:[],
            openModal: false,
            jobTitle:"",
            jobDescription:"",
            skills:"",
            jobSalary:"",
            jobLocation:"",
            experience:"",
            hRName:"",
            hREmail:""

        }
    }

    componentDidMount(){
        this.LoadData();
    }

    async LoadData(){
        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/job';
        let response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            this.setState({jobs: data})
            return data;
        } else {
            return `HTTP error: ${response.status}`;
        }   
    }

    componentWillMount()
    {
        if(localStorage.getItem('role')==='admin')
        {
            this.setState({isAdmin:true})
        }
    }

    onClickButton = e =>{
        e.preventDefault()
        this.setState({openModal : true})
    }

    onCloseModal = ()=>{
        this.setState({openModal : false})
        this.LoadData();
    }

    AddJob = (e)=>
    {
        e.preventDefault();
        if(this.state.jobTitle==="" || this.state.jobDescription===""||this.state.skills===""
        ||this.state.jobSalary===""||this.state.jobLocation===""||this.state.experience===""
        ||this.state.hRName===""||this.state.hREmail==="")
        {
            alert("*All fields are mandatory");
            return
        }

        this.AddData();
    }

    async AddData() {
    
        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/job';
    
        let bodyData = {
            "jID": uuidv4(),
            "jobTitle": this.state.jobTitle,
            "jobDescription": this.state.jobDescription,
            "skills": this.state.skills,
            "jobSalary": this.state.jobSalary,
            "jobLocation": this.state.jobLocation,
            "experience": this.state.experience,
            "hRName": this.state.hRName,
            "hREmail": this.state.hREmail
          };
    
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
    
        const data = await response.json();
        if (data.jobTitle===this.state.jobTitle)
        {
            alert("Created Successfully!");
            this.setState({jobTitle:"",
            jobDescription:"",
            skills:"",
            jobSalary:"",
            jobLocation:"",
            experience:"",
            hRName:"",
            hREmail:""});
        }
        else
        {
            alert("Error: Failed to create Job!")
        }
      }

    async DeleteJob(id){
        let url = 'https://jcorioni93.execute-api.us-east-1.amazonaws.com/v1/job';

        let bodyData = {
            "jID": id
          };

        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const data = await response.json();
        alert(data.status);
        this.LoadData();
        return data;
    }

    render()
    {
        const { jobs } = this.state;
        const jobList = jobs.map(
      job =>
      <div key={job.jID} className="item">
        <div className="content">
        <Link to={`/jobPost/?jid=${job.jID}`}><h3 style={{color:"black"}}>{job.jobTitle}</h3></Link>
        <p></p>
        <div className="description" style={{color:"black"}}>{job.jobDescription}</div>
        <p></p>
        <button className="ui red button" onClick={()=>this.DeleteJob(job.jID)}>Delete</button>
        </div>
    </div>
    );
        if(this.state.isAdmin)
        {
            return(
                <>
                <Header/>
                <h2>Hello Admin!</h2>
                <button  className="ui green button" onClick={this.onClickButton}>Add Job</button>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                <h2>Register</h2>
                <form className="ui form" onSubmit={this.AddJob}>
                <div className="field">
                <label>Job Title</label>
                <input type="text" name="jobTitle" value={this.state.jobTitle} placeholder="Job Title" onChange={(e)=>{this.setState({jobTitle:e.target.value})}}></input>
                <label>Job Description</label>
                <input type="text" name="jobDescription" value={this.state.jobDescription} placeholder="Job Description" onChange={(e)=>{this.setState({jobDescription:e.target.value})}}></input>
                <label>Skills</label>
                <input type="text" name="skills" value={this.state.skills} placeholder="Skills" onChange={(e)=>{this.setState({skills:e.target.value})}}></input>
                <label>Job Salary</label>
                <input type="text" name="jobSalary" value={this.state.jobSalary} placeholder="Job Salary" onChange={(e)=>{this.setState({jobSalary:e.target.value})}}></input>
                <label>Location</label>
                <input type="text" name="location" value={this.state.jobLocation} placeholder="Location" onChange={(e)=>{this.setState({jobLocation:e.target.value})}}></input>
                <label>Experience</label>
                <input type="text" name="experience" value={this.state.experience} placeholder="Experience" onChange={(e)=>{this.setState({experience:e.target.value})}}></input>
                <label>HR Name</label>
                <input type="text" name="hrName" value={this.state.hRName} placeholder="HR Name" onChange={(e)=>{this.setState({hRName:e.target.value})}}></input>
                <label>HR Email</label>
                <input type="text" name="hrEmail" value={this.state.hREmail} placeholder="HR Email" onChange={(e)=>{this.setState({hREmail:e.target.value})}}></input>
                </div>
                <button className="ui button blue">Create Job</button>
                </form>
                </Modal>
                {jobList}
                </>
            );
        }
        else
        {
            return(<><Header /><h2>Please login with Admin Account and Refresh!</h2></>);
        }
    }
}