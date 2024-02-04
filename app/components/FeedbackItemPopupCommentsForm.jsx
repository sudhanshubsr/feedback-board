import React from 'react';
import Button from './Button';
import AttachFileComponent from './AttachFileComponent';
import { useState, useContext} from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Attachment from './Attachment';
import LoginPopup from './LoginPopup';
import { BoardInfoContext } from '../utils/getPathname';
const FeedbackItemPopupCommentsForm = ({ feedbackId, onCommentCreate }) => {
  const [commentText, setCommentText] = useState('');
  const [uploads, setUploads] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const {archived} = useContext(BoardInfoContext);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // Function to handle file upload
  const handleUpload = (newLinks) => {
    setUploads([...uploads, ...newLinks]);
  };

  // Function to handle file removal
  const handleRemoveFileClick = (e, link) => {
    e.preventDefault();
    setUploads(uploads.filter((item) => item !== link));
  };

  // Function to create a comment
  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!session) {
      // If user is not logged in, save the comment to post later
      localStorage.setItem('commentToPost', JSON.stringify({ text: commentText, feedbackId, uploads, userEmail }));
      setShowLoginPopup(true);
    } else {
      // If user is logged in, post the comment
      localStorage.removeItem('commentToPost');
      axios
        .post('/api/comment', {
          text: commentText,
          feedbackId,
          uploads,
          userEmail,
        })
        .then(() => {
          setCommentText('');
          setUploads([]);
          onCommentCreate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form>
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      
      {archived && <p className='text-center text-gray-500'>Comments are disabled for archived feedback</p>}
      {!archived && (
        <>
        <textarea
        className='border rounded-md w-full p-2'
        placeholder='Let us know what you think...'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      {/* Display uploaded files */}
      {uploads.length > 0 && (
        <div>
          <label className='block mt-2 mb-1 text-gray-700'>Files: </label>
          <div className='flex gap-2 mt-2'>
            {uploads.map((link) => (
              <Attachment key={link} link={link} handleRemoveFileClick={(e, link) => handleRemoveFileClick(e, link)} showRemoveButton={true} />
            ))}
          </div>
        </div>
      )}

      {/* File upload and comment submission buttons */}
      <div className='flex justify-end gap-2 mt-2'>
        <AttachFileComponent onUploadFile={handleUpload} />
        <Button onClick={handleCreateComment} primary='true' disabled={commentText === ''}>
          {session ? 'Comment' : 'Login and Comment'}
        </Button>
      </div>
        </>
      )}
      
    </form>
  );
};

export default FeedbackItemPopupCommentsForm;
