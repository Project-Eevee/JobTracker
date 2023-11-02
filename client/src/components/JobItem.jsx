import React from 'react';

const JobItem = ({ job }) => {
  return (
    <div className='job-item'>
      <p>Company Name: {job.name}</p>
      <p>Job Name: {job.role}</p>
      <p>Date Applied: {job.date_applied}</p>
      <p>Salary: {job.salary}</p>
      <p>Interest Level: {job.interest_level}</p>
      <p>Contact Email: {job.email}</p>
    </div>
  );
};

export default JobItem;