import React from 'react';
import JobItem from './JobItem';
import './JobItemList.css'; // Import the CSS file for JobItemList component

const JobItemList = ({ jobItems }) => {
  return (
    <div className='job-items-container'>
      {jobItems.map((item, index) => (
        <JobItem key={index} job={item} />
      ))}
    </div>
  );
};

export default JobItemList;