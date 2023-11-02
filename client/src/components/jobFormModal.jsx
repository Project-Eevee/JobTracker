import React from 'react';
import './JobFormModal.css';

const JobFormModal = ({ isOpen, onClose, onSubmit, onChange, formData }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <form onSubmit={onSubmit}>
          <div className='form-section'>
            <label>Job Link:</label>
            <div className='input-box'>
              <input
                type='text'
                name='jobLink'
                value={formData.jobLink || ''}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Job Title:</label>
            <div className='input-box'>
              <input
                type='text'
                name='jobTitle'
                value={formData.jobTitle || ''}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='form-section'>
            <label>Job Description:</label>
            <div className='input-box'>
              <textarea
                name='jobDescription'
                value={formData.jobDescription || ''}
                onChange={onChange}
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