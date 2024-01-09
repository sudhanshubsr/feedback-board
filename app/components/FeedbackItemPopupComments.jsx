import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import FeedbackItemPopupCommentsForm from './FeedbackItemPopupCommentsForm';
import axios from 'axios';
import Attachment from './Attachment';
import TimeAgo from 'timeago-react';
import { useSession } from 'next-auth/react';
import AttachFileComponent from './AttachFileComponent';

const FeedbackItemPopupComments = ({ feedbackId }) => {
  
  const {data: session} = useSession();
  
  const [comments, setComments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentUploads, setNewCommentUploads] = useState([]);
  // const [newComment, setNewComment] = useState(comments); // eslint-disable-line no-unused-vars

  // Function to fetch comments for the given feedbackId
  const fetchComments = async () => {
    try {
      const res = await axios.get('/api/comment?feedbackId=' + feedbackId);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle comment edit mode
  const handleCommentEditMode = (comment) => {
    setIsEditMode(comment)
    setNewCommentText(comment.text)
    setNewCommentUploads(comment.uploads)
  };
  const handleCancelButtonClick = () => {
    setIsEditMode(null);
  }
  const handleRemoveFileClick = (e, link) => {
    e.preventDefault();
    setNewCommentUploads(prevUploads => prevUploads.filter((prevUpload) => prevUpload !== link));
  }
        
  const handleFileUpload = (links) => {
    setNewCommentUploads(prevUploads => [...prevUploads, ...links])
  }

  // Function to handle comment delete
  const handleDeleteButtonCllick = async () => {
    const id = isEditMode.id;
    try{
      await axios.delete('/api/comment', {data: {id}})
      .then(()=>{
        setIsEditMode(null);
        fetchComments();
      })
    }
    catch(err){
      console.log(err);
    }
  }
  const handleEditedCommentSave = async () => {
    try{
       await axios.put('/api/comment',{
        id: isEditMode.id,
        text: newCommentText,
        uploads: newCommentUploads,
        feedbackId,
        })
        setIsEditMode(false);
        await fetchComments();
    }
    catch(err){
      console.log(err);
    }
    
  }

  // Fetch comments when the component mounts or when feedbackId changes
  useEffect(() => {
    fetchComments();
  }, [feedbackId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='p-8'>
      {comments.length > 0 &&
        comments.map((comment) => {
          const commentToBeEdit = isEditMode?.id === comment.id;
          return(
            <div key={comment.id} className='mb-8'>
            <div className='flex gap-4'>
              <Avatar url={comment.user?.image ? comment.user.image : 'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/0/e/10e6c0a439e17280a6f3fa6ae059819af5517efd.png'} />
              <div>
                {commentToBeEdit && (
                  <textarea
                    onChange={(e) => {setNewCommentText(e.target.value)}}
                    type='text'
                    className='w-full border border-gray-200 rounded-md p-2'
                    value = {newCommentText}
                  />
                )}
  
                {!commentToBeEdit && (<p className='text-gray-600'>{comment.text}</p>)}
  
                <div className='text-gray-400 mt-1 text-[12px]'>
                  {comment.user ? comment.user?.name : comment.userEmail} &middot; {<TimeAgo datetime={comment.createdAt} />} &middot;
                  {commentToBeEdit && (
                    <>
                      <span className='cursor-pointer ml-2 text-sm' onClick={handleCancelButtonClick}>Cancel &middot; </span>
                      <span className='cursor-pointer ml-1 text-sm' onClick={handleDeleteButtonCllick}>Delete &middot; </span>
                      <span className='cursor-pointer ml-1 text-sm ' onClick={handleEditedCommentSave}>Save</span>
                    </>
                  )}
                  {!commentToBeEdit && (
                    <>
                      {(session?.user?.email === comment.userEmail) && (<span className='cursor-pointer ml-2' onClick={() => handleCommentEditMode(comment)}>Edit</span>)}
                    </>
                  )}
  
                  <div className='mt-3 flex gap-2 '>
                    {(isEditMode?.id === comment.id ? newCommentUploads : comment.uploads)?.length > 0 &&
                      (isEditMode?.id === comment.id ? newCommentUploads : comment.uploads).map((link, index) => (
                        <Attachment
                          key={index}
                          link={link}
                          showRemoveButton={commentToBeEdit}
                          handleRemoveFileClick={(e, link) => { handleRemoveFileClick(e, link); }}
                        />
                      ))}
                    {commentToBeEdit ? (<AttachFileComponent onUploadFile={handleFileUpload} />) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      {!isEditMode && (<FeedbackItemPopupCommentsForm feedbackId={feedbackId} onCommentCreate={fetchComments} />)}
    </div>
  );
  
};

export default FeedbackItemPopupComments;
