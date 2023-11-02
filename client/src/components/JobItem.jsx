import React from 'react';

const JobItem = ({ job }) => {
  return (
    <div className='job-item'>
      <p>Job Link: {job.jobLink}</p>
      <p>Job Title: {job.jobTitle}</p>
      <p>Job Description: {job.jobDescription}</p>
    </div>
  );
};

export default JobItem;