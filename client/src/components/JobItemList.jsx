import React, { useState } from 'react';
import JobItem from './JobItem';
import './JobItemList.css';
import JobFormModal from './jobFormModal';

const JobItemList = ({ jobItems, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditedItem(item);
  };

  const handleSave = (editedFormData) => {
    // Create a new array with the updated data
    const updatedJobItems = jobItems.map((item) => {
      if (item === editedItem) {
        return editedFormData;
      }
      return item;
    });

    // Call the onEdit function with the updated job items
    onEdit(updatedJobItems);
    setIsEditing(false); // Close the modal after saving
  };

  return (
    <div className='job-items-container'>
      {jobItems.map((item, index) => (
        <div key={index} className='job-item'>
          <JobItem job={item} />
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
      {isEditing && editedItem && (
        <JobFormModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSubmit={handleSave}
          formData={editedItem}
        />
      )}
    </div>
  );
};

export default JobItemList;
