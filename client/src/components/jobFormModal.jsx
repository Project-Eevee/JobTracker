import React from 'react';
import './JobFormModal.css';
import { useState } from 'react';
const JobFormModal = ({ isOpen, onClose, onSubmit, onChange, updatedJobItems, jobItems }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    nameOfRole: '',
    dateApplied: '',
    salary: '',
    interestLevel: '',
    contactEmail: '',
  });

// const [jobApplications, setJobApplications] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Data submitted successfully');
        updatedJobItems([...jobItems, formData]);
        // Clear the form or reset its state if needed
        setFormData({
          companyName: '',
          nameOfRole: '',
          dateApplied: '',
          salary: '',
          interestLevel: '',
          contactEmail: '',
        });
      } else {
        // Handle error
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // const renderJobApplications = () => {
  //   return jobApplications.map((application, index) => (
  //     <div key={index}>
  //       <p>Company Name: {application.companyName}</p>
  //       <p>Role: {application.nameOfRole}</p>
  //       <p>Role: {application.dateApplied}</p>
  //       <p>Role: {application.salary}</p>
  //       <p>Role: {application.interestLevel}</p>
  //       <p>Role: {application.contactEmail}</p>
  //     </div>
  //   ));
  // };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <form onSubmit={handleSubmit}>
          <div className='form-section'>
            <label>Company name</label>
            <div className='input-box'>
              <input
                type='text'
                name='companyName'
                value={formData.companyName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Name of role</label>
            <div className='input-box'>
              <input
                type='text'
                name='nameOfRole'
                value={formData.nameOfRole || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Date applied (YYYY-MM-DD)</label>
            <div className='input-box'>
              <input
                type='text'
                name='dateApplied'
                value={formData.dateApplied || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Salary</label>
            <div className='input-box'>
              <input
                type='number'
                name='salary'
                value={formData.salary || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Interest level (1-10)</label>
            <div className='input-box'>
              <input
                type='text'
                name='interestLevel'
                value={formData.interestLevel || ''}
                onChange={handleChange}
                min='1'
                max='10'
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Contact email</label>
            <div className='input-box'>
              <input
                type='email'
                name='contactEmail'
                value={formData.contactEmail || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Status (applied, rejected, interviewed, offered)</label>
            <div className='input-box'>
              <input
                type='status'
                name='jobStatus'
                value={formData.jobStatus || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JobFormModal;
