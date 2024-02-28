const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyparser.json());

let jobListing = [];
let jobApplications= [];

app.post('/api/v1/jobs',(req,res)=> {
    const {title, company, location, description} = req.body;
    const newJoblisting = {title,company,location, description};
    jobListing.push(newJoblisting);
    res.status(201).json(newJoblisting);

});
app.get('/api/v1/jobs', (req,res)=>{
    res.status(200).json(jobListing);

});

app.post('/api/v1/apply/:jodId',(req, res)=>{
    const { jobId} = req.param;
    const{ applicantName, applicantEmail, coverLetter} = req.body;
    const newJobApplication ={jobId, applicantName, applicantEmail, coverLetter, applicationDate: new Date()};
    jobApplications.push(newJobApplication);
    res.status(201).json(newJobApplication);
});

app.get('/api/v1/jobs/:jobId/application',(req,res)=>{
    const{jobId} = req.param;
    const jobApplicationsForJob = jobApplications.filter(application => express.application.jobId ===jobId);
    res.status(200).json(jobApplicationsForJob);
});

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});
