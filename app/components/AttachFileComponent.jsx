import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useState } from 'react';
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";

const AttachFileComponent = ({ onUploadFile }) => {
  // State for tracking the file upload status
  const [isUploading, setIsUploading] = useState(false);

  // Handler for file input change
  const handleUploadFileonChange = async (e) => {
    // Extracting files from the input
    const files = [...e.target.files];
    // Set uploading status to true
    setIsUploading(true);

    // Create a FormData object to append files
    const uploadedFiles = new FormData();
    files.forEach((file) => {
      uploadedFiles.append('file', file);
    });

    try {
      // Send a POST request to the server for file upload
      const res = await axios.post('/api/upload', uploadedFiles);
      // Callback to parent component with the uploaded file data
      onUploadFile(res.data);
      // Set uploading status to false
      setIsUploading(false);
    } catch (err) {
      // Log any errors during the upload process
      console.log(err);
      // Set uploading status to false
      setIsUploading(false);
    }
  };

  return (
    <label className="flex gap-2 py-2 px-4 cursor-pointer text-gray-600 items-center">
      {/* Loader to indicate file upload in progress */}
      <MoonLoader color="#4B5563" loading={isUploading} size={16} />
      {/* Text indicating file upload status */}
      <MdOutlineFileUpload className='w-5 h-5'/>
      <span className={(isUploading ? 'text-gray-400' : 'text-gray-600')}>
        {isUploading ? 'Uploading...' : 'Attach Files'}
      </span>
      {/* Hidden file input for selecting files */}
      <input onChange={handleUploadFileonChange} multiple type="file" className="hidden" />
    </label>
  );
};      

export default AttachFileComponent;
