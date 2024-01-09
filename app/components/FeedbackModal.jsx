import axios from 'axios';
import { useState } from 'react';
import Button from './Button';
import Popup from './Popup';
import Attachment from './Attachment';
import AttachFileComponent from './AttachFileComponent';
import { useSession } from 'next-auth/react';
import LoginPopup from './LoginPopup';

export default function FeedbackModal({ setShow, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploads, setUploads] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { data: session } = useSession();


  // Function to handle the click event for creating a post
  const handleCreatePostClick = (e) => {
    e.preventDefault();
    if (!session) {
      // If user is not logged in, save the post to create later
      localStorage.setItem('feedbackToPost', JSON.stringify({ title, description, uploads}));
      setShowLoginPopup(true);
    } else {
      // If user is logged in, create the post
      axios
        .post('/api/feedback', { title, description, uploads})
        .then(() => {
          setShow(false);
          onCreate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Function to handle file upload
  const handleUpload = (newLinks) => {
    setUploads([...uploads, ...newLinks]);
  };

  // Function to handle file removal
  const handleRemoveFileClick = (e, link) => {
    e.preventDefault();
    setUploads(uploads.filter((item) => item !== link));
  };

  return (
    <Popup setShow={setShow} title={'Make a Suggestion'}>
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      <form className='p-8'>
        {/* Title input */}
        <label className='block mt-4 mb-1 text-gray-700'>Title</label>
        <input
          className='w-full border p-2 rounded-md'
          type='text'
          placeholder='A short, descriptive title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        {/* Description textarea */}
        <label className='block mt-4 mb-1 text-gray-700'>Details</label>
        <textarea
          className='w-full border p-2 rounded-md'
          placeholder='Describe your suggestion'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />

        {/* Display uploaded files */}
        {uploads.length > 0 && (
          <div>
            <label className='block mt-2 mb-1 text-gray-700'>Attachments</label>
            <div className='flex gap-2 mt-2'>
              {uploads.map((link) => (
                <Attachment key={link.id} link={link} handleRemoveFileClick={(e, link) => handleRemoveFileClick(e, link)} showRemoveButton={true} />
              ))}
            </div>
          </div>
        )}

        {/* File upload and post creation buttons */}
        <div className='flex gap-2 mt-2 justify-end'>
          <AttachFileComponent onUploadFile={handleUpload} />
          <Button primary='true' className='' onClick={handleCreatePostClick}>
            {session ? 'Create Post' : 'Login and Post'}
          </Button>
        </div>
      </form>
    </Popup>
  );
}
