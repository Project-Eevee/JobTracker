import React from 'react';

const JobItem = ({ job }) => {
  return (
    <div className='job-item'>
      <p>Company Name: {job.companyName}</p>
      <p>Job Name: {job.nameOfRole}</p>
      <p>Date Applied: {job.dateApplied}</p>
      <p>Salary: {job.salary}</p>
      <p>Interest Level: {job.interestLevel}</p>
      <p>Contact Email: {job.contactEmail}</p>
    </div>
  );
};

export default JobItem;