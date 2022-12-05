import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default class JobList extends React.Component{
    constructor()
    {
        super();
        this.state = {jobs:[]}
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

    render(){
        const { jobs } = this.state;
        const jobList = jobs.map(
      job =>
      <div key={job.jID} className="item">
    <div className="content">
      <Link to={`/jobPost/?jid=${job.jID}`}><h3 style={{color:"black"}}>{job.jobTitle}</h3></Link>
      <p></p>
      <div className="description" style={{color:"black"}}>{job.jobDescription}</div>
    </div>
  </div>
    );

return(
<div>
<Header/>
<div style={{ overflow: 'scroll',
      height:"700px"}} className="ui relaxed divided list">
  {jobList}
</div>
</div>
);
    }
}

   