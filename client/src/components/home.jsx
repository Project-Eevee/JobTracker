// Home.js
import React, { useState } from 'react';
import './home.css';
import Nav from './nav';
import JobFormModal from './jobFormModal';
import JobItemList from './JobItemList'; // Import the JobItemList component
import './JobItem.css'; // Import the CSS file for JobItem component

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('dropdownhere');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    jobLink: '',
    jobTitle: '',
    jobDescription: ''
  });
  const [jobItems, setJobItems] = useState([]); // State variable to hold submitted job data

  const handleToggleForm = () => {
    // Reset the form data when the modal is closed
    if (isFormVisible) {
      setFormData({
        jobLink: '',
        jobTitle: '',
        jobDescription: ''
      });
    }
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add the submitted job data to the jobItems state
    const newJobItem = { ...formData };
    setJobItems([...jobItems, newJobItem]);

    // Reset the form data to its initial state (empty input fields)
    setFormData({
      jobLink: '',
      jobTitle: '',
      jobDescription: ''
    });
    // Close the form modal after submission
    handleToggleForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='main-container'>
      <div>
        <Nav />
      </div>

      <div className='content-container'>
        <div className='left-container'>
          <div className='left'>div1</div>
        </div>

        <div className='right-container'>
          <div className='toolbar'>
            <div className='dropdown'>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
              </select>
            </div>
            <div className='add-button-container'>
              <button className='add-button' onClick={handleToggleForm}>
                Add A Job
              </button>
            </div>
          </div>

          {/* Include JobItemList component under the toolbar */}
          <JobItemList jobItems={jobItems} />
        </div>
      </div>

      <JobFormModal
        isOpen={isFormVisible}
        onClose={handleToggleForm}
        onSubmit={handleFormSubmit}
        onChange={handleInputChange}
        formData={formData}
      />
    </div>
  );
};

export default Home;
