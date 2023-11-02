
import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './nav';
import JobFormModal from './jobFormModal';
import JobItemList from './JobItemList'; 
import './JobItem.css';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('dropdownhere');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    jobLink: '',
    jobTitle: '',
    jobDescription: ''
  });
  const [jobItems, setJobItems] = useState([]); 

  useEffect(() => {
    // Fetch job data from your API endpoint when the component mounts
    fetch('/api/getJobs') // Replace with your actual backend endpoint
      .then((response) => response.json())
      .then((data) => {
        // Update the jobItems state with the received data
        setJobItems(data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, []);

  const handleToggleForm = () => {
    // reset the form data when the modal is closed
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

    // add the submitted job data to the jobItems state
    const newJobItem = { ...formData };
    setJobItems([...jobItems, newJobItem]);

    // reset the form data to its initial state (empty input fields)
    setFormData({
      jobLink: '',
      jobTitle: '',
      jobDescription: ''
    });

    handleToggleForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (index) => {
    console.log('Edit clicked for job item at index:', index);
  };

  const handleDelete = (index) => {
    // Implement delete functionality here
    // You can update the stats and remove the job item from the list
    console.log('Delete clicked for job item at index:', index);
    const updatedJobItems = [...jobItems];
    updatedJobItems.splice(index, 1);
    setJobItems(updatedJobItems);
  };

  return (
    <div className='main-container'>
      <div>
        <Nav />
      </div>

      <div className='content-container'>
        <div className='left-container'>
        <div className='left'>
        <div className='search-box'>
        <input type='text' placeholder='Search Job' className='search-input' />
        <button className='search-button'>Search</button>
      </div>
      <div className='stats-box'>
        <h2>Stats</h2>
        <p>This Month</p>
        <p>0</p>
      </div>
        <div className='status-box'>
          <h2>Status</h2>
          <button className='status-button'>Applied</button>
          <button className='status-button'>Not Applied</button>
          <button className='status-button'>Closed</button>
          <button className='status-button'>Assessment</button>
          <button className='status-button'>Rejected</button>
          <button className='status-button'>Interview</button>
        </div>
      </div>
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
          <div>
        <JobItemList
        jobItems={jobItems}
        updatedJobItems = {setJobItems} 
        onEdit={handleEdit}
        onDelete={handleDelete} />
      </div>
        </div>
      </div>

      <JobFormModal
        jobItems={jobItems}
        updatedJobItems = {setJobItems}
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
